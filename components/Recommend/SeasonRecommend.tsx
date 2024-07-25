"use client";
import { useEffect, useState } from "react";
import React from "react";
import { getSeasonal } from "./action";
import SeasonalCard from "./SeasonalCard";

interface ISeason {
  seasonal_name: string;
  seasonal_image: string;
}

const SeasonRecommend = () => {
  const [data, setData] = useState<ISeason[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSeasonal();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4 w-full">
      {data.map((food: ISeason, i: number) => (
        <SeasonalCard
          key={`seasonal_card_${food.seasonal_name}`}
          seasonal_image={food.seasonal_image}
          seasonal_name={food.seasonal_name}
          index={i}
        />
      ))}
    </div>
  );
};

export default SeasonRecommend;
