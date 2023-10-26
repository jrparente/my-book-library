import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import React from "react";
import Logo from "../Common/Logo";

const Header = ({ toggleMenu, userProfile, toggleAside }) => {
  return (
    <header className="fixed top-0 z-50 w-full bg-[#FBFBFA] border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={toggleAside}
            >
              <span className="sr-only">Open sidebar</span>
              <FiMenu className="w-6 h-6" />
            </button>
            <Logo />
          </div>

          <div className="flex items-center">
            <div className="flex items-center ml-3">
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                  onClick={toggleMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  {userProfile && userProfile[0] && userProfile[0].image_url ? (
                    <Image
                      width={40}
                      height={40}
                      className="w-8 h-8 rounded-full"
                      src={userProfile[0]?.image_url}
                      alt="User photo"
                    />
                  ) : (
                    <Image
                      width={40}
                      height={40}
                      className="w-8 h-8 rounded-full overflow-hidden"
                      src="/images/profile-placeholder.png"
                      alt="User photo"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
