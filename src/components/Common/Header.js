import { useUser } from "@/contexts/UserContext";
import useToggle from "@/lib/useToggle";
import Link from "next/link";

const Header = () => {
  const [menuOpen, toggleMenu] = useToggle(false);
  const { user } = useUser();

  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link className="flex items-center" href="/">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 16.5c0-1-8-2.7-9-2V1.8c1-1 9 .707 9 1.706M10 16.5V3.506M10 16.5c0-1 8-2.7 9-2V1.8c-1-1-9 .707-9 1.706"
              />
            </svg>
            <span className="self-center text-xl tracking-tight font-extrabold whitespace-nowrap dark:text-white ml-1">
              My Book Library
            </span>
          </Link>

          <div className="flex md:order-2">
            {user ? (
              <Link
                href="/dashboard"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Get started
              </Link>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="hidden sm:inline-flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="hidden lg:inline-flex text-blue-700 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-800 ml-2"
                >
                  Sign In
                </Link>
              </>
            )}
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              {/* SVG Icon */}
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                ></path>
              </svg>
            </button>
          </div>

          <div
            className="items-center justify-between w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul
              className={`flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 md:flex ${
                menuOpen ? "flex md:flex" : "hidden md:flex"
              }`}
            >
              <li>
                <Link
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  href="/features"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
