import { useBooks } from "@/contexts/BooksContext";
import React, { useEffect, useState } from "react";
import Layout from "../layout";
import BookCard from "@/components/Dashboard/BookCard/BookCard";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";

const Books = () => {
  const { user } = useUser();
  const { books, loading, fetchResults } = useBooks();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    if (!user || !user.id) return;

    // Filter out books with status 'Wishlist'
    const filterWishlist = (bookList) =>
      bookList.filter((book) => book.status !== "Wishlist");

    if (searchTerm === "") {
      setFilteredBooks(filterWishlist(books));
    } else {
      fetchResults(searchTerm, user.id).then((data) => {
        setFilteredBooks(filterWishlist(data));
      });
    }
  }, [searchTerm, books, fetchResults, user]);

  const totalBooks = filteredBooks.length;

  return (
    <Layout>
      {/* Main Content */}
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 md:mt-8 lg:mt-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-3xl mb-4 text-gray-800 dark:text-white">
            Your Books
          </h1>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 rounded-md text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search for a book..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link
              href="/dashboard/books/AddNewBook"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add New Book
            </Link>
          </div>
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <strong>Total Books:</strong> {totalBooks}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {loading ? (
            <p className="text-gray-800 dark:text-white">Loading...</p>
          ) : (
            filteredBooks.map((book, index) => (
              <BookCard key={book.id} book={book} />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Books;
