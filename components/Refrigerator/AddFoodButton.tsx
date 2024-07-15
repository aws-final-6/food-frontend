"use client";
import { Button } from "@nextui-org/button";

import React, { FormEvent, useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import AddFoodManual from "./AddFoodManual";
import OcrNaverButton from "./OcrNaverButton";
import OcrCoupangButton from "./OcrCoupangButton";

export interface ICard {
  refrigerator_ing_id: number;
  refrigerator_id: number;
  refrigerator_ing_name: string;
  expired_date: string;
  enter_date: string;
  color: string;
}

export interface AddCardProps {
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
  colName: IColName[];
}

interface IColName {
  refrigerator_id: number;
  refrigerator_type: number;
  refrigerator_name: string;
}

const AddFoodButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [color, setColor] = useState("bg-norang");
  const [colname, setColname] = useState("");

  return (
    <div>
      <Button
        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-300"
        onPress={onOpen}
      >
        + 음식 추가
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        scrollBehavior={"inside"}
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                음식 추가
              </ModalHeader>

              <ModalBody>
                <Tabs aria-label="Options">
                  <Tab key="hand" title="직접 입력">
                    <Card>
                      <CardBody>
                        <AddFoodManual />
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab key="ocr-naver" title="네이버 주문내역">
                    <Card>
                      <CardBody>
                        <OcrNaverButton onClose={onClose} />
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab key="ocr-coupang" title="쿠팡 주문내역">
                    <Card>
                      <CardBody>
                        <OcrCoupangButton />
                      </CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddFoodButton;
