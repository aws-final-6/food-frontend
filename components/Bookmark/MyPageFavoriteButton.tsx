// BookmarkButton.tsx
"use client";
import { Button } from "@nextui-org/button";
import React, { useContext, useState, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { removeBookmark, updateBookmark } from "./action";
import { UserContext } from "@/providers/userProvider";

interface IBookmark {
  recipe_id: string;
  recipe_title: string;
}

interface BookmarkButtonProps {
  recipeId: string;
  setBookmarks: React.Dispatch<React.SetStateAction<IBookmark[]>>;
}

const MyPageFavoriteButton: React.FC<BookmarkButtonProps> = ({
  recipeId,
  setBookmarks,
}) => {
  const { userData, addFavorite, removeFavorite, favorite } =
    useContext(UserContext);
  const [star, setStar] = useState(false);

  useEffect(() => {
    if (userData?.nickname && favorite) {
      if (favorite.includes(Number(recipeId))) {
        setStar(true);
      } else {
        setBookmarks((prevBookmarks) =>
          prevBookmarks.filter((bookmark) => bookmark.recipe_id !== recipeId)
        );
      }
    }
  }, [userData, favorite, recipeId]);

  async function handleFavorite() {
    if (userData?.id && userData?.accessToken) {
      try {
        if (!star) {
          await updateBookmark(
            userData.id,
            userData.accessToken,
            Number(recipeId)
          );
          addFavorite(Number(recipeId));
          setBookmarks((prevBookmarks) => [
            ...prevBookmarks,
            { recipe_id: recipeId, recipe_title: "" },
          ]);
        } else {
          await removeBookmark(
            userData.id,
            userData.accessToken,
            Number(recipeId)
          );
          removeFavorite(Number(recipeId));
          setBookmarks((prevBookmarks) =>
            prevBookmarks.filter((bookmark) => bookmark.recipe_id !== recipeId)
          );
        }

        setStar(!star);
      } catch (error) {
        console.error("Failed to update bookmark:", error);
      }
    }
  }

  return (
    <Button
      variant="bordered"
      isIconOnly
      color="warning"
      onClick={handleFavorite}
    >
      {star ? <FaStar /> : <FaRegStar />}
    </Button>
  );
};

export default MyPageFavoriteButton;
