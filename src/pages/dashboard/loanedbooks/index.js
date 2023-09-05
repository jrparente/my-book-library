import React, { useEffect, useState } from "react";
import Layout from "../layout";
import Link from "next/link";
import { useLoans } from "@/contexts/LoansContext";
import { useBooks } from "@/contexts/BooksContext";
import { useUser } from "@/contexts/UserContext";

const getStatusColor = (isOverdue) => {
  return isOverdue ? "bg-red-700" : "bg-green-700";
};

const LoanedBooks = () => {
  const { loanedBooks, fetchLoanedBooks } = useLoans();
  const { books } = useBooks();
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLoans, setFilteredLoans] = useState([]);

  useEffect(() => {
    fetchLoanedBooks(user.id);
  }, []);

  useEffect(() => {
    setFilteredLoans(
      loanedBooks.filter((loan) => {
        const matchingBook = books.find((book) => book.id === loan.bookId);
        return matchingBook?.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
    );
  }, [searchTerm, loanedBooks, books]);

  const totalLoans = filteredLoans.length;
  const overdueLoans = filteredLoans.filter(
    (loan) => new Date(loan.dueDate) < new Date()
  ).length;

  return (
    <Layout>
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-3xl mb-4 text-gray-800 dark:text-white">
            Loaned Books
          </h1>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 rounded-md text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search for a loaned book..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link
              href="/dashboard/loanedbooks/AddNewLoan"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add New Loan
            </Link>
          </div>
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <strong>Total Loans:</strong> {totalLoans}
          </div>
          <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <strong>Overdue Loans:</strong> {overdueLoans}
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {filteredLoans.map((loan, index) => {
              const matchingBook = books.find(
                (book) => book.id === loan.bookId
              );
              const isOverdue = new Date(loan.dueDate) < new Date();

              return (
                <Link
                  key={loan.loanid}
                  href={`/dashboard/loanedbooks/${loan.loanid}`}
                  className="p-4 bg-white border rounded shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-xl">{matchingBook?.title}</h2>
                    <div
                      className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(
                        isOverdue
                      )}`}
                    >
                      {isOverdue ? "Overdue" : "In Time"}
                    </div>
                  </div>
                  <p>Loaned to: {loan.borrowerName}</p>
                  <p>Due date: {new Date(loan.dueDate).toLocaleDateString()}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoanedBooks;
