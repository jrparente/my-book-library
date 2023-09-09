function GoogleBookSearchCard({ book }) {
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
    previewLink,
  } = book;

  const isbn13 =
    industryIdentifiers?.find((id) => id.type === "ISBN_13")?.identifier ||
    "N/A";
  const isbn10 =
    industryIdentifiers?.find((id) => id.type === "ISBN_10")?.identifier ||
    "N/A";

  return (
    <div className="p-4 border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
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
      <div>
        <img
          src={imageLinks?.thumbnail || ""}
          alt={title || "No image available"}
        />
      </div>
      <a href={previewLink} target="_blank" rel="noopener noreferrer">
        Preview Book
      </a>
    </div>
  );
}

export default GoogleBookSearchCard;
