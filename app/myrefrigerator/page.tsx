"use client";
import { UserContext } from "@/providers/userProvider";
import React, { useContext, useEffect, useState } from "react";
import { getRefrigerator } from "./action";
import Column from "@/components/Refrigerator/Column";
import SearchButton from "@/components/Refrigerator/SearchButton";
import AddRefrigButton from "@/components/Refrigerator/AddRefrigButton";
import AddFoodButton from "@/components/Refrigerator/AddFoodButton";
import { useRefrigeratorContext } from "./provider";

export interface IIngredients {
  refrigerator_ing_name: string;
  expired_date: string;
  enter_date: string;
  color: string;
  refrigerator_ing_id: number;
  refrigerator_id: number;
}

export interface IRefrig {
  refrigerator_id: number;
  refrigerator_name: string;
  refrigerator_type: number;
}

export interface IRefrigerator {
  refrig: IRefrig;
  ingredients: IIngredients[];
}

export interface IColumn {
  user_id: string;
  refrigerators: IRefrigerator[];
}

const Page: React.FC = () => {
  const { userData } = useContext(UserContext);
  const { refrig, setRefrig } = useRefrigeratorContext();

  useEffect(() => {
    async function fetchRefrigerators() {
      if (userData && userData.length > 0) {
        const data = await getRefrigerator(userData[0].id);
        setRefrig(data);
        console.log(data);
      }
    }
    fetchRefrigerators();
  }, [userData]);

  if (!refrig) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="w-full grid sm:grid-cols-2 gap-3 grid-cols-1">
        {refrig.refrigerators.map((r: IRefrigerator, index: number) => (
          <Column key={index} refrigerator={r} />
        ))}
      </div>
      <div className="fixed bottom-20 right-20 flex flex-col gap-3">
        <SearchButton />
        <AddFoodButton />
        <AddRefrigButton />
      </div>
    </div>
  );
};

export default Page;
