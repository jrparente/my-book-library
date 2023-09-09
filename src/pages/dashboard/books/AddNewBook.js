import BookForm from "@/components/Dashboard/BookForm/BookForm";
import Layout from "../layout";
import { useBooks } from "@/contexts/BooksContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchBookByISBN from "@/components/Dashboard/SearchBookByISBN/SearchBookByISBN";
import SearchBookByQuery from "@/components/Dashboard/SearchBookByQuery/SearchBookByQuery";
import SearchGoogleBooks from "@/components/Dashboard/SearchGoogleBooks/SearchGoogleBooks";

import { useShelves } from "@/contexts/ShelfContext";

const AddNewBook = () => {
  const { addBook } = useBooks();
  const { addBookToShelf } = useShelves();
  const route = useRouter();
  const initialValues = route.query.initialValues
    ? JSON.parse(route.query.initialValues)
    : {};

  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState(route.query.activeTab || "manual");

  useEffect(() => {
    setActiveTab(route.query.activeTab || "manual");
  }, [route.query]);

  // Function to show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Handle form submission
  const handleSubmit = async (formData) => {
    console.log("Image data to be sent to database:", formData.imageUrl);
    // Validate form data
    if (!formData.title) {
      showNotification("Title is required", "error");
      return;
    }
    console.log("Form data before submit:", formData);
    const newBook = await addBook(formData);
    console.log("Data being sent to database:", newBook);
    if (newBook) {
      showNotification("Book added successfully!");
      route.push(`/dashboard/books/${newBook.id}`);
    } else {
      showNotification("Failed to add book", "error");
    }
  };

  return (
    <Layout>
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 md:mt-8 lg:mt-6 w-full">
        <h1 className="text-3xl mb-4 text-gray-800 dark:text-white">
          Add New Book
        </h1>
        {/* Tab controls */}
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li className="mr-2">
            <button
              onClick={() => setActiveTab("manual")}
              className={`inline-block p-4 rounded-t-lg 
                 ${
                   activeTab === "manual"
                     ? "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500"
                     : ""
                 }`}
            >
              Add Manually
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab("isbn")}
              className={`inline-block p-4 rounded-t-lg 
                 ${
                   activeTab === "isbn"
                     ? "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500"
                     : ""
                 }`}
            >
              Search by ISBN
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab("search")}
              className={`inline-block p-4 rounded-t-lg 
                 ${
                   activeTab === "search"
                     ? "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500"
                     : ""
                 }`}
            >
              Search Book
            </button>
          </li>{" "}
          <li className="mr-2">
            <button
              onClick={() => setActiveTab("google")}
              className={`inline-block p-4 rounded-t-lg 
               ${
                 activeTab === "google"
                   ? "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500"
                   : ""
               }`}
            >
              Search Google Books
            </button>
          </li>
        </ul>
        {/* Display notification */}
        {notification && (
          <div
            className={`p-4 rounded-md text-center text-white ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {notification.message}
          </div>
        )}
        {/* Display content based on active tab */}
        {activeTab === "manual" && (
          <BookForm initialValues={initialValues} onSubmit={handleSubmit} />
        )}
        {activeTab === "isbn" && <SearchBookByISBN />}
        {activeTab === "search" && <SearchBookByQuery />}{" "}
        {activeTab === "google" && <SearchGoogleBooks />}{" "}
      </div>
    </Layout>
  );
};

export default AddNewBook;
