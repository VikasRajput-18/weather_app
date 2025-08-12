"use client";
import { useWeatherContext } from "@/context/WeatherContext";
import React from "react";

const SearchHistory = () => {
  const { history, setSearch } = useWeatherContext();

  return (
    <div className="col-span-12 md:col-span-4 lg:col-span-3 order-2 md:order-1">
      <h3 className="text-2xl md:text-3xl font-bold dark:text-white text-[#293338]">
        Search History
      </h3>
      <div className="mt-8">
        {/* Search History */}
        {history.length > 0 && (
          <div className="mt-8">
            <h3 className="dark:text-white text-[#293338] text-2xl font-semibold">
              Recent Searches
            </h3>
            <ul className="mt-2 dark:text-[#9EADB8] text-neutral-600">
              {history.map((city, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:underline"
                  onClick={() => setSearch(city)}
                >
                  {index + 1}) {city}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHistory;
