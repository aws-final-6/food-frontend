"use client";
import React, { useContext, useState } from "react";
import { Button } from "@nextui-org/button";
import { addNote, getOCRCoupangText } from "./action";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useRefrigeratorContext } from "@/app/myrefrigerator/provider";
import { Input } from "@nextui-org/input";
import { UserContext } from "@/providers/userProvider";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Image from "next/image";
const OcrCoupangButton = () => {
  const { getRefrigInfo, setRefrig } = useRefrigeratorContext();
  const refrigColname = getRefrigInfo();

  const [file, setFile] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const { userData } = useContext(UserContext);

  const [ingredients, setIngredients] = useState<
    {
      name: string;
      startDate: string;
      endDate: string;
      color: string;
      colname: string;
    }[]
  >([]);

  const today = new Date().toISOString().split("T")[0];

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setFile(e.target.files?.[0]);
  }

  async function handleClick() {
    setLoading(true);
    const formData = new FormData();
    if (file) formData.append("file", file);
    try {
      const res = await getOCRCoupangText(formData);

      // Process the OCR data and update the ingredients state
      if (res.length > 0 && refrigColname.length > 0) {
        const newIngredients = res.map((name: string) => ({
          name,
          startDate: today,
          endDate: today,
          color: "bg-norang",
          colname: refrigColname[0]?.refrigerator_id.toString() || "",
        }));
        setIngredients(newIngredients);
      }
    } catch (error) {
      console.error("Error during OCR processing:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    const newIngredients = ingredients.map((ingredient) => ({
      refrigerator_ing_name: ingredient.name,
      expired_date: ingredient.endDate,
      enter_date: ingredient.startDate,
      color: ingredient.color,
      refrigerator_id: parseInt(ingredient.colname, 10),
    }));
    console.log("new ingredients", newIngredients);
    const newData = await addNote(userData[0].id, newIngredients);
    setRefrig(newData);
    //addMultipleIngredients(newIngredients);
    console.log(newIngredients);
  }

  function handleIngredientChange(index: number, field: string, value: string) {
    const updatedIngredients = [...ingredients];
    (updatedIngredients[index] as any)[field] = value;
    setIngredients(updatedIngredients);
  }

  return (
    <div className="flex flex-col gap-3 pb-5 justify-center items-center">
      <Accordion className="w-full">
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="쿠팡 주문내역 OCR 사용법"
          className="border-b-3 border-b-sub"
        >
          <div className="grid-cols-2 grid items-center">
            <Image
              src="/sample/coupang_sample.png"
              alt="sample ocr test image for coupang"
              width={300}
              height={300}
            />
            <p className="text-2xl">
              모바일폰으로 쿠팡앱으로 주문내역 들어가서 화면을 옆에 사진처럼
              캡쳐해서 올려주세요!{" "}
            </p>
          </div>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-col gap-5 p-10 ">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
        <Button
          onClick={handleClick}
          variant="flat"
          color="primary"
          disabled={loading}
        >
          {loading ? "로딩 중..." : "텍스트 추출하기"}
        </Button>
      </div>
      {ingredients.length > 0 && (
        <div>
          {ingredients.map((ingredient, index) => (
            <div
              className="grid grid-cols-4 sm:grid-cols-2 gap-5 py-2"
              key={index}
            >
              <Input
                type="text"
                name="name"
                value={ingredient.name}
                label="음식 이름"
                isRequired
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
              />

              <Autocomplete
                label="칸 선택"
                className="max-w-xs"
                name="refrig_id"
                selectedKey={ingredient.colname}
                onSelectionChange={(key) => {
                  if (key !== null) {
                    handleIngredientChange(index, "colname", key.toString());
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
                value={ingredient.startDate}
                label="냉장고에 넣은 날짜"
                isRequired
                onChange={(e) =>
                  handleIngredientChange(index, "startDate", e.target.value)
                }
              />
              <Input
                type="date"
                name="expired_date"
                value={ingredient.endDate}
                label="유통기한"
                onChange={(e) =>
                  handleIngredientChange(index, "endDate", e.target.value)
                }
              />
            </div>
          ))}
        </div>
      )}
      <Button
        onClick={handleSave}
        className="w-1/2"
        variant="flat"
        color="secondary"
      >
        저장하기
      </Button>
    </div>
  );
};

export default OcrCoupangButton;
