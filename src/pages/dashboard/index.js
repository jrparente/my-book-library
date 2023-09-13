import { useBooks } from "@/contexts/BooksContext";
import { useLoans } from "@/contexts/LoansContext";
import { useUser } from "@/contexts/UserContext";
import React, { useEffect } from "react";
import Layout from "./layout";
import SectionCard from "@/components/Dashboard/SectionCard";
import Link from "next/link";
import { useShelves } from "@/contexts/ShelfContext";

const Dashboard = () => {
  const { user, userProfile } = useUser();
  const { books } = useBooks();
  const { shelves } = useShelves();
  const { loanedBooks, fetchLoanedBooks } = useLoans();
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const filteredBooks = books.filter(
    (book) => book.status !== "Wishlist"
  ).length;

  const numberOfShelves = shelves.length;

  const wishlistBooks = books.filter(
    (book) => book.status === "Wishlist"
  ).length;

  useEffect(() => {
    if (user && user.id) {
      fetchLoanedBooks(user.id);
    }
  }, [user, fetchLoanedBooks]);

  const isEmptyLibrary = filteredBooks === 0;
  const isEmptyLoanedBooks = loanedBooks.length === 0;
  const isEmptyWishlist = wishlistBooks === 0;

  return (
    <Layout>
      {/* Main Content */}
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 md:mt-8 lg:mt-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
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
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 1.334C7.06.594 1.646-.84.293.653a1.158 1.158 0 0 0-.293.77v13.973c0 .193.046.383.134.55.088.167.214.306.366.403a.932.932 0 0 0 .5.147c.176 0 .348-.05.5-.147 1.059-.32 6.265.851 7.5 1.65V1.334ZM19.707.653C18.353-.84 12.94.593 11 1.333V18c1.234-.799 6.436-1.968 7.5-1.65a.931.931 0 0 0 .5.147.931.931 0 0 0 .5-.148c.152-.096.279-.235.366-.403.088-.167.134-.357.134-.55V1.423a1.158 1.158 0 0 0-.293-.77Z" />
              </svg>
            }
            color="blue"
          />
          <SectionCard
            title="Shelves"
            description={
              numberOfShelves === 0
                ? "No shelves yet. Start organizing your books!"
                : `You have ${numberOfShelves} shelves.`
            }
            href="/dashboard/shelves"
            icon={
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6.143 1H1.857A.857.857 0 0 0 1 1.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 7 6.143V1.857A.857.857 0 0 0 6.143 1Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 17 6.143V1.857A.857.857 0 0 0 16.143 1Zm-10 10H1.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 7 16.143v-4.286A.857.857 0 0 0 6.143 11Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"
                />
              </svg>
            }
            color="green"
          />
          <SectionCard
            title="Loaned Books"
            description={
              isEmptyLoanedBooks
                ? "No loaned books."
                : `You have ${loanedBooks.length} loaned books.`
            }
            href="/dashboard/loanedbooks"
            icon={
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3"
                />
              </svg>
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
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 23 23"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"
                />
              </svg>
            }
            color="red"
          />
        </div>

        {/* Quick Actions Section */}
        <div className="w-full flex flex-wrap space-x-8 mt-8 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h2 className="text-2xl mb-2">Quick Actions</h2>
          <div className="flex space-x-4">
            <Link href="/dashboard/books/add" className="button">
              Add Book
            </Link>
            <Link href="/dashboard/loanedbooks/add" className="button">
              Add Loan
            </Link>
            <Link href="/dashboard/shelf/add" className="button">
              Add Shelf
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
