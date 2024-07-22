"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import { getSeasonal } from "./action";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SeasonalCard from "./SeasonalCard";

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
        <SeasonalCard
          seasonal_image={food.seasonal_image}
          seasonal_name={food.seasonal_name}
          index={i}
        />
      ))}
    </div>
  );
};

export default SeasonRecommend;
