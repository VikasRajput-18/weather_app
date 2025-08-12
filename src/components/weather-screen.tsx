"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Card from "./card";
import useDebounce from "@/hooks/useDebounce";
import { WeatherData } from "@/type";

const WeatherScreen = () => {
  const [search, setSearch] = useState("London");
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(search, 500);

  const [cityWeatherData, setCityWeatherData] = useState<WeatherData | null>(
    null
  );

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WEATHER_BASE_URL}?q=${debouncedValue}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      );
      const data: WeatherData = await response.json();
      setCityWeatherData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [debouncedValue]);

  console.log("cityWeatherData", cityWeatherData);

  return (
    <div className="col-span-12 md:col-span-8 lg:col-span-9">
      <div className="relative bg-gray-200 dark:bg-[#293338] rounded-md ring-1 h-12">
        <Search className="absolute left-2 top-3 dark:stroke-white" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-full w-full bg-transparent py-4 px-3 pl-12 dark:text-white"
          placeholder="Search Weather City"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#293338] dark:text-white">
          {loading ? "Loading..." : cityWeatherData?.name}
        </h2>

        <div className="mt-8 grid grid-cols-12 gap-4">
          <Card
            title="Temperature"
            frequency={cityWeatherData ? `${cityWeatherData.main.temp} °C` : ""}
            loading={loading}
          />
          <Card
            title="Feels Like"
            frequency={
              cityWeatherData ? `${cityWeatherData.main.feels_like} °C` : ""
            }
            loading={loading}
          />
          <Card
            title="Wind Speed"
            frequency={
              cityWeatherData ? `${cityWeatherData.wind.speed} m/s` : ""
            }
            loading={loading}
          />
          <Card
            title="Humidity"
            frequency={
              cityWeatherData ? `${cityWeatherData.main.humidity} %` : ""
            }
            loading={loading}
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="dark:text-white text-[#293338] text-2xl font-semibold">
          Outfit Recommendation
        </h3>

        <div className="mt-4">
          {loading ? (
            <div className="h-5 w-1/2 bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
          ) : (
            <>
              <p className="dark:text-white text-[#293338] font-semibold">
                {cityWeatherData && cityWeatherData.main.temp < 20
                  ? "Wear a jacket"
                  : cityWeatherData?.weather[0].main === "Rain"
                  ? "Take an umbrella"
                  : "Sunglasses suggested"}
              </p>
              <p className="dark:text-[#9EADB8] text-neutral-600">
                {cityWeatherData && cityWeatherData.main.temp < 20
                  ? "It's a bit chilly out there."
                  : cityWeatherData?.weather[0].main === "Rain"
                  ? "Rainy weather ahead."
                  : "Bright and sunny."}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherScreen;
