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

  return (
    <Link
      className="flex p-4 bg-gray-200 rounded-md shadow-md hover:shadow-lg"
      href={`/dashboard/books/${book.id}`}
    >
      <div className="mr-4">
        <Image
          src={book?.imageUrl ? book.imageUrl : "/images/placeholder-image.png"}
          alt="Book cover"
          width={70}
          height={100}
        />
      </div>
      <div className="flex flex-col">
        {book.series && (
          <div className="flex items-center bg-gray-300 px-2 py-1 rounded-full mb-2 me-auto">
            {/* Icon can be SVG or any other library you're using for web */}
            <span className="mr-1 text-xs">📚</span>
            <span className="text-xs">{`${book.series} ${
              book.volume ? `#${book.volume}` : ""
            }`}</span>
          </div>
        )}
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-gray-600 text-sm">
          {`${book.author_first_name} ${book.author_last_name}`}
        </p>
        {book.status && (
          <div
            className="px-2 py-1 rounded-full text-xs mt-2 me-auto"
            style={{ backgroundColor: getStatusColor(book.status) }}
          >
            <span>{book.status}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default BookCard;
