import BookForm from "@/components/Dashboard/BookForm/BookForm";
import Layout from "../layout";
import { useBooks } from "@/contexts/BooksContext";
import { useRouter } from "next/router";
import { useState } from "react";

const AddNewBook = () => {
  const { addBook } = useBooks();
  const route = useRouter();
  const initialValues = {};

  // Notification state
  const [notification, setNotification] = useState(null);

  // Function to show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Handle form submission
  const handleSubmit = async (formData) => {
    console.log("Data to be sent to database:", formData.imageUrl);
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
      <div className="p-4 mt-14">
        <h1 className="text-3xl mb-4 text-gray-800 dark:text-white">
          Add New Book
        </h1>

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

        <BookForm initialValues={initialValues} onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default AddNewBook;
