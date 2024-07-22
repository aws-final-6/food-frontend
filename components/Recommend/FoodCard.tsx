import React, { useContext } from "react";
import FavoriteButton from "../Bookmark/FavoriteButton";
import Link from "next/link";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import { UserContext } from "@/providers/userProvider";
import { getCateLabel, getSituLabel } from "../tagData";
import { Chip } from "@nextui-org/chip";

interface IFood {
  recipe_id: number;
  recipe_title: string;
  recipe_thumbnail: string;
  cate_no: number;
  situ_no: number;
}
interface ICard {
  cName: string;
  index: number;
  food: IFood;
}
const FoodCard = ({ cName, index, food }: ICard) => {
  const { userData } = useContext(UserContext);
  return (
    <Link
      href={`/recipe/${food.recipe_id}`}
      key={`${cName}_card_${food.recipe_id}`}
    >
      <Card
        key={`${cName}_${food.recipe_id}_${index}`}
        className="hover:border-3 hover:border-main border-3 cursor-pointer relative "
        shadow="sm"
        isPressable={true}
        radius="none"
      >
        <CardBody className="overflow-visible p-0">
          <div className="relative w-full h-[80px] sm:h-[180px]">
            <Image
              alt={food.recipe_title}
              className="object-cover"
              src={food.recipe_thumbnail}
              layout="responsive"
              width={200}
              height={200}
            />
          </div>
        </CardBody>
        <CardFooter className="flex flex-col justify-center items-center gap-3 px-2 min-h-[100px]">
          <div className="hidden absolute z-30 sm:flex sm:flex-row gap-2 top-1/2 left-0 px-2">
            <Chip className="bg-main">{getCateLabel(food.cate_no)}</Chip>
            <Chip className="bg-sub">{getSituLabel(food.situ_no)}</Chip>
          </div>
          <h4 className="font-bold sm:text-large text-center">
            {food.recipe_title}
          </h4>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default FoodCard;
