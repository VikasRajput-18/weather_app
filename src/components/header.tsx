"use client";

import { useTheme } from "@/context/ThemeProvider";
import React from "react";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="h-20 w-full bg-white dark:bg-[#121417] border-b px-8 md:px-0">
      <nav className="container mx-auto flex items-center justify-between w-full h-full">
        <h2 className="text-[#121417] dark:text-white text-xl md:text-3xl font-semibold">
          WeatherWise
        </h2>

        <button onClick={toggleTheme} className="cursor-pointer text-3xl">
          {theme === "light" ? "🌙" : "🌞"}
        </button>
      </nav>
    </header>
  );
};

export default Header;
