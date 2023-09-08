import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { useShelves } from "@/contexts/ShelfContext";
import Layout from "../layout";
import { useRouter } from "next/router";

export default function AddNewShelf() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useUser();
  const { addShelf } = useShelves();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      console.error("No user found");
      return;
    }

    await addShelf(user.id, name, description);
    router.push("/dashboard/shelves"); // Navigate back to the dashboard or wherever you want
  };

  return (
    <Layout>
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 md:mt-8 lg:mt-6 w-full">
        <h1 className="text-3xl mb-4">Add New Shelf</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Shelf Name
            </label>
            <input
              id="name"
              type="text"
              className="block w-full p-2 rounded-md text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              id="description"
              className="block w-full p-2 rounded-md text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Shelf
          </button>
        </form>
      </div>
    </Layout>
  );
}
