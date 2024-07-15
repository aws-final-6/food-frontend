"use client";
import { Button } from "@nextui-org/button";
import React, { useContext, useState, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { updateBookmark } from "./action";
import { UserContext } from "@/providers/userProvider";

interface IFavorite {
  recipe_id: number;
}
const FavoriteButton = ({ recipe_id }: IFavorite) => {
  const { userData, addFavorite, removeFavorite, isUserDataEmpty } =
    useContext(UserContext);
  const [star, setStar] = useState(false);

  useEffect(() => {
    if (!isUserDataEmpty() && userData && userData[0].favorite) {
      if (userData[0].favorite.includes(Number(recipe_id))) setStar(true);
    }
  });

  async function handleFavorite() {
    console.log(recipe_id);
    if (star === false) {
      const res = await updateBookmark(
        userData[0].id,
        userData[0].accessToken,
        recipe_id
      );
      addFavorite(recipe_id);
    } else {
      const res = await updateBookmark(
        userData[0].id,
        userData[0].accessToken,
        recipe_id
      );
      removeFavorite(recipe_id);
    }
    setStar(!star);
  }
  return (
    <div>
      <Button
        key={recipe_id}
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
