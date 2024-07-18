"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import { getToday } from "./action";
import RecipeButton from "./RecipeButton";
import { useRouter } from "next/navigation";
interface IRecipe {
  recipe_id: number;
  recipe_title: string;
  recipe_thumbnail: string;
}
const TodayRecommend = () => {
  const [data, setData] = useState<IRecipe[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getToday();

      setData(result);
    };

    fetchData();
  }, []);

  if (data.length == 0) return <></>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {data.map((food, i) => (
        <Card
          key={i}
          className="hover:border-3 hover:border-main border-3"
          shadow="sm"
          isPressable
          onPress={() => router.push(`/recipe/${food.recipe_id}`)}
          radius="none"
        >
          <CardBody className="overflow-visible p-0">
            <Image
              alt={food.recipe_title}
              className="object-cover"
              src={food.recipe_thumbnail}
              width={400}
              height={200}
            />
          </CardBody>
          <CardFooter className="flex flex-col my-2 px-2 justify-center items-center">
            <h4 className="font-bold text-large">{food.recipe_title}</h4>
            <RecipeButton recipe_no={food.recipe_id} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TodayRecommend;
