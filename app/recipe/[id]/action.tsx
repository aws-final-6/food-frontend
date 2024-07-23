"use server";
const API_URL = process.env.API_URL;
const BEDROCK_URL = process.env.BEDROCK_API_URL;

import { errLog, infoLog, successLog } from "@/utils/Logger";

/**
 * **RECIPE_06**
 *
 * API Path: /getRecipe/:id
 *
 * 레시피 바디 데이터 가져오기
 */

export async function getRecipe(id: number) {
  try {
    const res = await fetch(`${API_URL}/recipe/getRecipe/${id}`);
    infoLog("RECIPE_06", { recipe_id: `${id}` });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const recipeList = await res.json();
    successLog("RECIPE_06", res.status, recipeList);

    return recipeList;
  } catch (error) {
    errLog("RECIPE_06", error);

    return [];
  }
}

/**
 * **BEDROCK_01**
 *
 * API Path: /mlr-prd-nut-api-stg/mlr-prd-nut
 *
 * 영양정보 가져오기
 */

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
