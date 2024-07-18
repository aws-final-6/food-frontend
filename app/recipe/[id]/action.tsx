"use server";
const API_URL = process.env.API_URL;
const BEDROCK_URL = process.env.BEDROCK_API_URL;

import { errLog, infoLog, successLog } from "@/utils/Logger";

export async function getRecipe(id: number) {
  const res = await fetch(`${API_URL}/recipe/getRecipe/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const recipeList = await res.json();

  return recipeList;
}

export async function getNutrition(inglist: string[], serving: number) {
  const nutritionInfo = {
    ingredients: inglist,
    servings: serving,
  };
  infoLog("BEDROCK_01", nutritionInfo);
  try {
    const response = await fetch(
      `${BEDROCK_URL}/mlr-prd-nut-api-stg/mlr-prd-nut`,
      {
        method: "POST",
        body: JSON.stringify(nutritionInfo),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();
    const parsedData = JSON.parse(responseData.body).content;
    successLog("BEDROCK_01", response.status, parsedData[0].text);
    return parsedData[0].text;
  } catch (error) {
    errLog("BEDROCK_01", error);
    return "영양정보 데이터를 가져오는데 실패했습니다.";
  }
}
