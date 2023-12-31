import React, { createContext, useState, useEffect, useContext } from "react";
import supabase from "@/lib/supabaseClient";

const LoansContext = createContext();

export const useLoans = () => {
  return useContext(LoansContext);
};

export const LoansProvider = ({ children }) => {
  const [loanedBooks, setLoanedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLoanedBooks();
  }, []);

  const fetchLoanedBooks = async () => {
    const { data, error } = await supabase.from("loanedbooks").select("*");

    if (error) {
      console.error("Error fetching loaned books:", error);
    } else {
      setLoanedBooks(Array.isArray(data) ? data : [data]);
    }
    setLoading(false);
  };

  const addLoan = async (newLoan) => {
    try {
      const { data, error } = await supabase
        .from("loanedbooks")
        .insert([newLoan])
        .select();
      if (error) {
        console.error("Error adding new loan:", error);
        return null;
      }
      setLoanedBooks([...loanedBooks, data]);
      return data;
    } catch (err) {
      console.error("Exception while adding new loan:", err);
      return null;
    }
  };

  const deleteLoan = async (loanId) => {
    const { data, error } = await supabase
      .from("loanedbooks")
      .delete()
      .eq("loanid", loanId);

    if (error) {
      console.error("Error deleting loan:", error);
      return false;
    }
    const updatedLoans = loanedBooks.filter((loan) => loan.loanid !== loanId);
    setLoanedBooks(updatedLoans);
    return true;
  };

  const updateLoan = async (loanId, updatedLoan) => {
    const { data, error } = await supabase
      .from("loanedbooks")
      .update(updatedLoan)
      .eq("loanid", loanId)
      .select();

    if (error) {
      console.error("Error updating loan:", error);
      return false;
    }

    // Update the loan in the state
    setLoanedBooks((prevLoanedBooks) =>
      prevLoanedBooks.map((loan) =>
        loan.loanid === loanId ? { ...loan, ...updatedLoan } : loan
      )
    );

    return true;
  };

  const value = {
    loanedBooks,
    loading,
    fetchLoanedBooks,
    addLoan,
    deleteLoan,
    updateLoan,
  };

  return (
    <LoansContext.Provider value={value}>{children}</LoansContext.Provider>
  );
};
