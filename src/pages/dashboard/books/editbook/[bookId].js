import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useBooks } from "@/contexts/BooksContext";
import BookForm from "@/components/Dashboard/BookForm/BookForm";
import Layout from "../../layout";

const EditBook = () => {
  const router = useRouter();
  const { bookId } = router.query;
  const [book, setBook] = useState(null);
  const { books, editBook } = useBooks();

  useEffect(() => {
    const fetchBook = () => {
      const foundBook = books.find((b) => b.id === bookId);
      if (foundBook) {
        setBook(foundBook);
      } else {
        Alert.alert("Error", "Book not found.");
      }
    };

    if (books.length > 0) {
      fetchBook();
    }
  }, [books, bookId]);

  const handleEditBook = async (updatedBookDetails) => {
    const success = await editBook(bookId, updatedBookDetails);
    if (success) {
      alert("Book updated successfully.");
      router.push(`/dashboard/books/${bookId}`);
    } else {
      alert("Error", "Failed to update book.");
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 w-full">
        <h1 className="text-3xl mb-4 text-gray-800 dark:text-white">
          Edit Book
        </h1>

        {/* Display notification */}
        <BookForm initialValues={book} onSubmit={handleEditBook} />
      </div>
    </Layout>
  );
};

export default EditBook;
