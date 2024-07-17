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
  const { userData, addFavorite, removeFavorite, favorite } =
    useContext(UserContext);
  const [star, setStar] = useState(false);

  useEffect(() => {
    if (userData && userData.nickname && favorite) {
      if (favorite.includes(recipe_id)) setStar(true);
    }
  });

  async function handleFavorite() {
    if (userData && userData.nickname) {
      if (star === false) {
        const res = await updateBookmark(
          userData.id,
          userData.accessToken,
          recipe_id
        );
        addFavorite(recipe_id);
      } else {
        const res = await updateBookmark(
          userData.id,
          userData.accessToken,
          recipe_id
        );
        removeFavorite(recipe_id);
      }
      setStar(!star);
    }
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
