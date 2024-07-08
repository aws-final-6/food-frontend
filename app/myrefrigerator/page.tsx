"use client";
import { UserContext } from "@/providers/userProvider";
import React, { useContext, useEffect, useState } from "react";
import { getRefrigerator } from "./action";
import Column from "@/components/Refrigerator/Column";
import SearchButton from "@/components/Refrigerator/SearchButton";
import AddRefrigButton from "@/components/Refrigerator/AddRefrigButton";
import AddFoodButton from "@/components/Refrigerator/AddFoodButton";

export interface IIngredients {
  refrigerator_ing_name: string;
  expired_date: string;
  enter_date: string;
  color: string;
}
export interface IColumn {
  refrigerator_id: number;
  refrigerator_name: string;
  refrigerator_type: number;
  ingredients: IIngredients[];
}

const Page = () => {
  const { userData } = useContext(UserContext);
  const [refrig, setRefrig] = useState<IColumn[]>([]);

  useEffect(() => {
    async function fetchRefrigerators() {
      if (userData && userData.length > 0) {
        const data = await getRefrigerator(userData[0].id);
        setRefrig(data);
        console.log(data);
      }
    }
    fetchRefrigerators();
  }, []);

  return (
    <div>
      <div className="w-full grid sm:grid-cols-2 gap-3 grid-cols-1">
        {refrig.map((r: IColumn, index: number) => (
          <Column
            key={index}
            refrigerator_id={r.refrigerator_id}
            refrigerator_name={r.refrigerator_name}
            refrigerator_type={r.refrigerator_type}
            ingredients={r.ingredients}
          />
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
