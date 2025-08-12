"use client";
import { useEffect, useState } from "react";

const useDebounce = (searchText: string, delay: number) => {
  console.log(searchText, delay);
  const [debouncedValue, setDebouncedValue] = useState(searchText);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchText);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchText, delay]);

  return debouncedValue;
};

export default useDebounce;
