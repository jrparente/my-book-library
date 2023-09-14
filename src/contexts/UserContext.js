import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/supabaseClient";

const AuthEvents = {
  SIGNED_IN: "SIGNED_IN",
  SIGNED_OUT: "SIGNED_OUT",
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(supabase.auth.getUser());
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [userProfile, setUserProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    const handleAuthStateChange = async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === AuthEvents.SIGNED_IN) {
        fetchUserProfile();
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
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase.from("users").select("*");

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log("User data fetched successfully", data);
        setUserProfile(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching user:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError("Error logging out: " + error.message);
    }
    setUser(null);
    router.push("/");
  };

  const updateUserProfile = async (newData) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from("users") // Replace with your actual table name
        .update({
          first_name: newData.firstName,
          last_name: newData.lastName,
          email: newData.email,
          // ... any other fields
        })
        .eq("id", user.id);

      if (error) {
        console.error("Error updating profile:", error);
        return false;
      }

      // Update local state if needed
      setUserProfile(data);

      return true;
    } catch (err) {
      console.error("An error occurred:", err);
      return false;
    }
  };

  const value = {
    user,
    session,
    loading,
    error,
    userProfile,
    logout,
    updateUserProfile,
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
