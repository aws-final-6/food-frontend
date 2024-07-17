// MyPageBookmark.tsx
"use client";
import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { mypageBookmark } from "./action";
import { UserContext } from "@/providers/userProvider";
import MyPageFavoriteButton from "./MyPageFavoriteButton";
MyPageFavoriteButton;

interface IBookmark {
  recipe_id: string;
  recipe_title: string;
}

const MyPageBookmark = () => {
  const [bookmarks, setBookmarks] = useState<IBookmark[]>([]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      if (userData?.id && userData?.accessToken) {
        try {
          const result = await mypageBookmark(
            userData.id,
            userData.accessToken
          );
          setBookmarks(result);
        } catch (error) {
          console.error("Failed to fetch bookmarks:", error);
        }
      }
    };
    fetchData();
  }, [userData]);

  return (
    <Card className="py-10 px-10">
      <CardBody className="flex flex-col gap-3">
        {bookmarks.length === 0 ? (
          <p className="px-5 py-10 font-gaegu">즐겨찾기가 텅 비었어요!</p>
        ) : (
          bookmarks.map((bookmark) => (
            <div
              key={`bookmark_${bookmark.recipe_id}`}
              className="flex flex-row gap-5 items-center"
            >
              <MyPageFavoriteButton
                recipeId={bookmark.recipe_id}
                setBookmarks={setBookmarks}
              />
              <p>{bookmark.recipe_title}</p>
            </div>
          ))
        )}
      </CardBody>
    </Card>
  );
};

export default MyPageBookmark;
