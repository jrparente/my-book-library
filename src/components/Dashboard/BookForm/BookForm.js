import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { useShelves } from "@/contexts/ShelfContext";
import Input from "./Input";

const formatDate = (date) => {
  if (!date) {
    console.error("Date is undefined or null");
    return null;
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    console.error("Invalid date format:", date);
    return null;
  }
  return parsedDate.toISOString().split("T")[0];
};

const parseIntOrNull = (value) => (value ? parseInt(value) : null);
const parseFloatOrNull = (value) => (value ? parseFloat(value) : null);

const sanitizeFileName = (fileName) => {
  return fileName.replace(/[^\w\d_\-.]+/gi, "");
};

const BookForm = ({
  initialValues: {
    id = null,
    title = "",
    series = "",
    volume = "",
    author_last_name = "",
    author_first_name = "",
    publisher = "",
    published_date = "",
    isbn = "",
    format = "",
    imageUrl = null,
    language = "",
    pages = null,
    price = null,
    quantity = 1,
    genre = "",
    summary = "",
    status = "To Read",
    created_at = null,
    shelf_id = null,
  },
  onSubmit,
}) => {
  const { user } = useUser();
  const [uploadedImageUrl, setUploadedImageUrl] = useState(imageUrl ?? null);
  const [selectedShelf, setSelectedShelf] = useState("");
  const { shelves, fetchShelves, fetchInitialShelf } = useShelves();

  // Initialize form data with either initial values or default values
  const [formData, setFormData] = useState({
    title: title ?? "",
    series: series ?? "",
    volume: volume ?? "",
    author_last_name: author_last_name ?? "",
    author_first_name: author_first_name ?? "",
    publisher: publisher ?? "",
    published_date: published_date ?? "",
    isbn: isbn ?? "",
    format: format ?? "",
    language: language ?? "",
    pages: pages ?? null,
    price: price ?? null,
    quantity: quantity ?? null,
    genre: genre ?? "",
    summary: summary ?? "",
    status: status ?? "To Read",
    imageUrl: imageUrl ?? "",
    shelf_id: shelf_id ?? null,
  });

  // Fetch shelves for the user & the correct shelf for the book
  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.id) return;
      fetchShelves(user.id);

      // Fetch the initial shelf ID from your database using the book's ID
      const initialShelfId = await fetchInitialShelf(id);
      console.log("initialShelfId", initialShelfId);
      // Set the initial shelf
      if (initialShelfId) {
        setSelectedShelf(initialShelfId);
      } else {
        setSelectedShelf(""); // Set to an empty string to show the "Select a shelf" option
      }
    };

    fetchData();
  }, [user, id]);

  useEffect(() => {
    console.log("State updated - uploadedImageUrl:", uploadedImageUrl);
  }, [uploadedImageUrl]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const sanitizedFileName = sanitizeFileName(file.name);
    const uniqueFileName = `${Date.now()}-${sanitizedFileName}`;
    const filePath = `${user.id}/${uniqueFileName}`;

    console.log("File path:", filePath);

    let { error: uploadError, data: uploadData } = await supabase.storage
      .from("book-covers")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error: ", uploadError);
      return;
    }

    console.log("Upload data:", uploadData);

    const { error: urlError, data: urlData } = await supabase.storage
      .from("book-covers")
      .getPublicUrl(filePath);

    if (urlError) {
      console.error("Error retrieving public URL:", urlError);
      return;
    }

    console.log("Public URL Data:", urlData);

    if (urlData?.publicUrl) {
      setUploadedImageUrl(urlData.publicUrl);
    }

    console.log("Uploaded image URL:", uploadedImageUrl);
    console.log("Form data image URL:", formData.imageUrl);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formattedPublishedDate = formatDate(formData.published_date);
    const volume = parseIntOrNull(formData.volume);
    const pages = parseIntOrNull(formData.pages);
    const quantity = parseIntOrNull(formData.quantity);
    const price = parseFloatOrNull(formData.price);

    // Add the created_at date as the current date
    const formattedCreatedDate = new Date().toISOString().split("T")[0];
    console.log("type of uuid", typeof user.id, user.id);
    const bookDetails = {
      ...formData,
      volume, // converted to integer
      pages, // converted to integer
      quantity, // converted to integer
      price, // converted to numeric
      published_date: formattedPublishedDate,
      user_id: user.id,
      imageUrl: uploadedImageUrl || formData.imageUrl,
      ...(!created_at && { created_at: formattedCreatedDate }),
      ...(selectedShelf && { shelf_id: selectedShelf }),
    };
    console.log("bookDetails", bookDetails);
    onSubmit(bookDetails);
  };

  return (
    <div className="mt-4 max-w-4xl">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Book Details
      </h2>

      <form onSubmit={handleFormSubmit}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {/* Shelf */}
          <div className="w-full">
            <label
              htmlFor="shelf"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Shelf
            </label>
            <select
              name="shelf"
              id="shelf"
              value={selectedShelf}
              onChange={(e) => setSelectedShelf(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value="">Select a shelf</option>
              {shelves.map((shelf) => (
                <option key={shelf.id} value={shelf.shelf_id}>
                  {shelf.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="sm:col-span-2">
            <Input
              label="Title"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* Book Cover */}
          <div className="sm:col-span-2">
            <label
              htmlFor="imageUpload"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Book Cover
            </label>
            {uploadedImageUrl && (
              <img
                src={uploadedImageUrl}
                alt="Uploaded Preview"
                className="mt-4 mb-4 h-32 w-32 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/placeholder-image.png";
                }}
              />
            )}
            <input
              type="file"
              accept="image/*"
              name="imageUpload"
              id="imageUpload"
              onChange={handleFileUpload}
            />
          </div>

          {/* Series */}
          <div className="w-full">
            <Input
              label="Series"
              name="series"
              placeholder="Series"
              value={formData.series}
              onChange={handleChange}
            />
          </div>

          {/* Volume */}
          <div className="w-full">
            <Input
              label="Volume"
              name="volume"
              placeholder="Volume"
              value={formData.volume}
              onChange={handleChange}
            />
          </div>

          {/* Author Last Name */}
          <div className="w-full">
            <Input
              label="Author Last Name"
              name="author_last_name"
              placeholder="Author Last Name"
              value={formData.author_last_name}
              onChange={handleChange}
            />
          </div>

          {/* Author First Name */}
          <div className="w-full">
            <Input
              label="Author First Name"
              name="author_first_name"
              placeholder="Author First Name"
              value={formData.author_first_name}
              onChange={handleChange}
            />
          </div>

          {/* Publisher */}
          <div className="w-full">
            <Input
              label="Publisher"
              name="publisher"
              placeholder="Publisher"
              value={formData.publisher}
              onChange={handleChange}
            />
          </div>

          {/* Published Date */}
          <div className="w-full">
            <Input
              label="Published Date"
              type="date"
              name="published_date"
              placeholder="Published Date"
              value={formData.published_date}
              onChange={handleChange}
            />
          </div>

          {/* ISBN */}
          <div className="w-full">
            <Input
              label="ISBN"
              type="number"
              name="isbn"
              placeholder="ISBN"
              value={formData.isbn}
              onChange={handleChange}
            />
          </div>

          {/* Format */}
          <div className="w-full">
            <Input
              label="Format"
              name="format"
              placeholder="Format"
              value={formData.format}
              onChange={handleChange}
            />
          </div>

          {/* Language */}
          <div className="w-full">
            <Input
              label="Language"
              name="language"
              placeholder="Language"
              value={formData.language}
              onChange={handleChange}
            />
          </div>

          {/* Pages */}
          <div className="w-full">
            <Input
              label="Pages"
              type="number"
              name="pages"
              placeholder="Pages"
              value={formData.pages}
              onChange={handleChange}
            />
          </div>

          {/* Price */}
          <div className="w-full">
            <Input
              label="Price"
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          {/* Quantity */}
          <div className="w-full">
            <Input
              label="Quantity"
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>

          {/* Genre */}
          <div className="w-full">
            <Input
              label="Genre"
              name="genre"
              placeholder="Genre"
              value={formData.genre}
              onChange={handleChange}
            />
          </div>

          {/* Status */}
          <div className="w-full">
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="To Read">To Read</option>
              <option value="Reading">Reading</option>
              <option value="Read">Read</option>
              <option value="On Hold">On Hold</option>
              <option value="Abandoned">Abandoned</option>
              <option value="Wishlist">Wishlist</option>
            </select>
          </div>

          {/* Summary */}
          <div className="sm:col-span-2">
            <label
              htmlFor="summary"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Summary
            </label>
            <textarea
              name="summary"
              id="summary"
              placeholder="Summary"
              value={formData.summary}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg"
            >
              Add to Library
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
