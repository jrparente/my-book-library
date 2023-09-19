import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/router";

function GoogleBookSearchCard({ book }) {
  const { user } = useUser();
  const router = useRouter();
  const {
    title,
    authors,
    publisher,
    publishedDate,
    description,
    industryIdentifiers,
    pageCount,
    categories,
    averageRating,
    ratingsCount,
    imageLinks,
  } = book;

  const isbn13 =
    industryIdentifiers?.find((id) => id.type === "ISBN_13")?.identifier ||
    "N/A";
  const isbn10 =
    industryIdentifiers?.find((id) => id.type === "ISBN_10")?.identifier ||
    "N/A";

  const addToLibrary = async () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()},${
      currentDate.getMonth() + 1
    },${currentDate.getDate()}`;

    const bookDetails = {
      title,
      publisher,
      published_date: publishedDate,
      isbn: isbn13,
      pages: Number(pageCount),
      quantity: 1,
      genre: categories,
      summary: description,
      imageUrl: imageLinks?.thumbnail,
      user_id: user.id,
      created_at: formattedDate,
    };

    router.replace({
      pathname: "/dashboard/books/AddNewBook",
      query: {
        initialValues: JSON.stringify(bookDetails),
        activeTab: "manual",
      },
    });
  };

  return (
    <div className="flex flex-col flex-wrap gap-1 p-2 sm:p-4 md:p-6 bg-white border rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      {imageLinks?.thumbnail && (
        <div>
          <img
            src={imageLinks?.thumbnail || ""}
            alt={title || "No image available"}
          />
        </div>
      )}
      <h3 className="text-lg font-bold dark:text-white">{title}</h3>
      <p className="text-gray-700 dark:text-gray-400">
        <span className="font-semibold">Authors:</span>{" "}
        {authors?.join(", ") || "N/A"}
      </p>
      <p className="text-gray-700 dark:text-gray-400">
        <span className="font-semibold">Publisher:</span> {publisher || "N/A"}
      </p>
      <p className="text-gray-700 dark:text-gray-400">
        <span className="font-semibold">Published Date:</span>{" "}
        {publishedDate || "N/A"}
      </p>
      <p className="text-gray-700 dark:text-gray-400">
        <span className="font-semibold">ISBN-13:</span> {isbn13}
      </p>
      <p className="text-gray-700 dark:text-gray-400">
        <span className="font-semibold">ISBN-10:</span> {isbn10}
      </p>
      <p className="text-gray-700 dark:text-gray-400">
        <span className="font-semibold">Page Count:</span> {pageCount || "N/A"}
      </p>
      <p className="text-gray-700 dark:text-gray-400">
        <span className="font-semibold">Categories:</span>{" "}
        {categories?.join(", ") || "N/A"}
      </p>
      <p className="text-gray-700 dark:text-gray-400">
        <span className="font-semibold">Average Rating:</span>{" "}
        {averageRating || "N/A"}
      </p>
      <p className="text-gray-700 dark:text-gray-400">
        <span className="font-semibold">Ratings Count:</span>{" "}
        {ratingsCount || "N/A"}
      </p>
      <p className="text-gray-700 dark:text-gray-400">
        <span className="font-semibold">Description:</span>{" "}
        {description || "N/A"}
      </p>

      <button className="button me-auto mt-2" onClick={addToLibrary}>
        Edit and Confirm Details
      </button>
    </div>
  );
}

export default GoogleBookSearchCard;
