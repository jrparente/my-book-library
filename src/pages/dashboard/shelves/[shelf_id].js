import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../layout";
import { useShelves } from "@/contexts/ShelfContext";
import useToggle from "@/lib/useToggle";
import { useBooks } from "@/contexts/BooksContext";
import BookCard from "@/components/Dashboard/BookCard/BookCard";

export default function UpdateShelf() {
  const router = useRouter();
  const { shelf_id } = router.query;
  const { updateShelf, fetchShelfById } = useShelves();
  const [isEditing, toggleEditing] = useToggle(false);
  const [shelfData, setShelfData] = useState({
    name: "",
    description: "",
  });
  const { books } = useBooks();

  const [filteredBooks, setFilteredBooks] = useState([]);

  // Fetch current shelf data when component mounts
  useEffect(() => {
    if (shelf_id) {
      fetchShelfById(shelf_id).then((data) => {
        setShelfData(data);
      });
      const newFilteredBooks = books.filter(
        (book) => book.shelf_id === shelf_id
      );
      setFilteredBooks(newFilteredBooks);
    }
  }, [shelf_id]);

  // Update shelf attributes in state as they are edited
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShelfData({
      ...shelfData,
      [name]: value,
    });
  };

  // Update shelf data when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await updateShelf(
      shelf_id,
      shelfData.name,
      shelfData.description
    );
    if (updated) {
      toggleEditing();
    } else {
      alert("Failed to update shelf.");
    }
  };

  return (
    <Layout>
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 md:mt-8 lg:mt-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl mb-4">{shelfData.name} Shelf</h1>
          {!isEditing && (
            <button
              onClick={toggleEditing}
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-primary-700 hover:bg-primary-600 rounded-lg ml-2"
            >
              Edit Shelf
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={shelfData.name}
                onChange={handleChange}
                className="block w-full px-4 py-2 rounded-md text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="4"
                value={shelfData.description}
                onChange={handleChange}
                className="block w-full px-4 py-2  rounded-md text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
              ></textarea>
            </div>
            <button
              type="button"
              onClick={toggleEditing}
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-800 hover:bg-red-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-primary-700 hover:bg-primary-600 rounded-lg ml-2"
            >
              Update Shelf
            </button>
          </form>
        ) : (
          <div>
            {/* Profile information */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 rounded">
                <strong>Number of Books:</strong> {filteredBooks.length}
              </div>
            </div>
            <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 rounded mt-4">
              <strong>Description:</strong> {shelfData.description}
            </div>
          </div>
        )}
        <div className="flex flex-col mt-8">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 2xl:grid-cols-3 xl:gap-x-8">
            {filteredBooks.length > 0 &&
              filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
