"use client";

import React, { useEffect, useState } from "react";
import { getNutrition } from "@/app/recipe/[id]/action";
import { IIngredient } from "@/app/recipe/[id]/page";
import { Card, CardBody } from "@nextui-org/card";
import { Tooltip } from "@nextui-org/tooltip";

const parseIngredients = (ingredients: IIngredient[]) => {
  return ingredients.map((item: IIngredient) => {
    if (item.amount) {
      return `${item.ingredient} ${item.amount}`;
    }
    return item.ingredient;
  });
};

interface NutritionInfoProps {
  ingredients: IIngredient[];
}

interface NutritionData {
  [key: string]: number;
}

const dailyRecommended: NutritionData = {
  칼로리: 2000,
  탄수화물: 300,
  지방: 65,
  단백질: 50,
  나트륨: 2000,
};

const getLevel = (percentage: number): string => {
  if (percentage < 20) return "LOW";
  if (percentage < 60) return "MID";
  return "HIGH";
};

const getColor = (nutrient: string): string => {
  const colors: { [key: string]: string } = {
    칼로리: "bg-emerald-500",
    탄수화물: "bg-blue-500",
    지방: "bg-yellow-500",
    단백질: "bg-orange-500",
    나트륨: "bg-red-500",
  };
  return colors[nutrient] || "bg-gray-500";
};

const getUnit = (nutrient: string): string => {
  const units: { [key: string]: string } = {
    칼로리: "KCAL",
    탄수화물: "g",
    지방: "g",
    단백질: "g",
    나트륨: "mg",
  };
  return units[nutrient] || "g";
};

const NutritionInfo: React.FC<NutritionInfoProps> = ({ ingredients }) => {
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(
    null
  );

  useEffect(() => {
    const fetchNutrition = async () => {
      const parsedIngredients = parseIngredients(ingredients);
      const nutrition = await getNutrition(parsedIngredients, 1);
      const nutritionString = nutrition.replace(/'/g, '"');
      console.log(JSON.parse(nutritionString));
      setNutritionData(JSON.parse(nutritionString));
    };

    fetchNutrition();
  }, [ingredients]);

  if (!nutritionData) {
    return <div>영양 정보를 불러오는 중...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-4 justify-center">
        {Object.entries(nutritionData).map(([nutrient, value]) => {
          const percentage = (value / dailyRecommended[nutrient]) * 100;
          const level = getLevel(percentage);
          const color = getColor(nutrient);
          const unit = getUnit(nutrient);

          return (
            <Tooltip
              key={nutrient}
              content={`성인 일일 권장량: ${dailyRecommended[nutrient]} ${unit}`}
              placement="top"
            >
              <div
                className={`w-40 h-32 rounded-lg shadow-md ${color} text-white p-4 flex flex-col justify-between cursor-pointer`}
              >
                <div className="text-sm font-semibold uppercase">
                  {nutrient}
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <p className="text-2xl font-bold">{value.toFixed(1)}</p>
                  <p>{unit}</p>
                </div>
                <div className="text-sm">{percentage.toFixed(1)}%</div>
                <div className="text-xs font-semibold">{level}</div>
              </div>
            </Tooltip>
          );
        })}
      </div>
      <Card>
        <CardBody className="px-10 bg-sub font-jua dark:bg-main dark:text-slate-700">
          해당 정보는 AI가 제공해주는 정보입니다.
        </CardBody>
      </Card>
    </div>
  );
};

export default NutritionInfo;
