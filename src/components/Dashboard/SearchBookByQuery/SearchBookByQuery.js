import { useState } from "react";
import BookSearchCard from "../BookSearchCard/BookSearchCard";

export default function SearchBookByQuery() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/fetchBooks?query=${query}`);
      const searchResults = await res.json();

      if (searchResults && searchResults.length > 0) {
        const bookDetailsPromises = searchResults.slice(0, 6).map((book) => {
          const firstIsbn = book.isbn ? book.isbn[0] : null; // Take the first ISBN
          console.log("firstIsbn", firstIsbn);
          if (!firstIsbn) {
            return Promise.resolve(null); // If no ISBN, resolve to null
          }
          console.log("book.isbn being fetched", firstIsbn);
          return fetch(`/api/fetchBookDetails?isbn=${firstIsbn}`).then((res) =>
            res.json()
          );
        });

        const detailedBooks = await Promise.all(bookDetailsPromises);
        console.log("detailedBooks", detailedBooks);
        setLoading(false);
        setBooks(detailedBooks.filter((book) => book !== null)); // Remove any nulls (books without ISBNs)
      } else {
        setLoading(false);
        alert("No books found");
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred while fetching the books.");
    }
  };
  console.log(books);
  return (
    <div className="mt-4 max-w-4xl">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Search book by Query
      </h2>
      <form className="flex flex-wrap gap-2 sm:space-x-2 sm:flex-nowrap mb-6">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>
      {isLoading && <div className="loader"></div>}
      <div className="flex flex-col gap-4">
        {books.map((book, index) => (
          <BookSearchCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
}
