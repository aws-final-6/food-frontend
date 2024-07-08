"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import { getSeasonal } from "./action";
import { Button } from "@nextui-org/button";
import Link from "next/link";

interface ISeason {
  seasonal_name: string;
  seasonal_image: string;
}
const SeasonRecommend = () => {
  const [data, setData] = useState<ISeason[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getSeasonal();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {data.map((food: ISeason, i: number) => (
        <Card key={i} className="py-4" isPressable>
          <CardHeader className="pb-0 pt-2 px-4 flex-col">
            <h4 className="font-bold text-large">{food.seasonal_name}</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2 flex items-center">
            <Image
              alt={food.seasonal_name}
              className="object-cover rounded-xl"
              src={food.seasonal_image}
              width={200}
              height={200}
            />
          </CardBody>
          <CardFooter className="justify-center">
            <Link href={`/search/ingredient/${food.seasonal_name}`}>
              <Button className="bg-main">요리 보기</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SeasonRecommend;
