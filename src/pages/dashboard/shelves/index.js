import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { useShelves } from "@/contexts/ShelfContext";
import Layout from "../layout";
import { useBooks } from "@/contexts/BooksContext";
import DeleteModal from "@/components/Dashboard/DeleteModal/DeleteModal";

export default function ShelfDashboard() {
  const { user } = useUser();
  const { shelves, fetchShelves, addShelf, updateShelf, deleteShelf } =
    useShelves();
  const { books } = useBooks();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredShelves, setFilteredShelves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentShelfId, setCurrentShelfId] = useState(null);

  useEffect(() => {
    if (!user || !user.id) return;
    fetchShelves(user.id);
    if (searchTerm === "") {
      setFilteredShelves(shelves);
    } else {
      fetchResults(searchTerm, user.id).then((data) => {
        setFilteredShelves(data);
      });
    }
  }, [user, fetchShelves]);

  const handleShowModal = (id) => {
    setCurrentShelfId(id);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDeleteShelf = async () => {
    const success = await deleteShelf(currentShelfId);
    if (success) {
      // Handle successful delete, like refetching shelves
      fetchShelves(user.id);
    }
    setCurrentShelfId(null);
    setShowModal(false);
  };

  return (
    <Layout>
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 md:mt-8 lg:mt-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl mb-4 text-gray-800 dark:text-white">
            Your Shelves
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
                placeholder="Search for a shelf..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link
              href="/dashboard/shelves/AddNewShelf"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add New Shelf
            </Link>
          </div>
        </div>

        {/* Shelf List */}
        <ul className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredShelves.map((shelf) => {
            const bookCount = books.filter(
              (book) => book.shelf_id === shelf.shelf_id
            ).length;
            return (
              <li
                key={shelf.shelf_id}
                className="flex flex-col gap-2 border rounded p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    <Link href={`/dashboard/shelves/${shelf.shelf_id}`}>
                      {shelf.name}
                    </Link>
                  </h2>
                  <div className="flex space-x-2">
                    <Link href={`/dashboard/shelves/${shelf.shelf_id}`}>
                      🔄
                    </Link>
                    <button onClick={() => handleShowModal(shelf.shelf_id)}>
                      🗑️
                    </button>
                  </div>
                </div>
                <p className="font-semibold">{bookCount} books</p>
                <p className="text-sm">{shelf.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <DeleteModal
        showModal={showModal}
        handleDelete={handleDeleteShelf}
        handleClose={handleClose}
      />
    </Layout>
  );
}
