import { useUser } from "@/contexts/UserContext";
import useToggle from "@/lib/useToggle";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import Logo from "./Logo";

const Header = () => {
  const [menuOpen, toggleMenu] = useToggle(false);
  const { user } = useUser();

  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Logo />

          <div className="flex md:order-2">
            {user ? (
              <Link
                href="/dashboard"
                type="button"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Get started
              </Link>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="hidden sm:inline-flex text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="hidden lg:inline-flex text-primary-700 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-primary-800 ml-2"
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
              <FiMenu className="w-5 h-5" />
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
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  href="/features"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
