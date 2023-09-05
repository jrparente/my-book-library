import { useRouter } from "next/router";
import { useLoans } from "@/contexts/LoansContext";
import { useBooks } from "@/contexts/BooksContext";
import Layout from "../layout";

export default function LoanDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { loanedBooks, deleteLoan } = useLoans();
  const { books } = useBooks();

  const specificLoan = loanedBooks.find((loan) => loan.loanid === id);

  const handleDeleteLoan = async () => {
    const success = await deleteLoan(id);
    if (success) {
      alert("Loan deleted successfully");
      router.push("/dashboard/loanedbooks"); // Navigate to wherever your loans list is
    } else {
      alert("Failed to delete loan");
    }
  };

  if (!specificLoan) {
    return <div>Loading...</div>;
  }

  const bookDetails = books.find((book) => book.id === specificLoan?.bookId);

  return (
    <Layout>
      <div className="p-4">
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
            onClick={handleDeleteLoan}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Loan
          </button>
        </div>
      </div>
    </Layout>
  );
}
