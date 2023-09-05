import { useBooks } from "@/contexts/BooksContext";
import { useLoans } from "@/contexts/LoansContext";
import { useUser } from "@/contexts/UserContext";
import React, { useEffect } from "react";
import Layout from "./layout";
import SectionCard from "@/components/Dashboard/SectionCard";
import { FaBook, FaHandHolding, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { user } = useUser();
  const { books } = useBooks();
  const { loanedBooks, fetchLoanedBooks } = useLoans();

  const filteredBooks = books.filter(
    (book) => book.status !== "Wishlist"
  ).length;

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
        <h1 className="text-3xl mb-4 dark:text-white">
          My Book Library Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard
            title="My Library"
            description={
              isEmptyLibrary
                ? "No books in your library yet. Start adding some!"
                : `You have ${filteredBooks} books in your library.`
            }
            href="/dashboard/books"
            icon={<FaBook size={24} />}
            color="blue"
          />
          <SectionCard
            title="Loaned Books"
            description={
              isEmptyLoanedBooks
                ? "No loaned books. Start loaning out your books!"
                : `You have ${loanedBooks.length} loaned books.`
            }
            href="/dashboard/loanedbooks"
            icon={<FaHandHolding size={24} />}
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
            icon={<FaRegHeart size={24} />}
            color="red"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
