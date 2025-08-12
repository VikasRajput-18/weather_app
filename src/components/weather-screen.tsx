"use client";

import React, { useEffect, useState } from "react";
import { CloudDrizzle, Search } from "lucide-react";
import Card from "./card";
import useDebounce from "@/hooks/useDebounce";
import { WeatherData } from "@/type";
import { useWeatherContext } from "@/context/WeatherContext";
import { useNetwork } from "@/context/NetworkContext";

const WeatherScreen = () => {
  const { addToHistory, search, setSearch } = useWeatherContext();
  const { isOffline, retryFetch } = useNetwork();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debouncedValue = useDebounce(search, 500);
  const [cityWeatherData, setCityWeatherData] = useState<WeatherData | null>(
    null
  );

  const fetchWeatherData = async () => {
    if (!debouncedValue.trim()) {
      setCityWeatherData(null);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await retryFetch(
        async () => {
          const response = await fetch(
            `${
              process.env.NEXT_PUBLIC_WEATHER_BASE_URL ||
              "https://api.openweathermap.org/data/2.5/weather"
            }?q=${debouncedValue}&appid=${
              process.env.NEXT_PUBLIC_WEATHER_API_KEY ||
              "a6e828f08004844ec5cde51ba16b340a"
            }&units=metric`
          );

          if (!response.ok) {
            throw new Error("City not found");
          }

          const data: WeatherData = await response.json();
          setCityWeatherData(data);
          addToHistory(data.name);
        },
        3,
        2000
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
      setCityWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [debouncedValue]);

  return (
    <div className="col-span-12 md:col-span-8 lg:col-span-9 order-1 md:order-2">
      {/* Search Input */}
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

      {/* Error Message */}
      {error && <div className="mt-4 text-red-500 font-semibold">{error}</div>}

      {/* Weather Data */}
      {cityWeatherData && !error ? (
        <>
          <div className="mt-8">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#293338] dark:text-white">
              {loading ? "Loading..." : cityWeatherData?.name}
            </h2>

            <div className="mt-8 grid grid-cols-12 gap-4">
              <Card
                title="Temperature"
                frequency={`${cityWeatherData.main.temp} °C`}
                loading={loading}
              />
              <Card
                title="Feels Like"
                frequency={`${cityWeatherData.main.feels_like} °C`}
                loading={loading}
              />
              <Card
                title="Wind Speed"
                frequency={`${cityWeatherData.wind.speed} m/s`}
                loading={loading}
              />
              <Card
                title="Humidity"
                frequency={`${cityWeatherData.main.humidity} %`}
                loading={loading}
              />
            </div>
          </div>
          {/* Outfit Recommendation */}
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
                    {cityWeatherData.main.temp < 20
                      ? "Wear a jacket"
                      : cityWeatherData.weather[0].main === "Rain"
                      ? "Take an umbrella"
                      : "Sunglasses suggested"}
                  </p>
                  <p className="dark:text-[#9EADB8] text-neutral-600">
                    {cityWeatherData.main.temp < 20
                      ? "It's a bit chilly out there."
                      : cityWeatherData.weather[0].main === "Rain"
                      ? "Rainy weather ahead."
                      : "Bright and sunny."}
                  </p>
                </>
              )}
            </div>
          </div>
        </>
      ) : !loading && !error ? (
        // Empty state when no data
        <div className="mt-8 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
          <CloudDrizzle className="size-40 md:size-64 stroke-[9EADB8]" />

          <p className="text-lg md:text-3xl font-medium mt-2">
            No weather data available
          </p>
          <p className="text-sm md:text-xl mt-1">
            Search for a city to see the weather.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherScreen;
