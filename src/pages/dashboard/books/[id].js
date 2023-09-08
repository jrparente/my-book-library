import { useBooks } from "@/contexts/BooksContext";
import { useRouter } from "next/router";
import Layout from "../layout";
import Image from "next/image";
import { useState, useEffect } from "react";
import DeleteModal from "@/components/Dashboard/DeleteModal/DeleteModal";
import { useShelves } from "@/contexts/ShelfContext";

const getStatusColor = (status) => {
  switch (status) {
    case "To Read":
      return "#FFEB99"; // Light Yellow
    case "Reading":
      return "#B2FFB2"; // Light Green
    case "Read":
      return "#99CCFF"; // Light Blue
    case "On Hold":
      return "#FFCC99"; // Light Orange
    case "Abandoned":
      return "#FF9999"; // Light Red
    case "Wishlist":
      return "#E0B0FF"; // Light Purple
    default:
      return "#CCCCCC"; // Light Grey as default
  }
};

export default function BookDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { books, deleteBook } = useBooks();
  const { fetchShelfById } = useShelves();
  const [showModal, setShowModal] = useState(false);
  const [bookShelf, setBookShelf] = useState(null);

  const book = books.find((book) => book.id === id);

  // Fetch the book's initial shelf ID and then fetch the shelf's name
  useEffect(() => {
    const fetchBookShelf = async () => {
      if (book.shelf_id) {
        const shelfDetails = await fetchShelfById(book.shelf_id);
        if (shelfDetails) {
          setBookShelf(shelfDetails.name);
        }
      }
    };

    if (book.shelf_id) {
      fetchBookShelf();
    }
  }, [book, fetchShelfById]);

  const handleClose = () => {
    setShowModal(false);
  };

  let publishedYear = null;

  if (book && book.published_date) {
    const date = new Date(book.published_date);

    if (!isNaN(date.getTime())) {
      // Check if date is valid
      publishedYear = date.getFullYear();
    } else {
      console.error("Invalid date format:", book.published_date);
    }
  }

  // Handle Delete Errors
  const onDeleteBook = async () => {
    const errorMessage = await deleteBook(id);
    if (errorMessage) {
      alert(errorMessage);
    } else {
      router.push("/dashboard/books");
    }
  };

  if (!book) {
    return <p>Loading...</p>;
  }
  return (
    <Layout>
      {/* Main Content */}
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 md:mt-8 lg:mt-6 w-full">
        {/* Book header */}
        <div className="flex flex-col sm:flex-row w-full mb-4">
          <div className="flex flex-col w-full lg:w-1/5 pr-4 mb-2">
            <img
              src={
                book?.imageUrl ? book.imageUrl : "/images/placeholder-image.png"
              }
              alt="Book cover"
              className="w-full object-cover"
            />
            {book.status && (
              <div
                className="px-2 py-1 items-center justify-center text-center rounded-full text-gray-900 text-s mt-2 "
                style={{ backgroundColor: getStatusColor(book.status) }}
              >
                <span>{book.status}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-start w-full mb-4">
            <div className="flex items-center justify-start">
              {book.series && (
                <div className="flex items-center bg-gray-300 px-2 py-1 rounded-full text-gray-900 text-s mb-2">
                  📚 {book.series} {book.volume && `#${book.volume}`}
                </div>
              )}
              {bookShelf && (
                <div className="flex items-center bg-gray-300 px-2 py-1 rounded-full text-gray-900 text-s mb-2 ml-2">
                  🗄️ {bookShelf}
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {book.title}
            </h2>
            <p className="text-lg text-gray-900 dark:text-white mt-2">
              <span className="font-semibold">Author: </span>
              {book.author_first_name} {book.author_last_name}
            </p>
            <div className="flex flex-row flex-wrap gap-2 mt-4">
              {publishedYear && (
                <div className="text-md text-gray-900 dark:text-white">
                  {publishedYear}
                </div>
              )}
              {book.publisher && (
                <div className="text-md text-gray-900 dark:text-white">{`(${book.publisher})`}</div>
              )}
              {book.pages && (
                <div className="text-md text-gray-900 dark:text-white">{`${book.pages} pages`}</div>
              )}
            </div>
            <div className="flex flex-row gap-2 mt-4">
              {book.isbn && (
                <div className="text-md text-gray-900 dark:text-white">
                  <span className="font-semibold">ISBN: </span>
                  {`${book.isbn}`}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Book Characteristics */}
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg mb-4 text-gray-700 dark:text-gray-300">
          <h3 className="text-xl font-bold mb-4">Book Characteristics</h3>
          {/* Details are listed here */}
          <div className="flex flex-col space-y-4 ">
            {["Format", "Genre", "Language"].map((label) => (
              <div key={label} className="flex justify-start items-start gap-2">
                <span className="font-semibold">{label}:</span>
                <span>{book[label.toLowerCase().replace(/\s+/g, "_")]}</span>
              </div>
            ))}
          </div>
          {/* Summary */}
          <div className="mt-4">
            <span className="font-semibold">Summary:</span>
            <span className="block whitespace-pre-line">{book.summary}</span>
          </div>
        </div>

        {/* User's Opinion and Notes */}
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg mb-4 text-gray-700 dark:text-gray-300">
          <h3 className="text-xl font-bold mb-4">Your Notes</h3>
          <div className="flex flex-col space-y-4">
            {["Price", "Quantity"].map((label) => (
              <div key={label} className="flex justify-start items-start gap-2">
                <span className="font-semibold">{label}:</span>
                <span>{book[label.toLowerCase().replace(/\s+/g, "_")]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-4">
          <button
            type="button"
            className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={() => router.push(`/dashboard/books/editbook/${id}`)}
          >
            <svg
              aria-hidden="true"
              className="mr-1 -ml-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              ></path>
            </svg>
            Edit Book
          </button>
          <button
            type="button"
            className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            onClick={() => setShowModal(true)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-1.5 -ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Delete Book
          </button>
          <DeleteModal
            showModal={showModal}
            handleDelete={onDeleteBook}
            handleClose={handleClose}
          />
        </div>
      </div>
    </Layout>
  );
}
