"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../redux/slices/themeSwitcher/themeSlice"
export default function ThemeProvider({ children }) {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    if (storedTheme !== theme) {
      dispatch(changeTheme()); 
    }
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    dispatch(changeTheme());
  };

  return (
    <div>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded bg-white text-black dark:bg-black dark:text-white"
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
      {children}
    </div>
  );
}
