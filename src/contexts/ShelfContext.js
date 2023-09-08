import React, { createContext, useContext, useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient";

const ShelfContext = createContext();

export const useShelves = () => {
  return useContext(ShelfContext);
};

export const ShelfProvider = ({ children }) => {
  const [shelves, setShelves] = useState([]);

  // Fetch shelves
  const fetchShelves = async (userId) => {
    const { data, error } = await supabase
      .from("shelves")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching shelves: ", error);
      return;
    }

    setShelves(data);
  };

  const fetchInitialShelf = async (bookId) => {
    if (!bookId) return null;

    try {
      const { data, error } = await supabase
        .from("shelf_books")
        .select("shelf_id")
        .eq("book_id", bookId)
        .single(); // .single() expects a single row in the result

      if (error) {
        console.error("Error fetching initial shelf:", error);
        return null;
      }

      return data.shelf_id;
    } catch (error) {
      console.error("Exception fetching initial shelf:", error);
      return null;
    }
  };

  // Fetch a single shelf by its ID
  const fetchShelfById = async (shelfId) => {
    const { data, error } = await supabase
      .from("shelves")
      .select("*")
      .eq("shelf_id", shelfId)
      .single(); // Assuming each ID is unique and returns a single shelf

    if (error) {
      console.error("Error fetching shelf by ID: ", error);
      return null;
    }

    return data;
  };

  // Add new shelf
  const addShelf = async (userId, name, description) => {
    // Check if a shelf with this name already exists
    const existingShelf = shelves.find((shelf) => shelf.name === name);
    if (existingShelf) {
      console.error("A shelf with this name already exists.");
      return;
    }

    const { data, error } = await supabase
      .from("shelves")
      .insert([{ user_id: userId, name, description }])
      .select();

    if (error) {
      console.error("Error adding new shelf: ", error);
      return;
    }

    setShelves([...shelves, ...data]);
  };

  // Update shelf
  const updateShelf = async (shelfId, name, description) => {
    const { data, error } = await supabase
      .from("shelves")
      .update({ name, description })
      .eq("shelf_id", shelfId)
      .select();

    if (error) {
      console.error("Error updating shelf: ", error);
      return;
    }

    const updatedShelves = shelves.map((shelf) =>
      shelf.shelf_id === shelfId ? { ...shelf, ...data[0] } : shelf
    );

    setShelves(updatedShelves);
    return true;
  };

  // Delete shelf
  const deleteShelf = async (shelfId) => {
    const { error } = await supabase
      .from("shelves")
      .delete()
      .eq("shelf_id", shelfId);

    if (error) {
      console.error("Error deleting shelf: ", error);
      return;
    }

    const updatedShelves = shelves.filter(
      (shelf) => shelf.shelf_id !== shelfId
    );
    setShelves(updatedShelves);
  };

  // Add book to shelf
  const addBookToShelf = async (shelfId, bookId) => {
    const { data, error } = await supabase
      .from("shelf_books")
      .insert([{ shelf_id: shelfId, book_id: bookId }])
      .select();

    if (error) {
      console.error("Error adding book to shelf: ", error);
      return;
    }

    // Update state or re-fetch shelves if necessary
  };

  // Remove book from shelf
  const removeBookFromShelf = async (shelfId, bookId) => {
    const { error } = await supabase
      .from("shelf_books")
      .delete()
      .eq("shelf_id", shelfId)
      .eq("book_id", bookId);

    if (error) {
      console.error("Error removing book from shelf: ", error);
      return;
    }

    // Update state or re-fetch shelves if necessary
  };

  const value = {
    shelves,
    fetchShelves,
    fetchShelfById,
    fetchInitialShelf,
    addShelf,
    updateShelf,
    deleteShelf,
    addBookToShelf,
    removeBookFromShelf,
  };

  return (
    <ShelfContext.Provider value={value}>{children}</ShelfContext.Provider>
  );
};
