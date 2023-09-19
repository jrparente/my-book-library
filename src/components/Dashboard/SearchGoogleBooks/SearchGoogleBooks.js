import { useState } from "react";
import GoogleBookSearchCard from "../GoogleBookSearchCard";

export default function SearchGoogleBooks() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/fetchGoogleBooks?query=${query}`);
      const searchResults = await res.json();
      const items = searchResults.items || [];

      if (items.length > 0) {
        const detailedBooks = items.slice(0, 6).map((item) => {
          // Transform Google Books data to your existing book format, if needed
          return item.volumeInfo;
        });

        setLoading(false);
        setBooks(detailedBooks);
      } else {
        setLoading(false);
        alert("No books found");
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred while fetching the books.");
    }
  };
  return (
    <div className="mt-4 max-w-4xl">
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
          <GoogleBookSearchCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
}
