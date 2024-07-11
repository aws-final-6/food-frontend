"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FilterSearchAPI } from "./action";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import Image from "next/image";
import RecipeButton from "@/components/Recommend/RecipeButton";

interface IMeta {
  recipe_id: number;
  recipe_title: string;
  recipe_thumbnail: string;
}

export default function FilteredSearchPage() {
  const searchParams = useSearchParams();
  const foodName = searchParams.get("foodName") || "";
  const [dislikedIngredients, setDislikedIngredients] = useState<string[]>([]);
  const [data, setData] = useState<IMeta[]>([]);
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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">필터링된 검색 결과</h1>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((food: IMeta, i: number) => (
            <Card key={i} className="py-4" isPressable>
              <CardHeader className="pb-0 pt-2 px-4 flex-col">
                <h4 className="font-bold text-large">{food.recipe_title}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2 flex items-center">
                <Image
                  alt={food.recipe_title}
                  className="object-cover rounded-xl"
                  src={food.recipe_thumbnail}
                  width={200}
                  height={200}
                />
              </CardBody>
              <RecipeButton recipe_no={food.recipe_id} />
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-xl text-center">아무런 레시피가 없네요 ㅠㅠ</p>
      )}
    </div>
  );
}
