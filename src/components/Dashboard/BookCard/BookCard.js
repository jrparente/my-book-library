import Link from "next/link";
import Image from "next/image";

const getStatusColor = (status) => {
  switch (status) {
    case "To Read":
      return "#FFEB99"; // Light Yellow
    case "Reading":
      return "#B2FFB2"; // Light Green
    case "Read":
      return "#99CCFF"; // Light Blue
    case "On Hold":
      return "#FFCC99"; // Light Orange
    case "Abandoned":
      return "#FF9999"; // Light Red
    case "Wishlist":
      return "#E0B0FF"; // Light Purple
    default:
      return "#CCCCCC"; // Light Grey as default
  }
};

const BookCard = ({ book }) => {
  if (!book) return null;

  let publishedYear = null;

  if (book && book.published_date) {
    const date = new Date(book.published_date);

    if (!isNaN(date.getTime())) {
      // Check if date is valid
      publishedYear = date.getFullYear();
    } else {
      console.error("Invalid date format:", book.published_date);
    }
  }

  return (
    <Link
      href={`/dashboard/books/${book.id}`}
      className="flex flex-wrap p-2 sm:p-4  bg-white border rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div className="flex flex-col w-full lg:w-1/3 pr-4">
        <Image
          src={book?.imageUrl ? book.imageUrl : "/images/placeholder-image.png"}
          alt="Book cover"
          width={200}
          height={350}
          objectFit="cover"
          className="w-full mx-auto lg:mx-0"
        />
        {book.status && (
          <div
            className="px-2 py-1 rounded-full text-gray-900 text-xs mt-2 me-auto"
            style={{ backgroundColor: getStatusColor(book.status) }}
          >
            <span>{book.status}</span>
          </div>
        )}
      </div>
      <div className="w-full lg:w-2/3 flex flex-col justify-between mt-4 lg:mt-0">
        <div className="flex flex-col ">
          {book.series && (
            <div className="flex items-center bg-gray-300 px-2 py-1 rounded-full mb-2 me-auto text-sm text-gray-900">
              📚 {book.series} {book.volume && `#${book.volume}`}
            </div>
          )}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {book.title}
          </h3>
          {book.author_first_name && book.author_last_name && (
            <p className="text-md font-medium text-gray-600 mb-2 dark:text-white">{`${book.author_first_name} ${book.author_last_name}`}</p>
          )}
          <div className="flex flex-row gap-2">
            {publishedYear && (
              <div className="text-xs font-bold text-gray-600 dark:text-white">
                {publishedYear}
              </div>
            )}
            {book.pages && (
              <div className="text-xs text-gray-600 dark:text-white">{`${book.pages} pages`}</div>
            )}
          </div>

          {book.isbn && (
            <div className="text-xs text-gray-600 dark:text-white">{`ISBN: ${book.isbn}`}</div>
          )}
        </div>
        <div className="mt-2">
          {book.quantity && (
            <div className="text-xs text-gray-600 dark:text-white">{`Copies: ${book.quantity}`}</div>
          )}
          {book.created_at && (
            <div className="text-xs text-gray-600 dark:text-white">{`Added: ${book.created_at}`}</div>
          )}
          {/* More info can go here */}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
