import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../layout";
import { useShelves } from "@/contexts/ShelfContext";

export default function UpdateShelf() {
  const router = useRouter();
  const { shelf_id } = router.query;
  const { updateShelf, fetchShelfById } = useShelves();

  const [shelfData, setShelfData] = useState({
    name: "",
    description: "",
  });

  // Fetch current shelf data when component mounts
  useEffect(() => {
    if (shelf_id) {
      fetchShelfById(shelf_id).then((data) => {
        setShelfData(data);
      });
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
    console.log("Submitting form...", shelfData);
    const updated = await updateShelf(
      shelf_id,
      shelfData.name,
      shelfData.description
    );
    console.log("Is shelf updated?", updated);
    if (updated) {
      console.log("Navigating to dashboard/shelves...");
      router.push("/dashboard/shelves");
    } else {
      alert("Failed to update shelf.");
    }
  };

  return (
    <Layout>
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 md:mt-8 lg:mt-6 w-full">
        <h1 className="text-2xl mb-4">Update Shelf</h1>
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
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Shelf
          </button>
        </form>
      </div>
    </Layout>
  );
}
