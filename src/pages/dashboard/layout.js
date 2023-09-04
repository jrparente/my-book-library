import Header from "@/components/Dashboard/Header";
import Aside from "@/components/Dashboard/Aside";
import { useUser } from "@/contexts/UserContext";
import useToggle from "@/lib/useToggle";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

const Layout = ({ children }) => {
  const [menuOpen, toggleMenu] = useToggle(false);
  const { fetchUserProfile } = useUser();

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    image_url: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedProfile = await fetchUserProfile();
      setUserProfile(fetchedProfile);
    };
    fetchUser();
  }, []);

  return (
    <>
      <Head>
        <title>My Book Library</title>
      </Head>
      <div className="bg-gray-100 min-h-screen flex">
        <Header toggleMenu={toggleMenu} userProfile={userProfile} />
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
                {userProfile.firstName || "User"}
              </p>
              <p
                className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                role="none"
              >
                {userProfile.email || "user@email.com"}
              </p>
            </div>
            <ul class="py-1" role="none">
              <li>
                <Link
                  href="/dashboard"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Sign out
                </Link>
              </li>
            </ul>
          </nav>
        )}
        <Aside />
        <main className="w-full p-4 sm:ml-64 bg-white dark:bg-gray-900">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
