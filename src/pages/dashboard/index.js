import { useBooks } from "@/contexts/BooksContext";
import { useLoans } from "@/contexts/LoansContext";
import { useUser } from "@/contexts/UserContext";
import React, { useEffect } from "react";
import Layout from "./layout";
import Link from "next/link";

const SectionCard = ({ title, description, href = "/" }) => (
  <Link
    href={href}
    className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {title}
    </h5>
    <p class="font-normal text-gray-700 dark:text-gray-400">{description}</p>
    {/* You can add buttons or other interactive elements here */}
  </Link>
);

const Dashboard = () => {
  const { user } = useUser();
  const { books } = useBooks();
  const { loanedBooks, fetchLoanedBooks } = useLoans();

  useEffect(() => {
    if (user && user.id) {
      fetchLoanedBooks(user.id);
    }
  }, [user, fetchLoanedBooks]);

  return (
    <Layout>
      {/* Main Content */}

      <div className="p-4 mt-14">
        <h1 className="text-3xl mb-4 dark:text-white">
          My Book Library Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard
            title="My Library"
            description={`You have ${books.length} books.`}
            href="/dashboard/books"
          />
          <SectionCard
            title="Loaned Books"
            description={`You have ${loanedBooks.length} loaned books.`}
            href="/dashboard/"
          />
          <SectionCard
            title="Wishlist"
            description="Books you're interested in acquiring."
            href="/dashboard/"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
