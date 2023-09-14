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
  const [sortOption, setSortOption] = useState("Author");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedBooks, setSortedBooks] = useState([]);

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

  useEffect(() => {
    let sortBooks = [...filteredBooks];
    sortBooks.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortOption] < b[sortOption] ? -1 : 1;
      } else {
        return a[sortOption] > b[sortOption] ? -1 : 1;
      }
    });
    setSortedBooks(sortBooks);
  }, [filteredBooks, sortOption, sortOrder]);

  return (
    <Layout>
      {/* Main Content */}
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 md:mt-8 lg:mt-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
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
            <Link href="/dashboard/books/AddNewBook" className="button">
              Add New Book
            </Link>
          </div>
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <strong>Total Books:</strong> {totalBooks}
          </div>
          <select
            className="text-gray-900 bg-gray-100 dark:bg-gray-800 border rounded-md p-2 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="author_last_name">Author</option>
            <option value="title">Title</option>
            <option value="created_at">Date Added</option>
          </select>
          <select
            className="text-gray-900 bg-gray-100 dark:bg-gray-800 border rounded-md p-2 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {loading ? (
            <p className="text-gray-800 dark:text-white">Loading...</p>
          ) : (
            sortedBooks.map((book, index) => (
              <BookCard key={book.id} book={book} />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Books;
