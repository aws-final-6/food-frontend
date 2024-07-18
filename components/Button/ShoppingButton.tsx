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
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IIngredient {
  ingredient: string;
  amount: string;
}

const ShoppingButton = ({ ingredients }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [shoppingList, setShoppingList] = useState([]);
  const startName = `${ingredients[0].ingredient}-0`;
  const [ingName, setIngName] = useState(startName);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const name = ingName.slice(0, -2);

      const data = await getShoppingList(name);
      setShoppingList(data);
    };
    fetchData();
  }, [ingName]);

  return (
    <>
      <Button
        onPress={onOpen}
        size="lg"
        variant="flat"
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
                            {shoppingList.map((res: any, resIndex: number) => (
                              <Card
                                key={`${ing.ingredient}-${index}-res-${resIndex}-${res._id}`}
                              >
                                <CardHeader>{res.name}</CardHeader>
                                <CardBody className="flex flex-col justify-center items-center">
                                  <Image
                                    src={res.image_url}
                                    width={200}
                                    height={200}
                                    alt={res.name}
                                  />
                                  <p>{res.channel_name}</p>
                                  {res.discountedRatio == 0 ? (
                                    <p>{res.dispSalePrice}원</p>
                                  ) : (
                                    <div>
                                      <p>{res.discountedRatio}% 할인</p>
                                      <p>{res.discountedPrice}</p>
                                    </div>
                                  )}
                                  <Button
                                    onClick={() => {
                                      router.push(
                                        `https://shopping.naver.com/window-products/${res.channel_name}/${res._id}`
                                      );
                                    }}
                                  >
                                    구매하기
                                  </Button>
                                </CardBody>
                              </Card>
                            ))}
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
