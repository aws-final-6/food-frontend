import React from "react";
import { SearchIngredientAPI } from "@/components/Navbar/action";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { subtitle } from "@/components/primitives";
import RecipeButton from "@/components/Recommend/RecipeButton";

interface IMeta {
  recipe_id: number;
  recipe_title: string;
  recipe_thumbnail: string;
}

const page = async ({ params }: { params: { slug: string } }) => {
  const keyword = decodeURIComponent(params.slug);
  const data = await SearchIngredientAPI(keyword, "page");
  return (
    <>
      <p className={subtitle()}>{keyword}</p>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
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
        <p>아무런 레시피가 없네요 ㅠㅠ</p>
      )}
    </>
  );
};

export default page;
