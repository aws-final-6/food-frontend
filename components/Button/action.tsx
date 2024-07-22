"use server";
import { errLog, infoLog, successLog } from "@/utils/Logger";

const API_URL = process.env.API_URL;

/**
 * **RECIPE_07**
 *
 * API Path: /recipe/getNaverShop
 *
 * 네이버 쇼핑 OPEN API를 통해서 데이터 가져오기
 */

export async function getNaverShoppingList(ingredientName: string) {
  const ingredientInfo = {
    ingredient_name: ingredientName,
  };

  infoLog("RECIPE_07", ingredientInfo);

  try {
    const response = await fetch(`${API_URL}/recipe/getNaverShop`, {
      method: "POST",
      body: JSON.stringify(ingredientInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("RECIPE_07", response.status, responseData);

    return responseData;
  } catch (error) {
    errLog("RECIPE_07", error);
    return [];
  }
}

/**
 * **RECIPE_07**
 *
 * API Path: /recipe/getShop
 *
 * 네이버 쇼핑  API를 통해서 데이터 가져오기
 */

export async function getShoppingList(ingredientName: string) {
  const ingredientInfo = {
    ingredient_name: ingredientName,
  };
  infoLog("RECIPE_08", ingredientInfo);

  try {
    const response = await fetch(`${API_URL}/recipe/getShop`, {
      method: "POST",
      body: JSON.stringify(ingredientInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("RECIPE_08", response.status, responseData);
    return responseData;
  } catch (error) {
    errLog("RECIPE_08", error);
    return [];
  }
}
