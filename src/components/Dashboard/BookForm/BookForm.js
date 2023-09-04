import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

const BookForm = ({ initialValues, onSubmit }) => {
  const { user } = useUser();
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  useEffect(() => {
    console.log("State updated - uploadedImageUrl:", uploadedImageUrl);
  }, [uploadedImageUrl]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const filePath = `${user.id}/${file.name}`;
    console.log("File path:", filePath);

    let { error, data } = await supabase.storage
      .from("book-covers")
      .upload(filePath, file);

    if (error) {
      console.error("Upload error: ", error);
    } else {
      console.log("Upload data:", data);

      const publicUrl = await supabase.storage
        .from("book-covers")
        .getPublicUrl(filePath);

      console.log("Public URL:", publicUrl);

      if (publicUrl?.data?.publicUrl) {
        setUploadedImageUrl(publicUrl.data.publicUrl);
      }
    }

    console.log("Uploaded image URL:", uploadedImageUrl);
    console.log("Form data image URL:", formData.imageUrl);
  };

  const [formData, setFormData] = useState({
    title: initialValues.title ?? "",
    series: initialValues.series ?? "",
    volume: initialValues.volume ?? "",
    author_last_name: initialValues.author_last_name ?? "",
    author_first_name: initialValues.author_first_name ?? "",
    publisher: initialValues.publisher ?? "",
    published_date: initialValues.published_date ?? "",
    isbn: initialValues.isbn ?? "",
    format: initialValues.format ?? "",
    language: initialValues.language ?? "",
    pages: initialValues.pages ?? "",
    price: initialValues.price ?? "",
    quantity: initialValues.quantity ?? "",
    genre: initialValues.genre ?? "",
    summary: initialValues.summary ?? "",
    status: initialValues.status ?? "To Read",
    imageUrl: initialValues.imageUrl ?? "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate date format or allow it to be null
    const formattedPublishedDate = formData.published_date
      ? new Date(formData.published_date).toISOString().split("T")[0]
      : null;

    if (
      formattedPublishedDate &&
      !formattedPublishedDate.match(/^\d{4}-\d{2}-\d{2}$/)
    ) {
      console.error("Invalid date format");
      return;
    }

    // Convert integer and numeric fields
    const volume = formData.volume ? parseInt(formData.volume) : null;
    const pages = formData.pages ? parseInt(formData.pages) : null;
    const quantity = formData.quantity ? parseInt(formData.quantity) : null;
    const price = formData.price ? parseFloat(formData.price) : null;

    // Add the created_at date as the current date
    const formattedCreatedDate = new Date().toISOString().split("T")[0];

    const bookDetails = {
      ...formData,
      volume, // converted to integer
      pages, // converted to integer
      quantity, // converted to integer
      price, // converted to numeric
      published_date: formattedPublishedDate,
      user_id: user.id,
      imageUrl: uploadedImageUrl || formData.imageUrl,
      ...(!initialValues.created_at && { created_at: formattedCreatedDate }),
    };

    onSubmit(bookDetails);
  };

  return (
    <div className="mt-14 max-w-4xl">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Book Details
      </h2>

      <form onSubmit={handleFormSubmit}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {/* Title */}
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
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
            <input
              type="file"
              accept="image/*"
              name="imageUpload"
              id="imageUpload"
              onChange={handleFileUpload}
            />
            {uploadedImageUrl && (
              <img
                src={uploadedImageUrl}
                alt="Uploaded Preview"
                className="mt-4 h-32 w-32 object-cover"
              />
            )}
          </div>

          {/* Series */}
          <div className="w-full">
            <label
              htmlFor="series"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Series
            </label>
            <input
              type="text"
              name="series"
              id="series"
              placeholder="Series"
              value={formData.series}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* Volume */}
          <div className="w-full">
            <label
              htmlFor="volume"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Volume
            </label>
            <input
              type="text"
              name="volume"
              id="volume"
              placeholder="Volume"
              value={formData.volume}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* Author Last Name */}
          <div className="w-full">
            <label
              htmlFor="author_last_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Author Last Name
            </label>
            <input
              type="text"
              name="author_last_name"
              id="author_last_name"
              placeholder="Author Last Name"
              value={formData.author_last_name}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* Author First Name */}
          <div className="w-full">
            <label
              htmlFor="author_first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Author First Name
            </label>
            <input
              type="text"
              name="author_first_name"
              id="author_first_name"
              placeholder="Author First Name"
              value={formData.author_first_name}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* Publisher */}
          <div className="w-full">
            <label
              htmlFor="publisher"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Publisher
            </label>
            <input
              type="text"
              name="publisher"
              id="publisher"
              placeholder="Publisher"
              value={formData.publisher}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* Published Date */}
          <div className="w-full">
            <label
              htmlFor="published_date"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Published Date
            </label>
            <input
              type="text"
              name="published_date"
              id="published_date"
              placeholder="Published Date"
              value={formData.published_date}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* ISBN */}
          <div className="w-full">
            <label
              htmlFor="isbn"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ISBN
            </label>
            <input
              type="text"
              name="isbn"
              id="isbn"
              placeholder="ISBN"
              value={formData.isbn}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* Format */}
          <div className="w-full">
            <label
              htmlFor="format"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Format
            </label>
            <input
              type="text"
              name="format"
              id="format"
              placeholder="Format"
              value={formData.format}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* Language */}
          <div className="w-full">
            <label
              htmlFor="language"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Language
            </label>
            <input
              type="text"
              name="language"
              id="language"
              placeholder="Language"
              value={formData.language}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* Pages */}
          <div className="w-full">
            <label
              htmlFor="pages"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Pages
            </label>
            <input
              type="number"
              name="pages"
              id="pages"
              placeholder="Pages"
              value={formData.pages}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* Price */}
          <div className="w-full">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* Quantity */}
          <div className="w-full">
            <label
              htmlFor="quantity"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* Genre */}
          <div className="w-full">
            <label
              htmlFor="genre"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Genre
            </label>
            <input
              type="text"
              name="genre"
              id="genre"
              placeholder="Genre"
              value={formData.genre}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
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
              onSubmit={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
