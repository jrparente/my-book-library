import React, { createContext, useState, useEffect, useContext } from "react";
import supabase from "@/lib/supabaseClient";

const BooksContext = createContext();

export const useBooks = () => {
  return useContext(BooksContext);
};

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const { data, error } = await supabase.from("books").select("*");

    if (error) {
      console.error("Error fetching books:", error);
    } else {
      setBooks(data);
    }

    setLoading(false);
  };

  const addBook = async (newBook) => {
    const { data, error } = await supabase
      .from("books")
      .insert([newBook])
      .select();
    if (error) {
      console.error("Error adding new book:", error);
      return null;
    }

    if (data && data.length > 0) {
      setBooks((newBooks) => {
        console.log("Updated books:", [...newBooks, ...data]);
        return [...newBooks, ...data];
      });
      return data[0]; // Return the newly inserted book
    }
  };

  const deleteBook = async (bookId) => {
    const { data, error } = await supabase
      .from("books")
      .delete()
      .eq("id", bookId);

    if (error) {
      console.error("Error deleting book:", error);
      return false;
    }

    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
    return true;
  };

  const editBook = async (bookId, updatedBook) => {
    const { data, error } = await supabase
      .from("books")
      .update(updatedBook)
      .eq("id", bookId)
      .select();

    if (error) {
      console.error("Error editing book:", error);
      return false; // return false instead of null for consistency
    }

    // Update only the edited book in the state
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, ...updatedBook } : book
      )
    );

    return true; // return true for success
  };

  const value = {
    books,
    loading,
    addBook,
    fetchBooks,
    deleteBook,
    editBook,
  };

  return (
    <BooksContext.Provider value={value}>
      {!loading && children}
    </BooksContext.Provider>
  );
};
