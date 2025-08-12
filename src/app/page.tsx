import SearchHistory from "@/components/search-history";
import WeatherScreen from "@/components/weather-screen";
import React from "react";

const Home = () => {
  return (
    <section className="min-h-screen w-full bg-white dark:bg-[#121417] pb-10">
      <div className="grid grid-cols-12 gap-4 pt-8 px-8 md:px-16">
        <SearchHistory />
        <WeatherScreen />
      </div>
    </section>
  );
};

export default Home;
