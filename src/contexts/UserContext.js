import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/supabaseClient";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check active sessions and sets the user
    const currentSession = supabase.auth.getSession();
    setSession(currentSession);
    setUser(session?.user ?? null);
    setLoading(false);

    // Listen for changes on auth state (login, logout, etc.)
    const authListener = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);

        if (event === "SIGNED_IN") {
          router.push("/dashboard");
        }

        if (event === "SIGNED_OUT") {
          router.push("/");
        }
      }
    );

    // return () => {
    //   authListener.unsubscribe();
    // };
  }, []);

  const fetchUserProfile = async () => {
    const user = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("users") // Replace with your actual table name
        .select("*")
        .eq("id", user.data.user.id)
        .single();

      if (data) {
        return data;
      }
      if (error) {
        console.error("Error fetching user profile:", error);
      }
    }
  };

  const value = {
    user,
    session,
    loading,
    fetchUserProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
