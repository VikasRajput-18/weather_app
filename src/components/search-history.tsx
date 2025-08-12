import { SearchX } from "lucide-react";
import React from "react";

const searches: string[] = ["India", "London", "USA", "Paris"];
// const searches: string[] = [];

const SearchHistory = () => {
  return (
    <div className="col-span-12 md:col-span-4 lg:col-span-3">
      <h3 className="text-2xl md:text-3xl font-bold dark:text-white text-[#293338]">
        Search History
      </h3>
      <div className="mt-8">
        {searches.length > 0 ? (
          searches?.map((search, ind) => {
            return (
              <p
                className="dark:text-white text-[#293338] font-semibold"
                key={ind}
              >
                {ind + 1}. {search}
              </p>
            );
          })
        ) : (
          <div className="flex items-center justify-between flex-col gap-2 mt-8">
            <SearchX className="size-24 stroke-[#9EADB8]" />
            <p className="text-center font-semibold dark:text-white text-[#293338]">
              No recent searches
            </p>
            <p className="text-center dark:text-white text-[#9EADB8]">
              Your search history will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHistory;
