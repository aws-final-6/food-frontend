"use client";
import { Button } from "@nextui-org/button";
import { CardFooter } from "@nextui-org/card";
import Link from "next/link";
import React, { useContext } from "react";
import FavoriteButton from "../Bookmark/FavoriteButton";
import { UserContext } from "@/providers/userProvider";

interface IRecipe {
  recipe_no: number;
}
const RecipeButton = ({ recipe_no }: IRecipe) => {
  const { isUserDataEmpty } = useContext(UserContext);
  return (
    <>
      <CardFooter className="justify-center flex flex-row gap-5">
        <Link href={`/recipe/${recipe_no}`}>
          <Button className="bg-sub" variant="flat">
            레시피 보기
          </Button>
        </Link>
        {isUserDataEmpty() ? <></> : <FavoriteButton recipe_id={recipe_no} />}
      </CardFooter>
    </>
  );
};

export default RecipeButton;
