"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FilterSearchAPI } from "./action";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import Image from "next/image";
import RecipeButton from "@/components/Recommend/RecipeButton";
import { IRecipe } from "@/components/Recommend/CardCarousel";
import FoodCard from "@/components/Recommend/FoodCard";

export default function FilteredSearchPage() {
  const searchParams = useSearchParams();
  const foodName = searchParams.get("foodName") || "";
  const [dislikedIngredients, setDislikedIngredients] = useState<string[]>([]);
  const [data, setData] = useState<IRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ingredients: string[] = [];
    for (let i = 1; i <= 5; i++) {
      const ingredient = searchParams.get(`dislikedIngredient${i}`);
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }
    setDislikedIngredients(ingredients);

    async function fetchData() {
      setIsLoading(true);
      try {
        const result = await FilterSearchAPI(foodName, "navbar", ingredients);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [foodName, searchParams]);

  if (isLoading) {
    return <div className="min-h-[600px]">Loading...</div>;
  }

  if (!data) {
    return <div className="min-h-[600px]">레시피가 없네요 ㅠㅠ </div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">필터링된 검색 결과</h1>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((food: IRecipe, i: number) => (
            <FoodCard key={i} cName={"filterSearch"} index={i} food={food} />
          ))}
        </div>
      ) : (
        <p className="text-xl text-center">아무런 레시피가 없네요 ㅠㅠ</p>
      )}
    </div>
  );
}
