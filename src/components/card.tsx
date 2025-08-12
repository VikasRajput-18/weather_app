import React from "react";

interface CardProps {
  title: string;
  frequency?: string;
  loading?: boolean;
}

const Card = ({ title, frequency, loading }: CardProps) => {
  return (
    <div className="col-span-12 md:col-span-6 dark:bg-[#293338] bg-neutral-200 rounded-md p-8 transition-all duration-200 ease-in-out hover:opacity-70">
      {loading ? (
        <>
          <div className="h-6 w-1/2 bg-gray-400 dark:bg-gray-600 rounded animate-pulse mb-4"></div>
          <div className="h-8 w-1/3 bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
        </>
      ) : (
        <>
          <h3 className="dark:text-white text-[#293338] text-xl md:text-2xl font-semibold">
            {title}
          </h3>
          <h3 className="dark:text-white text-[#293338] text-2xl md:text-4xl font-bold">
            {frequency}
          </h3>
        </>
      )}
    </div>
  );
};

export default Card;
