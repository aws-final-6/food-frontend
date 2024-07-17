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
      <Card>
        <CardHeader className="flex flex-col justify-center items-center gap-5 py-20">
          <Image
            src={data.image[0]}
            alt="food"
            width={400}
            height={400}
            className="rounded"
          />

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
        </CardHeader>
        <CardBody className="flex flex-col justify-center items-center gap-10">
          <NutritionInfo ingredients={data.recipeIngredient} />
          <div className="w-1/2">
            <p className={subtitle()}>재료</p>
            <div className="grid grid-cols-3 border-main border-4 border-dashed">
              {data.recipeIngredient.map((ingredient: IIngredient) => (
                <p key={ingredient.ingredient} className="text-center">
                  {ingredient.ingredient} {ingredient.amount}
                </p>
              ))}
            </div>
          </div>
          <div>
            {data.recipeInstructions.map((recipe: IInstruction, i: number) => (
              <div className="grid grid-cols-2 w-9/12 mt-3" key={i}>
                <Image
                  src={recipe.image}
                  width={300}
                  height={300}
                  alt="image"
                />
                <div className="flex flex-row gap-2">
                  <Chip color="warning" variant="flat">
                    {i + 1}
                  </Chip>
                  <p>{recipe.step}</p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
      <div className="fixed bottom-20 right-20 flex flex-col gap-3 items-start justify-center z-30 w-40">
        <Timer />
        <ShoppingButton ingredients={data.recipeIngredient} />
        {userData && userData.nickname ? <BookmarkButton /> : <></>}
      </div>
    </div>
  );
};

export default RecipePage;
