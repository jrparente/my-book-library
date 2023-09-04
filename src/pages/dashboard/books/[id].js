import { useBooks } from "@/contexts/BooksContext";
import { useRouter } from "next/router";
import Layout from "../layout";

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

  const book = books.find((book) => book.id === id);

  if (!book) {
    return <p>Loading...</p>;
  }
  console.log("book", book);
  return (
    <Layout>
      {/* Main Content */}

      <div className="p-4 w-full mt-14">
        {/* Book header */}
        <div className="flex w-full mb-4">
          <img
            src={
              book?.imageUrl ? book.imageUrl : "/images/placeholder-image.png"
            }
            alt="Book cover"
            className="w-24 h-36 object-cover mr-4"
          />
          <div className="flex flex-col justify-start w-full mb-4">
            {book.series && (
              <div className="flex items-center bg-gray-300 p-1 rounded-full mb-2 me-auto">
                <span className="text-sm text-gray-700">
                  📚 {book.series} {book.volume && `#${book.volume}`}
                </span>
              </div>
            )}
            <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
            <p className="text-lg text-gray-600">
              Author: {book.author_first_name} {book.author_last_name}
            </p>
            {book.status && (
              <div
                className="p-1 rounded-full mt-2"
                style={{ backgroundColor: getStatusColor(book.status) }}
              >
                <span className="text-sm text-gray-700">{book.status}</span>
              </div>
            )}
          </div>
        </div>

        {/* Book Characteristics */}
        <div className="bg-gray-200 p-4 rounded-lg mb-4 text-gray-700">
          <h3 className="text-xl font-bold mb-4">Book Characteristics</h3>
          {/* Details are listed here */}
          <div className="flex flex-col space-y-4 ">
            {[
              "ISBN",
              "Format",
              "Genre",
              "Language",
              "Published Date",
              "Publisher",
              "Pages",
              "Summary",
            ].map((label) => (
              <div key={label} className="flex justify-start items-start gap-2">
                <span className="font-semibold">{label}:</span>
                <span>{book[label.toLowerCase().replace(/\s+/g, "_")]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User's Opinion and Notes */}
        <div className="bg-gray-200 p-4 rounded-lg mb-4 text-gray-700">
          <h3 className="text-xl font-bold mb-4">Your Notes and Opinions</h3>
          <div className="flex flex-col space-y-4">
            {["Price", "Quantity owned", "Status"].map((label) => (
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
            class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={() => router.push(`/book/edit/${id}`)}
          >
            <svg
              aria-hidden="true"
              class="mr-1 -ml-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
              <path
                fill-rule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Edit Book
          </button>
          <button
            type="button"
            class="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            onClick={async () => {
              const isDeleted = await deleteBook(id);
              if (isDeleted) {
                router.push("/dashboard/books");
              } else {
                alert("Failed to delete book.");
              }
            }}
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 mr-1.5 -ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Delete Book
          </button>
        </div>
      </div>
    </Layout>
  );
}
