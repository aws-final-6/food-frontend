"use client";
import { Button } from "@nextui-org/button";
import React, { useContext, useState, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { updateBookmark } from "./action";
import { UserContext } from "@/providers/userProvider";

interface IFavorite {
  recipe_no: number;
}
const FavoriteButton = ({ recipe_no }: IFavorite) => {
  const { userData, addFavorite, removeFavorite, isUserDataEmpty } =
    useContext(UserContext);
  const [star, setStar] = useState(false);

  useEffect(() => {
    if (
      !isUserDataEmpty() &&
      userData &&
      userData[0].favorite.includes(recipe_no)
    ) {
      setStar(true);
    }
  });

  async function handleFavorite() {
    if (star === false) {
      const res = await updateBookmark(userData[0].id, recipe_no);
      addFavorite(recipe_no);
    } else {
      const res = await updateBookmark(userData[0].id, recipe_no);
      removeFavorite(recipe_no);
    }
    setStar(!star);
  }
  return (
    <div>
      <Button
        key={recipe_no}
        variant="bordered"
        isIconOnly
        color="warning"
        onClick={handleFavorite}
      >
        {star ? <FaStar /> : <FaRegStar />}
      </Button>
    </div>
  );
};

export default FavoriteButton;
