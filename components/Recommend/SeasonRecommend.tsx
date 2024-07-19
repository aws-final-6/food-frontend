"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import { getSeasonal } from "./action";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ISeason {
  seasonal_name: string;
  seasonal_image: string;
}
const SeasonRecommend = () => {
  const [data, setData] = useState<ISeason[]>([]);
  const router = useRouter();

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
        <Card
          key={i}
          className="hover:border-3 hover:border-main border-3 cursor-pointer"
          shadow="sm"
          onPress={() =>
            router.push(`/search/ingredient/${food.seasonal_name}`)
          }
          isPressable={true}
          radius="none"
        >
          <CardBody className="p-0 h-[200px] overflow-hidden">
            <Image
              alt={food.seasonal_name}
              className="object-cover"
              src={food.seasonal_image}
              width={400}
              height={200}
            />
          </CardBody>
          <CardFooter className="flex flex-col my-1 px-2 justify-center items-center gap-3">
            <h4 className="font-bold text-large">{food.seasonal_name}</h4>
            <Link href={`/search/ingredient/${food.seasonal_name}`}>
              <Button className="z-10 bg-sub" variant="flat">
                요리 보기
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SeasonRecommend;
