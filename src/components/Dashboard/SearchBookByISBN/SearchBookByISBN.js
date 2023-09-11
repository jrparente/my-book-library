import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/contexts/UserContext";

export default function SearchBookByISBN() {
  const user = useUser();
  const router = useRouter();
  const [isbn, setISBN] = useState("");
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [series, setSeries] = useState("");
  const [volume, setVolume] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [format, setFormat] = useState("");
  const [language, setLanguage] = useState("");
  const [pages, setPages] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [genre, setGenre] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/fetchBookByIsbn?isbn=${isbn}`);
      const data = await res.json();

      setLoading(false);

      if (data && data.title) {
        setBook(data);
        // Update other state variables based on the fetched book data
        setTitle(data.title);
        setSeries(data.series || ""); // The API response may not have 'series'
        setVolume(data.volume || null); // The API response may not have 'volume'
        if (data.authors && data.authors.length > 0) {
          const names = data.authors[0].split(" ");
          setFirstName(names[0]);
          setLastName(names.slice(1).join(" "));
        }
        setPublisher(data.publisher);
        setPublishedDate(
          data.publishedDate ? new Date(data.publishedDate) : null
        );
        setFormat(data.printType);
        setLanguage(data.language);
        setPages(data.pageCount || null);
        setGenre(data.categories ? data.categories.join(", ") : "");
        setSummary(data.description);
        if (data.imageLinks) {
          const imageSizes = [
            "extraLarge",
            "large",
            "medium",
            "small",
            "thumbnail",
            "smallThumbnail",
          ];
          for (const size of imageSizes) {
            if (data.imageLinks[size]) {
              setImage(data.imageLinks[size]);
              break;
            }
          }
        }
      } else {
        alert("Book not found");
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred while fetching the book.");
    }
  };

  const addToLibrary = async () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()},${
      currentDate.getMonth() + 1
    },${currentDate.getDate()}`;

    const bookDetails = {
      title,
      series,
      volume,
      author_last_name: lastName,
      author_first_name: firstName,
      publisher,
      published_date: publishedDate,
      isbn,
      format,
      language,
      pages: Number(pages),
      price: Number(price),
      quantity: Number(quantity),
      genre,
      summary,
      imageUrl: image,
      user_id: user.user.id,
      created_at: formattedDate,
    };

    router.replace({
      pathname: "/dashboard/books/AddNewBook",
      query: {
        initialValues: JSON.stringify(bookDetails),
        activeTab: "manual",
      },
    });
  };

  console.log(book);

  return (
    <div className="mt-4 max-w-4xl">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Search book by ISBN
      </h2>
      <form className="flex flex-wrap gap-2 sm:space-x-2 sm:flex-nowrap mb-6">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter ISBN"
          value={isbn}
          onChange={(e) => setISBN(e.target.value)}
        />
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>
      {isLoading && <div className="loader"></div>}

      {book && (
        <>
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Results
          </h2>
          <div className="flex flex-col flex-wrap p-2 sm:p-4 md:p-6 bg-white border rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <img
              src={book.imageLinks?.thumbnail || ""}
              alt={title || "No image available"}
              className="w-1/4 md:w-1/6 lg:w-1/8 object-cover mb-4 rounded-lg shadow"
            />
            <h2 className="text-2xl font-extrabold mb-2 text-gray-900 dark:text-white">
              {book.title}
            </h2>
            <p className="text-lg mb-1 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Author:</span>{" "}
              {book.authors.join(", ")}
            </p>
            <p className="text-lg mb-1 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Publisher:</span> {book.publisher}
            </p>
            <p className="text-lg mb-1 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Published Date:</span>{" "}
              {book.publishedDate}
            </p>
            <p className="text-lg mb-1 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">ISBN:</span> {isbn}
            </p>
            <p className="text-lg mb-1 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Format:</span> {book.printType}
            </p>
            <p className="text-lg mb-1 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Genre:</span>{" "}
              {book.categories && book.categories.join(", ")}
            </p>
            <p className="text-lg mb-1 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Language:</span> {book.language}
            </p>
            <p className="text-lg mb-1 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Pages:</span> {book.pageCount}
            </p>
            <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Description:</span>{" "}
              {book.description}
            </p>
            <button
              className="inline-flex items-center px-6 py-3 text-base font-medium text-center text-white bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-800 rounded-lg focus:ring focus:ring-blue-300 focus:ring-opacity-50 me-auto"
              onClick={addToLibrary}
            >
              Edit and Confirm Details
            </button>
          </div>
        </>
      )}
    </div>
  );
}
