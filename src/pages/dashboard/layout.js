import Header from "@/components/Dashboard/Header";
import Aside from "@/components/Dashboard/Aside";
import { useUser } from "@/contexts/UserContext";
import useToggle from "@/lib/useToggle";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Footer from "@/components/Dashboard/Footer";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const [asideOpen, toggleAside] = useToggle(false);
  const [menuOpen, toggleMenu] = useToggle(false);
  const { fetchUserProfile, logout, user } = useUser();
  const router = useRouter();

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    image_url: null,
  });

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      console.log("User not logged in. Redirecting to login page.");
      router.push("/login"); // Redirect to the sign-in page if the user is not logged in
    } else {
      const fetchUser = async () => {
        const fetchedProfile = await fetchUserProfile();
        setUserProfile(fetchedProfile);
      };
      fetchUser();
    }
  }, [user, router, fetchUserProfile]);

  const handleLogout = async () => {
    await logout(); // Assuming `logout` is a function that clears user session
    router.push("/"); // Redirecting to login page
  };

  return (
    <>
      <Head>
        <title>My Book Library</title>
      </Head>
      <div className="bg-gray-100 min-h-screen flex">
        <Header
          toggleMenu={toggleMenu}
          userProfile={userProfile}
          toggleAside={toggleAside}
        />
        {menuOpen && (
          <nav
            style={{
              position: "absolute",
              top: `41px`,
              right: `10px`,
            }}
            className={`z-50 my-4 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 ${
              menuOpen ? "block" : "hidden"
            } `}
            id="dropdown-user"
          >
            <div className="px-4 py-3" role="none">
              <p className="text-sm text-gray-900 dark:text-white" role="none">
                {userProfile[0].firstName || "User"}{" "}
                {userProfile[0].lastName || "Name"}
              </p>
              <p
                className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                role="none"
              >
                {userProfile[0].email || "user@email.com"}
              </p>
            </div>
            <ul className="py-1" role="none">
              <li>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Settings
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </nav>
        )}
        <Aside asideOpen={asideOpen} />
        <main className="w-full p-4 sm:ml-64 bg-white dark:bg-gray-900">
          {children}
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
