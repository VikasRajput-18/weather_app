import React from "react";
import { Search } from "lucide-react";
import Card from "./card";

const WeatherScreen = () => {
  return (
    <div className="col-span-12 md:col-span-8 lg:col-span-9">
      <div className="relative bg-gray-200 dark:bg-[#293338] rounded-md ring-1 h-12">
        <Search className="absolute left-2 top-3 dark:stroke-white" />
        <input
          type="search"
          className="h-full w-full bg-transparent py-4 px-3 pl-12 dark:text-white"
          placeholder="Search Weather City"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#293338] dark:text-white">
          London
        </h2>

        <div className="mt-8 grid grid-cols-12 gap-4">
          <Card title="Temperature" frequency="18 C" />
          <Card title="Temperature" frequency="18 C" />
          <Card title="Temperature" frequency="18 C" />
          <Card title="Temperature" frequency="18 C" />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="dark:text-white text-[#293338] text-2xl font-semibold">
          Outfit Recommendation
        </h3>

        <div className="mt-4">
          <p className="dark:text-white text-[#293338] font-semibold">
            Wear a jacket
          </p>
          <p className="dark:text-[#9EADB8] text-neutral-600">
            It&apos;s a bit chilly out there.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherScreen;
