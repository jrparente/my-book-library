function BookSearchCard({ book }) {
  const isbnKey = Object.keys(book)[0];
  const bookDetails = book[isbnKey];

  const authors = bookDetails?.authors
    ? bookDetails.authors.map((author) => author.name).join(", ")
    : "N/A";
  const publishers = bookDetails?.publishers
    ? bookDetails.publishers.map((publisher) => publisher.name).join(", ")
    : "N/A";
  const genres = bookDetails?.subjects
    ? bookDetails.subjects.map((subject) => subject.name).join(", ")
    : "N/A";
  console.log(bookDetails);
  return (
    <div className="flex flex-col flex-wrap p-2 sm:p-4 md:p-6 bg-white border rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <img
        src={
          bookDetails?.cover
            ? bookDetails?.cover.large
            : "/images/placeholder-image.png"
        }
        alt={`${bookDetails?.title} cover`}
        className="w-1/4 md:w-1/6 lg:w-1/8 object-cover mb-4 rounded-lg shadow"
      />
      <h2 className="text-2xl font-extrabold mb-2 text-gray-900 dark:text-white">
        {bookDetails?.title || "N/A"}
      </h2>
      <p className="text-lg mb-1 text-gray-700 dark:text-gray-300">
        <span className="font-semibold">Author:</span> {authors}
      </p>
      <p className="text-lg mb-1 text-gray-700 dark:text-gray-300">
        <span className="font-semibold">ISBN 13:</span>{" "}
        {bookDetails?.identifiers.isbn_13
          ? bookDetails?.identifiers.isbn_13[0]
          : "N/A"}
      </p>
      <p className="text-lg mb-1 text-gray-700 dark:text-gray-300">
        <span className="font-semibold">Publisher:</span> {publishers}
      </p>
      <p className="text-lg mb-1 text-gray-700 dark:text-gray-300">
        <span className="font-semibold">Published Date:</span>{" "}
        {bookDetails?.publish_date || "N/A"}
      </p>
      <p className="text-lg mb-1 text-gray-700 dark:text-gray-300">
        <span className="font-semibold">Genre:</span> {genres}
      </p>
      <p className="text-lg mb-1 text-gray-700 dark:text-gray-300">
        <span className="font-semibold">Pages:</span>{" "}
        {bookDetails?.number_of_pages || "N/A"}
      </p>
      <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">
        {/* Add other attributes like description if available */}
        <span className="font-semibold">Description:</span>
      </p>
    </div>
  );
}

export default BookSearchCard;
