"use client";
import { Button } from "@nextui-org/button";
import { FaSquare } from "react-icons/fa";
import React, { FormEvent, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { Input } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

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

const colorOptions = [
  {
    bgcolor: "bg-norang dark:bg-norang-dark",
    txtcolor: "text-norang dark:text-norang-dark",
  },
  {
    bgcolor: "bg-mint dark:bg-mintdark",
    txtcolor: "text-mint dark:text-mintdark",
  },
  {
    bgcolor: "bg-yeondoo bg-yeondoodark",
    txtcolor: "text-yeondoo text-yeondoodark",
  },
  {
    bgcolor: "bg-haneul bg-haneuldark",
    txtcolor: "text-haneul text-haneuldark",
  },
  { bgcolor: "bg-bora bg-boradark", txtcolor: "text-bora text-boradark" },
  {
    bgcolor: "bg-boonhong bg-boonhongdark",
    txtcolor: "text-boonhong text-boonhongdark",
  },
];

const AddFoodButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [color, setColor] = useState("bg-norang");
  const [colname, setColname] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCard: ICard = {
      refrigerator_ing_id: Math.random(),
      refrigerator_id: Number(colname),
      refrigerator_ing_name: name,
      expired_date: endDate,
      enter_date: startDate,
      color: color,
    };

    // setCards((pv) => [...pv, newCard]);
    console.log("new color", color);
  };

  return (
    <div>
      <Button
        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-300"
        onPress={onOpen}
      >
        + 음식 추가
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                음식 추가
              </ModalHeader>
              <form onSubmit={handleSubmit}>
                <ModalBody>
                  <Input
                    type="text"
                    label="음식 이름"
                    isRequired
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  {/* <Autocomplete
                    label="칸 선택"
                    className="max-w-xs"
                    onChange={(e) => setColname(e.target.value)}
                  >
                    {colName.map((cname) => (
                      <AutocompleteItem
                        key={cname.refrigerator_id}
                        value={cname.refrigerator_id}
                      >
                        {cname.refrigerator_name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete> */}
                  <Input
                    type="date"
                    label="냉장고에 넣은 날짜"
                    isRequired
                    onChange={(e) => {
                      setStartDate(e.target.value);
                    }}
                  />
                  <Input
                    type="date"
                    label="유통기한"
                    onChange={(e) => {
                      setEndDate(e.target.value);
                    }}
                  />
                  {/* <OcrImage /> */}
                  <div className="font-jua">노트 색상 선택</div>
                  <div className="grid grid-cols-3 w-1/2 gap-2">
                    {colorOptions.map((co, i) => (
                      <Button
                        key={i}
                        isIconOnly
                        className={`${co.bgcolor} ${co.txtcolor}`}
                        onClick={() => setColor(co.bgcolor)}
                      >
                        <FaSquare />
                      </Button>
                    ))}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    닫기
                  </Button>
                  <Button color="primary" onPress={onClose} type="submit">
                    추가
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddFoodButton;
