import { useBooks } from "@/contexts/BooksContext";
import React from "react";
import Layout from "../layout";
import BookCard from "@/components/Dashboard/BookCard/BookCard";
import Link from "next/link";

const Books = () => {
  const { books, loading } = useBooks();

  return (
    <Layout>
      {/* Main Content */}
      <div className="p-4 mt-14">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl mb-4 text-gray-800 dark:text-white">
            Your Books
          </h1>
          <Link
            href="/dashboard/books/AddNewBook"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Book
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-800">
          {loading ? (
            <p>Loading...</p>
          ) : (
            books.map((book, index) => <BookCard key={book.id} book={book} />)
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Books;
