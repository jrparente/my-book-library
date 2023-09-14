import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = window.localStorage.getItem("dark-mode");
      return storedValue === "true";
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("dark-mode", isDarkMode);
      document.documentElement.classList.toggle("dark", isDarkMode);
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
