import { useBooks } from "@/contexts/BooksContext";
import { useLoans } from "@/contexts/LoansContext";
import { useUser } from "@/contexts/UserContext";
import Layout from "./layout";
import SectionCard from "@/components/Dashboard/SectionCard";
import Link from "next/link";
import { useShelves } from "@/contexts/ShelfContext";
import { SiBookstack } from "react-icons/si";
import { AiFillHeart } from "react-icons/ai";
import { FaPeopleArrows } from "react-icons/fa";
import { PiBooks } from "react-icons/pi";

const Dashboard = () => {
  const { userProfile } = useUser();
  const { books } = useBooks();
  const { shelves } = useShelves();
  const { loanedBooks } = useLoans();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Calculate stats from context data
  const filteredBooks = books.filter(
    (book) => book.status !== "Wishlist"
  ).length;
  const countLoans = loanedBooks.filter((loan) => !loan.returned).length;
  const numberOfShelves = shelves.length;
  const wishlistBooks = books.filter(
    (book) => book.status === "Wishlist"
  ).length;

  const isEmptyLibrary = filteredBooks === 0;
  const isEmptyLoanedBooks = countLoans === 0;
  const isEmptyWishlist = wishlistBooks === 0;
  const isEmptyShelves = numberOfShelves === 0;

  return (
    <Layout>
      {/* Main Content */}
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 md:mt-8 lg:mt-6 w-full">
        <div className="flex flex-col mb-6">
          <div>
            <h1 className="text-3xl mb-4 dark:text-white">
              {`${greeting()}${
                userProfile[0]?.first_name
                  ? `, ${userProfile[0].first_name}`
                  : ""
              }`}
            </h1>
            <h2>Library overview</h2>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SectionCard
            title="My Library"
            description={
              isEmptyLibrary
                ? "No books in your library yet. Start adding some!"
                : `You have ${filteredBooks} books in your library.`
            }
            href="/dashboard/books"
            icon={
              <SiBookstack className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            }
            color="primary"
          />
          <SectionCard
            title="Shelves"
            description={
              isEmptyShelves
                ? "No shelves yet. Start organizing your books!"
                : `You have ${numberOfShelves} shelves.`
            }
            href="/dashboard/shelves"
            icon={
              <PiBooks className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            }
            color="green"
          />
          <SectionCard
            title="Loaned Books"
            description={
              isEmptyLoanedBooks
                ? "No loaned books."
                : `You have ${countLoans} loaned books.`
            }
            href="/dashboard/loanedbooks"
            icon={
              <FaPeopleArrows className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            }
            color="green"
          />
          <SectionCard
            title="Wishlist"
            description={
              isEmptyWishlist
                ? "No books in your wishlist. Start wishing!"
                : `You have ${wishlistBooks} books in your wishlist.`
            }
            href="/dashboard/wishlist"
            icon={
              <AiFillHeart className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            }
            color="red"
          />
        </div>

        {/* Quick Actions Section */}
        <div className="w-full flex flex-wrap gap-8 mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Quick Actions
          </h5>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard/books/AddNewBook" className="button">
              Add Book
            </Link>
            <Link href="/dashboard/loanedbooks/AddNewLoan" className="button">
              Add Loan
            </Link>
            <Link href="/dashboard/shelves/AddNewShelf" className="button">
              Add Shelf
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
