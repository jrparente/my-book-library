import { useRouter } from "next/router";
import { useLoans } from "@/contexts/LoansContext";
import { useBooks } from "@/contexts/BooksContext";
import Layout from "../layout";
import DeleteModal from "@/components/Dashboard/DeleteModal";
import { useState } from "react";

export default function LoanDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { loanedBooks, deleteLoan } = useLoans();
  const { books } = useBooks();
  const [showModal, setShowModal] = useState(false);

  const specificLoan = loanedBooks.find((loan) => loan.loanid === id);

  const handleDeleteLoan = async () => {
    const success = await deleteLoan(id);
    if (success) {
      setShowModal(false);
      router.push("/dashboard/loanedbooks"); // Navigate to wherever your loans list is
    } else {
      setShowModal(false);
      alert("Failed to delete loan");
    }
  };

  if (!specificLoan) {
    return <div>Loading...</div>;
  }

  const bookDetails = books.find((book) => book.id === specificLoan?.bookId);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Layout>
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 md:mt-8 lg:mt-6 w-full">
        <div className="flex mb-4">
          <img
            src={bookDetails?.imageUrl || "/path/to/placeholder-image.png"}
            alt="Book cover"
            className="w-24 h-36 object-cover"
          />
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{bookDetails.title}</h1>
            <p>
              Author: {bookDetails.author_first_name}{" "}
              {bookDetails.author_last_name}
            </p>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-4">Loan Details</h2>
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg mb-4 text-gray-700 dark:text-gray-300">
          <div className="pb-2 mb-2 flex gap-2">
            <span className="font-semibold">Borrower:</span>
            <span>{specificLoan.borrowerName}</span>
          </div>
          <div className="pb-2 mb-2 flex gap-2">
            <span className="font-semibold">Borrower Email:</span>
            <span>{specificLoan.borrowerEmail}</span>
          </div>
          <div className="pb-2 mb-2 flex gap-2">
            <span className="font-semibold">Loan Date:</span>
            <span>{specificLoan.date}</span>
          </div>
          <div className="pb-2 mb-2 flex gap-2">
            <span className="font-semibold">Due Date:</span>
            <span>{specificLoan.dueDate}</span>
          </div>
          <div className="pb-2 mb-2 flex gap-2">
            <span className="font-semibold">Status:</span>
            <span>{specificLoan.loanStatus}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Loan
          </button>
        </div>
      </div>
      <DeleteModal
        showModal={showModal}
        handleDelete={handleDeleteLoan}
        handleClose={handleClose}
      />
    </Layout>
  );
}
