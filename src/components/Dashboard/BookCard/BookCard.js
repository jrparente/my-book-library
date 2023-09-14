import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
  const [isLoading, setLoading] = useState(true);
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
      className="group max-w-lg aspect-w-7 aspect-h-1 w-full overflow-hidden xl:aspect-w-6 xl:aspect-h-5"
    >
      <div className="relative m-0 shadow-lg flex">
        <div className="flex-no-shrink mx-auto">
          <Image
            src={
              book?.imageUrl ? book.imageUrl : "/images/placeholder-image.png"
            }
            alt="Book cover"
            loading="lazy"
            width={200}
            height={350}
            className={cn(
              "duration-700 ease-in-out group-hover:opacity-75",
              isLoading
                ? "scale-110 blur-2xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            )}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
        <div className="flex-1 relative">
          <div className="flex flex-col py-1 px-4 items-start h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {book.title}
            </h3>
            {book.author_first_name && book.author_last_name && (
              <p className="text-md font-medium text-gray-600 mb-2 dark:text-white">{`${book.author_first_name} ${book.author_last_name}`}</p>
            )}

            {book.series && (
              <div className="flex items-center bg-gray-300 px-2 py-1 rounded-full mb-2 text-xs text-gray-900">
                {book.series} {book.volume && `#${book.volume}`}
              </div>
            )}
            {book.status && (
              <div
                className="px-2 py-1 rounded-full text-gray-900 text-xs"
                style={{ backgroundColor: getStatusColor(book.status) }}
              >
                <span>{book.status}</span>
              </div>
            )}

            <div className="mt-auto flex flex-col lg:hidden">
              {publishedYear && (
                <div className="text-xs text-gray-600 dark:text-white">
                  <span className="font-semibold">Year:</span> {publishedYear}
                </div>
              )}
              {book.pages && (
                <div className="text-xs text-gray-600 dark:text-white">
                  <span className="font-semibold">Pages:</span> {book.pages}
                </div>
              )}
              {book.quantity && (
                <div className="text-xs text-gray-600 dark:text-white">
                  <span className="font-semibold">Copies:</span> {book.quantity}
                </div>
              )}
              {book.created_at && (
                <div className="text-xs text-gray-600 dark:text-white">
                  <span className="font-semibold">Added:</span>{" "}
                  {book.created_at}
                </div>
              )}
              {book.isbn && (
                <div className="text-xs text-gray-600 dark:text-white hidden sm:flex sm:flex-col">
                  <span className="font-semibold">ISBN:</span> {book.isbn}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
