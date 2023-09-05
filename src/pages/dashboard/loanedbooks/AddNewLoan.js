import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useBooks } from "@/contexts/BooksContext";
import { useLoans } from "@/contexts/LoansContext";
import { useUser } from "@/contexts/UserContext";
import Layout from "../layout";

export default function AddNewLoan() {
  const router = useRouter();
  const { user } = useUser();
  const { books } = useBooks();
  const { addLoan } = useLoans();
  const [bookID, setBookID] = useState(null);
  const [bookTitle, setBookTitle] = useState("");
  const [borrower, setBorrower] = useState("");
  const [email, setEmail] = useState("");
  const [loanDate, setLoanDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loanStatus, setLoanStatus] = useState("Loaned");
  const [searchTerm, setSearchTerm] = useState("");

  const filterWishlist = books.filter((book) => book.status !== "Wishlist");

  const filteredBooks = filterWishlist.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle both bookID and searchTerm states
  const handleBookSelection = (book) => {
    setBookID(book.id);
    setSearchTerm(book.title);
  };

  useEffect(() => {
    if (bookID) {
      const selectedBook = filterWishlist.find((book) => book.id === bookID);
      if (selectedBook) {
        setBookTitle(selectedBook.title);
      }
    }
  }, [filterWishlist, bookID]);

  const handleAddLoan = async () => {
    if (!bookID || !borrower || !email || !loanDate || !returnDate) {
      alert("Please fill in all fields.");
      return;
    }

    const newLoan = {
      bookTitle,
      bookId: bookID,
      borrowerName: borrower,
      borrowerEmail: email,
      date: loanDate,
      dueDate: returnDate,
      userid: user.id,
      loanStatus,
    };

    const addedLoan = await addLoan(newLoan);

    if (addedLoan) {
      alert("Loan added successfully.");
      router.push("/dashboard/loanedbooks");
    } else {
      alert("Failed to add new loan.");
    }
  };
  console.log("bookId", bookID);
  return (
    <Layout>
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 md:mt-8 lg:mt-6 w-full">
        <h1 className="text-3xl mb-4 text-gray-800 dark:text-white">
          Add New Loan
        </h1>
        <form>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select Book:
              </label>
              <input
                type="text"
                placeholder="Search for a book..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
              <div className="relative flex flex-col mt-2">
                {searchTerm &&
                  filteredBooks.map((book) => {
                    console.log(book);
                    return (
                      <div
                        key={book.id}
                        onClick={() => handleBookSelection(book)}
                        className={`cursor-pointer hover:bg-gray-200 hover:text-gray-900 p-2 rounded me-auto ${
                          book.id === bookID
                            ? "bg-gray-300 text-gray-900"
                            : "bg-white text-gray-600"
                        }`}
                      >
                        {book.title}
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Borrower:
              </label>
              <input
                type="text"
                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter borrower's name"
                value={borrower}
                onChange={(e) => setBorrower(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Borrower Email:
              </label>
              <input
                type="email"
                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter borrower's email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Loan Date:
              </label>
              <input
                type="date"
                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                value={loanDate}
                onChange={(e) => setLoanDate(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Return Date:
              </label>
              <input
                type="date"
                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>

            <div className="w-full">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddLoan}
              >
                Add Loan
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
