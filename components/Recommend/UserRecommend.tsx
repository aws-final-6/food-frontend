"use client";
import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { subtitle } from "../primitives";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { getPrefered } from "./action";
import { UserContext } from "@/providers/userProvider";
import RecipeButton from "./RecipeButton";
import Link from "next/link";

interface IPrefer {
  recipe_id: number;
  recipe_title: string;
  recipe_thumbnail: string;
}

const UserRecommend = () => {
  const { userData } = useContext(UserContext);
  const [data, setData] = useState<IPrefer[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData && userData.nickname) {
          setIsLoading(true);
          const result = await getPrefered(userData.id, userData.accessToken);
          if (Array.isArray(result)) {
            setData(result);
          } else {
            setError("이건가");
          }
        }
      } catch (err) {
        setError("테스트");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userData]);

  if (!userData) {
    return (
      <div className="flex flex-col gap-3 ">
        <p className="font-jua">오늘의 요리를 보시려면 로그인해주세요!</p>
        <Link href="/login">
          <Button className="bg-sub w-full" size="lg">
            로그인
          </Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data || data.length === 0) {
    return <p>추천 레시피가 없습니다.</p>;
  }

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
