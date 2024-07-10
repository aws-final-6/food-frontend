import React from "react";
import { SearchRecipeAPI } from "@/components/Navbar/action";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import Image from "next/image";
import { subtitle } from "@/components/primitives";
import RecipeButton from "@/components/Recommend/RecipeButton";

interface IMeta {
  recipe_id: number;
  recipe_title: string;
  recipe_thumbnail: string;
}
const page = async ({ params }: { params: { slug: string } }) => {
  const keyword = decodeURIComponent(params.slug);
  const data = await SearchRecipeAPI(keyword, "page");
  //   console.log(data);
  return (
    <>
      <p className={subtitle()}>{keyword}</p>
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
    </>
  );
};

export default page;
