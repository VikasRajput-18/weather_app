"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface WeatherContextType {
  history: string[];
  addToHistory: (city: string) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [history, setHistory] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedHistory = localStorage.getItem("weatherHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const addToHistory = (city: string) => {
    if (!city.trim()) return;
    setHistory((prev) => {
      const updated = [city, ...prev.filter((c) => c !== city)].slice(0, 5);
      localStorage.setItem("weatherHistory", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <WeatherContext.Provider
      value={{ history, addToHistory, setSearch, search }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context)
    throw new Error("useWeatherContext must be used inside WeatherProvider");
  return context;
};
