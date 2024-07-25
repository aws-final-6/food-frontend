"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Tabs, Tab } from "@nextui-org/tabs";
import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { getShoppingList } from "./action";
import ShoppingCard from "./ShoppingCard";
import Image from "next/image";

interface IIngredient {
  ingredient: string;
  amount: string;
}

interface IShopping {
  ingredients: IIngredient[];
  recipe_id: number;
}

const ShoppingButton = ({ ingredients, recipe_id }: IShopping) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [shoppingList, setShoppingList] = useState([]);
  const startName = `${ingredients[0].ingredient}-0`;
  const [ingName, setIngName] = useState(startName);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log(isOpen);
      const name = ingName.slice(0, -2);
      setLoading(true);
      const data = await getShoppingList(name, recipe_id);
      console.log(data, typeof data);
      setShoppingList(data);
      setLoading(false);
    };
    if (isOpen) fetchData();
  }, [isOpen, ingName]);

  return (
    <>
      <Button
        onPress={onOpen}
        size="lg"
        color="success"
        startContent={<FaShoppingCart />}
      >
        쇼핑
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="transparent"
        shouldBlockScroll={false}
        className="py-10"
        size="5xl"
        scrollBehavior={"inside"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-jua">
                쇼핑하기
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col">
                  <Tabs
                    aria-label="Options"
                    placement="start"
                    onSelectionChange={(key) => {
                      setIngName(String(key));
                    }}
                  >
                    {ingredients.map((ing: IIngredient, index: number) => (
                      <Tab
                        key={`${ing.ingredient}-${index}`}
                        title={ing.ingredient}
                      >
                        <Card className=" min-w-60 p-5">
                          <CardHeader className="font-jua">
                            {ing.ingredient}
                          </CardHeader>
                          <CardBody className="grid grid-cols-2 gap-4">
                            {loading ? (
                              <Image
                                src="/shoppingcart.gif"
                                alt="장보기 리스트 가져오는 중"
                                width={200}
                                height={200}
                              />
                            ) : (
                              shoppingList.map((res: any, resIndex: number) => (
                                <ShoppingCard
                                  ingredient_name={ing.ingredient}
                                  ingredient_index={index}
                                  item_index={resIndex}
                                  item_id={res._id}
                                  item_image_url={res.image_url}
                                  item_name={res.name}
                                  item_channel_name={res.channel_name}
                                  item_discounted_ratio={res.discountedRatio}
                                  item_disp_sale_price={res.dispSalePrice}
                                  item_discounted_price={res.discountedPrice}
                                />
                              ))
                            )}
                          </CardBody>
                        </Card>
                      </Tab>
                    ))}
                  </Tabs>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShoppingButton;
