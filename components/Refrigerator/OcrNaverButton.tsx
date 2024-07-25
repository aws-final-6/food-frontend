"use client";
import React, { useContext, useState } from "react";
import { Button } from "@nextui-org/button";
import { addNote, getOCRNaverText } from "./action";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useRefrigeratorContext } from "@/app/myrefrigerator/provider";
import { Input } from "@nextui-org/input";
import { UserContext } from "@/providers/userProvider";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Image from "next/image";

const OcrNaverButton = (onClose: any) => {
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
      const res = await getOCRNaverText(formData);

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
      refrigerator_ing_id: Math.random(), // Use a unique ID generator in a real app
      refrigerator_id: parseInt(ingredient.colname, 10),
    }));
    if (userData) {
      const newData = await addNote(userData.id, newIngredients);
      setRefrig(newData);
    }
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
          title="네이버 쇼핑 주문내역 OCR 사용법"
          className="border-b-3 border-b-sub"
        >
          <div className="grid-cols-3 grid items-center">
            <Image
              src="/sample/naver_sample1.jpg"
              alt="sample ocr test image for coupang"
              width={300}
              height={300}
            />
            <Image
              src="/sample/naver_sample2.jpg"
              alt="sample ocr test image for coupang"
              width={300}
              height={300}
            />
            <p className="text-2xl">
              모바일/웹 에서 네이버 쇼핑 주문내역 또는 장바구니를 캡쳐해주세요.
              NPay로 지불한 내역들만 인식 가능합니다.
            </p>
          </div>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-col gap-5 p-10">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
        {loading ? (
          <Image
            src="/ocrgif.gif"
            alt="bedrock loading"
            width={200}
            height={200}
          />
        ) : (
          <></>
        )}
        <Button
          onClick={handleClick}
          variant="flat"
          color="primary"
          disabled={loading}
        >
          텍스트 추출하기
        </Button>
      </div>
      {ingredients.length > 0 && (
        <div>
          {ingredients.map((ingredient, index) => (
            <div className="grid grid-cols-4 gap-5 py-2" key={index}>
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

export default OcrNaverButton;
