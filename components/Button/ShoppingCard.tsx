"use client";
import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";

interface IShoppingCard {
  ingredient_name: string;
  ingredient_index: number;
  item_index: number;
  item_id: number;
  item_image_url: string;
  item_name: string;
  item_channel_name: string;
  item_discounted_ratio: number;
  item_disp_sale_price: string;
  item_discounted_price: string;
}
const ShoppingCard = ({
  ingredient_name,
  ingredient_index,
  item_channel_name,
  item_discounted_price,
  item_discounted_ratio,
  item_disp_sale_price,
  item_id,
  item_image_url,
  item_index,
  item_name,
}: IShoppingCard) => {
  return (
    <>
      <Card
        key={`card_${ingredient_name}_${item_channel_name}_${item_id}`}
        className="hover:border-3 hover:border-main border-3 cursor-pointer relative "
        shadow="none"
        isPressable={true}
        radius="none"
      >
        <CardBody className="overflow-hidden p-0">
          <div className="w-full h-[80px] sm:h-[170px]">
            <Image
              alt={ingredient_name}
              src={item_image_url}
              layout="fill"
              objectFit="cover"
              loading="lazy"
            />
          </div>
        </CardBody>
        <CardFooter className="flex flex-col justify-center items-center gap-3 px-2 min-h-[100px]">
          <h4 className="font-bold sm:text-medium text-center">{item_name}</h4>

          {item_discounted_ratio == 0 ? (
            <div>
              <Chip variant="bordered" color="warning">
                {item_channel_name}
              </Chip>
              <p className="mt-3">{item_disp_sale_price}원</p>
            </div>
          ) : (
            <div>
              <span>
                <Chip variant="bordered" color="warning">
                  {item_channel_name}
                </Chip>
                <Chip variant="dot" color="warning" className="ml-4">
                  {item_discounted_ratio}% 할인
                </Chip>
              </span>
              <p className="mt-3">{item_discounted_price}</p>
            </div>
          )}
          <Link
            isExternal
            href={`https://shopping.naver.com/window-products/${item_channel_name}/${item_id}`}
            key={`${ingredient_name}-${ingredient_index}-link-${item_id}`}
          >
            <Button className="font-jua bg-sub">구매하기</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default ShoppingCard;
