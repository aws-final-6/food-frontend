"use client";

import React, { useEffect, useState } from "react";
import { SearchIngredientAPI } from "@/components/Navbar/action";
import { subtitle } from "@/components/primitives";
import { IRecipe } from "@/components/Recommend/CardCarousel";
import FoodCard from "@/components/Recommend/FoodCard";

const Page = ({ params }: { params: { slug: string } }) => {
  const keyword = decodeURIComponent(params.slug);
  const [data, setData] = useState<IRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await SearchIngredientAPI(keyword, "page");
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
    return <div>Loading...</div>;
  }

  return (
    <>
      <p className={subtitle()}>{keyword}</p>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {data.map((food: IRecipe, i: number) => (
            <FoodCard
              key={i}
              cName={"ingredientSearch"}
              index={i}
              food={food}
            />
          ))}
        </div>
      ) : (
        <p>아무런 레시피가 없네요 ㅠㅠ</p>
      )}
    </>
  );
};

export default Page;
