"use client";
import React, { useEffect, useState } from "react";

import { getToday } from "./action";

import FoodCard from "./FoodCard";
import CardCarousel from "./CardCarousel";
interface IRecipe {
  recipe_id: number;
  recipe_title: string;
  recipe_thumbnail: string;
  cate_no: number;
  situ_no: number;
}
const TodayRecommend = () => {
  const [data, setData] = useState<IRecipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getToday();

      setData(result);
    };

    fetchData();
  }, []);

  if (data.length == 0) return <></>;

  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    //   {/* {data.map((food, i) => (
    //     <FoodCard cName="today" index={i} food={food} />
    //   ))} */}
    //   <CardCarousel data={data} />
    // </div>
    <div>
      <CardCarousel data={data} cName="today" />
    </div>
  );
};

export default TodayRecommend;
