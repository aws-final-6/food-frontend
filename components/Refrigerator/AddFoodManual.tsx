"use client";
import React, { useState, useEffect, useContext } from "react";
import { Input } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { colorOptions } from "./ColorOptions";
import { Button } from "@nextui-org/button";
import { FaSquare } from "react-icons/fa";
import { useRefrigeratorContext } from "@/app/myrefrigerator/provider";
import { UserContext } from "@/providers/userProvider";
import { addNote } from "./action";
import { clsx } from "clsx";

const AddFoodManual = () => {
  const { getRefrigInfo, refrig, setRefrig } = useRefrigeratorContext();
  const refrigColname = getRefrigInfo();

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [color, setColor] = useState("bg-norang");
  const [colname, setColname] = useState(
    refrigColname[0]?.refrigerator_id.toString() || ""
  );
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setStartDate(today);
    setEndDate(today);
  }, []);

  async function addSingleNote() {
    const newNote = [
      {
        refrigerator_ing_name: name,
        expired_date: endDate,
        enter_date: startDate,
        color: color,
        refrigerator_ing_id: 1,
        refrigerator_id: parseInt(colname, 10),
      },
    ];
    const newData = await addNote(userData[0].id, newNote);
    setRefrig(newData);
  }

  return (
    <div className="flex flex-col gap-5">
      <Input
        type="text"
        name="name"
        value={name}
        label="음식 이름"
        isRequired
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Autocomplete
        label="칸 선택"
        className="max-w-xs"
        name="refrig_id"
        selectedKey={colname}
        onSelectionChange={(key) => {
          if (key !== null) {
            setColname(key.toString());
          }
        }}
      >
        {refrigColname.map((cname) => (
          <AutocompleteItem
            key={cname.refrigerator_id.toString()}
            value={cname.refrigerator_id.toString()}
          >
            {cname.refrigerator_name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Input
        type="date"
        name="start_date"
        value={startDate}
        label="냉장고에 넣은 날짜"
        isRequired
        onChange={(e) => {
          setStartDate(e.target.value);
        }}
      />
      <Input
        type="date"
        name="expired_date"
        value={endDate}
        label="유통기한"
        onChange={(e) => {
          setEndDate(e.target.value);
        }}
      />
      <div className="font-jua">노트 색상 선택</div>
      <div className="grid grid-cols-3 w-1/2 gap-2">
        {colorOptions.map((co, i) => (
          <Button
            key={i}
            isIconOnly
            className={clsx(`${co.bgcolor} ${co.txtcolor}`, {
              "border-black border-4": color === co.bgcolor,
            })}
            onClick={() => setColor(co.bgcolor)}
            name="color"
            value={co.bgcolor}
          >
            <FaSquare />
          </Button>
        ))}
      </div>
      <Button variant="flat" color="warning" onClick={addSingleNote}>
        노트 추가
      </Button>
    </div>
  );
};

export default AddFoodManual;
