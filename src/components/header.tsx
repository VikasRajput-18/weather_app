"use client";

import { useTheme } from "@/context/ThemeProvider";
import React from "react";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="h-20 w-full bg-white dark:bg-[#293338] border-b">
      <nav className="container mx-auto flex items-center justify-between px-8 w-full h-full">
        <h2 className="text-[#293338] dark:text-white text-xl md:text-3xl font-semibold">
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
