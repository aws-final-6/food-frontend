"use client";
import React, { useState, useEffect, useContext } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import Image from "next/image";
import { subtitle } from "@/components/primitives";
import { Chip } from "@nextui-org/chip";
import { getRecipe } from "./action";
import FavoriteButton from "@/components/Bookmark/FavoriteButton";
import ShoppingButton from "@/components/Button/ShoppingButton";
import Timer from "@/components/Button/Timer";
import BookmarkButton from "@/components/Button/BookmarkButton";
import NutritionInfo from "@/components/NutritionInfo";
import { UserContext } from "@/providers/userProvider";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import clsx from "clsx";
export interface IIngredient {
  ingredient: string;
  amount: string;
}

interface IInstruction {
  step: string;
  image: string;
}

const RecipePage = ({ params }: { params: { id: number } }) => {
  const { userData } = useContext(UserContext);
  const [data, setData] = useState<any>(null);
  const recipe_id = params.id;

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeData = await getRecipe(recipe_id);
      setData(recipeData);
    };

    fetchRecipe();
  }, [recipe_id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Card shadow="none">
        <CardHeader className="flex flex-col justify-center items-center gap-5 py-20">
          <div className="max-w-4xl w-full">
            <Image
              src={data.image[0]}
              alt="food"
              width={400}
              height={400}
              layout="responsive"
            />
          </div>
          <h2 className="font-jua text-3xl">{data.name}</h2>
          <div className="flex flex-row items-center justify-center gap-3">
            {userData && userData.nickname ? (
              <>
                <p>즐겨찾기 추가</p>
                <FavoriteButton recipe_id={Number(data.recipe_id)} />
              </>
            ) : (
              <></>
            )}
          </div>
          <NutritionInfo ingredients={data.recipeIngredient} />
        </CardHeader>
        <CardBody className="grid sm:grid-cols-3 grid-cols-1 sm:gap-10 gap-4 sm:px-10 px-4">
          <div className="order-1 sm:order-2 sm:col-span-1 col-span-1 w-full sm:sticky sm:top-0">
            <p className={clsx(subtitle(), "mb-5")}>재료</p>
            <div className="flex flex-col border-main border-4 border-dashed p-10">
              <CheckboxGroup>
                {data.recipeIngredient.map((ingredient: IIngredient) => (
                  <Checkbox
                    value={ingredient.ingredient}
                    key={`ingredient_${ingredient.ingredient}`}
                    color="warning"
                    lineThrough
                    className="mb-1"
                  >
                    {ingredient.ingredient} {ingredient.amount}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>
          </div>
          <div className="order-2 sm:order-1 sm:col-span-2 col-span-1 sm:px-8 px-4">
            <p className={clsx(subtitle(), "mb-5")}>레시피</p>
            <ol className="relative text-gray-500 border-s border-main dark:border-gray-700 dark:text-gray-400 border-dashed">
              {data.recipeInstructions.map(
                (recipe: IInstruction, i: number) => (
                  <li className="mb-10 ms-6" key={`recipe_step_${i}`}>
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-sub rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700 font-jua">
                      {i + 1}
                    </span>
                    <h3 className="font-medium leading-tight font-jua text-xl mb-3">
                      {recipe.step}
                    </h3>
                    <Image
                      src={recipe.image}
                      width={200}
                      height={200}
                      alt="image"
                    />
                  </li>
                )
              )}
            </ol>
          </div>
        </CardBody>
      </Card>
      <div className="fixed bottom-20 right-20 flex flex-col gap-3 items-start justify-center z-30 w-40">
        <Timer />
        <ShoppingButton ingredients={data.recipeIngredient} />
        {userData && userData.nickname ? (
          <BookmarkButton callPosition="recipePage" />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default RecipePage;
