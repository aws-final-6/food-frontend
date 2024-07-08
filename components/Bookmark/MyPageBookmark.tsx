"use client";
import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { mypageBookmark } from "./action";
import { UserContext } from "@/providers/userProvider";
import FavoriteButton from "./FavoriteButton";

interface IBookmark {
  _id: string;
  recipe_id: string;
  recipe_title: string;
}
const MyPageBookmark = () => {
  const [bookmark, setBookmark] = useState<IBookmark[]>([]);
  const { userData } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      const result = await mypageBookmark(
        userData[0].id,
        userData[0].accessToken
      );
      console.log(result);
      setBookmark(result);
    };
    fetchData();
  }, []);
  return (
    <Card className="py-10 px-10">
      <CardBody className="flex flex-col gap-3">
        {bookmark.length === 0 ? (
          <p className="px-5 py-10 font-gaegu">즐겨찾기가 텅 비었어요!</p>
        ) : (
          bookmark.map((book) => (
            <div key={book._id} className="flex flex-row gap-5 items-center">
              <FavoriteButton recipe_id={Number(book.recipe_id)} />
              <p>{book.recipe_title}</p>
            </div>
          ))
        )}
      </CardBody>
    </Card>
  );
};

export default MyPageBookmark;
