import React, { useEffect, useState } from "react";
import Layout from "../layout";
import Link from "next/link";
import { useLoans } from "@/contexts/LoansContext";
import { useBooks } from "@/contexts/BooksContext";
import { useUser } from "@/contexts/UserContext";
import { AiOutlineSearch } from "react-icons/ai";

const getStatusColor = (isOverdue) => {
  return isOverdue ? "bg-red-700" : "bg-green-700";
};

const LoanedBooks = () => {
  const { loanedBooks, fetchLoanedBooks, loading } = useLoans();
  const { books } = useBooks();
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLoans, setFilteredLoans] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      fetchLoanedBooks(user.id);
    }
  }, [user]);

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
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 md:mt-8 lg:mt-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl mb-4 text-gray-800 dark:text-white">
            Loaned Books
          </h1>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 rounded-md text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search for a loaned book..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link href="/dashboard/loanedbooks/AddNewLoan" className="button">
              Add New Loan
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full gap-4 mb-28 sm:mb-10 h-10">
          <div className="flex-1 flex items-center gap-2 justify-start p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <strong>Total Loans:</strong> {totalLoans}
          </div>
          <div className="flex-1 flex items-center gap-2 justify-start p-4 bg-gray-100 dark:bg-gray-800 rounded">
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
                  className="flex flex-col justify-between p-4 bg-white border rounded shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-base">{matchingBook?.title}</h2>
                    <div
                      className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(
                        isOverdue
                      )}`}
                    >
                      {isOverdue ? "Overdue" : "In Time"}
                    </div>
                  </div>
                  <div>
                    <p>Loaned to: {loan.borrowerName}</p>
                    <p>
                      Due date: {new Date(loan.dueDate).toLocaleDateString()}
                    </p>
                  </div>
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
