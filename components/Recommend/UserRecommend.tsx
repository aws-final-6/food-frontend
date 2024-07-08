"use client";
import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { subtitle } from "../primitives";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { getPrefered } from "./action";
import { UserContext } from "@/providers/userProvider";
import RecipeButton from "./RecipeButton";
interface IPrefer {
  recipe_id: number;
  recipe_title: string;
  recipe_thumbnail: string;
}
const UserRecommend = () => {
  const { userData, isUserDataEmpty } = useContext(UserContext);
  const [data, setData] = useState<IPrefer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPrefered(userData[0].id, userData[0].accessToken);
      setData(result);
    };
    if (!isUserDataEmpty()) {
      fetchData();
    }
  }, []);

  if (data.length == 0)
    return (
      <div className="flex flex-col gap-3">
        <p>오늘의 요리를 보시려면 로그인해주세요!</p>
        <Button className="bg-sub">로그인</Button>
      </div>
    );

  return (
    <>
      <h1 className={subtitle()}>오늘의 추천 레시피</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {data.map((food, i) => (
          <Card key={i} className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center justify-center">
              <h4 className="font-bold text-large">{food.recipe_title}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex items-center justify-center">
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

export default UserRecommend;
