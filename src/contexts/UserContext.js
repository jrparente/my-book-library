import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/supabaseClient";

const AuthEvents = {
  SIGNED_IN: "SIGNED_IN",
  SIGNED_OUT: "SIGNED_OUT",
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleAuthStateChange = async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (
        event === AuthEvents.SIGNED_IN &&
        !router.pathname.startsWith("/dashboard")
      ) {
        console.log("changed router");
        router.push("/dashboard");
      }

      if (event === AuthEvents.SIGNED_OUT) {
        router.push("/");
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      subscription?.unsubscribe();
    };
  }, [router]);

  const fetchUserProfile = async () => {
    const user = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("users") // Replace with your actual table name
        .select("*")
        .eq("id", user.data.user.id)
        .select();

      if (data) {
        return data;
      }
      if (error) {
        setError("Error fetching user profile: " + error.message);
        console.error("Error fetching user profile:", error);
      }
    } else {
      setError("No user found.");
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError("Error logging out: " + error.message);
    }
  };

  const value = {
    user,
    session,
    loading,
    error,
    fetchUserProfile,
    logout,
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
