import React from "react";

interface CardProps {
  title: string;
  frequency: string;
}

const Card = ({ title, frequency }: CardProps) => {
  return (
    <div className="col-span-12 md:col-span-6 dark:bg-[#293338] bg-neutral-200 rounded-md hover:opacity-70 transition-all duration-200 ease-in-out p-8">
      <h3 className="dark:text-white text-[#293338] text-xl md:text-2xl font-semibold">
        {title}
      </h3>
      <h3 className="dark:text-white text-[#293338] text-2xl md:text-4xl font-bold">
        {frequency}
      </h3>
    </div>
  );
};

export default Card;
