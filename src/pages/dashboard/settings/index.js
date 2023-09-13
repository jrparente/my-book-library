import React from "react";
import Layout from "../layout";
import { useTheme } from "@/contexts/ThemeContext";

const Settings = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Layout>
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 md:mt-8 lg:mt-6 w-full">
        <h1 className="text-3xl mb-4 text-gray-800 dark:text-white">
          Settings
        </h1>

        <div className="flex items-center gap-4">
          <p className="block font-medium text-gray-900 dark:text-white">
            Theme preference:
          </p>
          <div className="flex items-center">
            <span className="text-sm text-gray-900 dark:text-white mr-2">
              {isDarkMode ? "Dark" : "Light"}
            </span>
            <label
              htmlFor="darkModeToggle"
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  id="darkModeToggle"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                  className="hidden"
                />
                <div className="toggle__line w-10 h-6 bg-gray-400 rounded-full shadow-inner"></div>
                <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 -left-1"></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
