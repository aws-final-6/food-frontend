"use client";

import React, { useEffect, useState } from "react";
import { SearchRecipeAPI } from "@/components/Navbar/action";
import { subtitle } from "@/components/primitives";
import FoodCard from "@/components/Recommend/FoodCard";
import { IRecipe } from "@/components/Recommend/CardCarousel";
const Page = ({ params }: { params: { slug: string } }) => {
  const keyword = decodeURIComponent(params.slug);
  const [data, setData] = useState<IRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await SearchRecipeAPI(keyword, "page");
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [keyword]);

  if (isLoading) {
    return <div className="min-h-[600px]">Loading...</div>;
  }

  if (!data) {
    return <div className="min-h-[600px]">레시피가 없네요 ㅠㅠ </div>;
  }

  return (
    <>
      <p className={subtitle()}>{keyword}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {data.map((food: IRecipe, i: number) => (
          <FoodCard key={i} cName={"recipeSearch"} index={i} food={food} />
        ))}
      </div>
    </>
  );
};

export default Page;
