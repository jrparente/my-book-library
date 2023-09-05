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
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 w-full">
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
        <div
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
          className="grid gap-4"
        >
          {loading ? (
            <p className="text-gray-800 dark:text-white">Loading...</p>
          ) : (
            books.map((book, index) => <BookCard key={book.id} book={book} />)
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Books;
