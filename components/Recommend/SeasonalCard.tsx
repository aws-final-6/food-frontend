import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import Link from "next/link";
import Image from "next/image";

interface ISeason {
  seasonal_name: string;
  seasonal_image: string;
  index: number;
}

const SeasonalCard = ({ seasonal_name, seasonal_image, index }: ISeason) => {
  return (
    <>
      <Link
        href={`/search/ingredient/${seasonal_name}`}
        key={`seasonal_card_${seasonal_name}`}
      >
        <Card
          key={index}
          className="relative hover:border-3 hover:border-main border-3 cursor-pointer"
          shadow="sm"
          isPressable={true}
          radius="none"
        >
          <CardBody className="p-0 h-[200px] w-[280px] overflow-hidden relative">
            <Image
              alt={seasonal_name}
              className="object-cover w-full h-full transition-opacity duration-300 hover:opacity-20"
              src={seasonal_image}
              layout="fill"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-90 transition-opacity duration-300 bg-slate-200">
              <span className="text-slate-600 text-2xl font-bold ">
                레시피 보러 가기
              </span>
            </div>
          </CardBody>
          <CardFooter className="flex flex-col my-1 px-2 justify-center items-center gap-3">
            <h4 className="font-bold text-large">{seasonal_name}</h4>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
};

export default SeasonalCard;
