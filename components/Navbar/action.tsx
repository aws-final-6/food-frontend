"use server";
import { infoLog, errLog, successLog } from "@/utils/Logger";

const API_URL = process.env.API_URL;

/**
 * **SEARCH_01**
 *
 * API Path: /search/getTitleSearchList
 *
 * 제목으로 레시피 검색하기
 */

export async function SearchRecipeAPI(keyword: string, type: string) {
  const recipeName = {
    keyword: keyword,
    type: type,
  };
  infoLog("SEARCH_01", recipeName);

  try {
    const response = await fetch(`${API_URL}/search/getTitleSearchList`, {
      method: "POST",
      body: JSON.stringify(recipeName),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("SEARCH_01", response.status, responseData);
    return responseData.search_list;
  } catch (error) {
    errLog("SEARCH_01", error);
    return [];
  }
}

/**
 * **SEARCH_02**
 *
 * API Path: /search/getIngredientSearchList
 *
 * 재료로 레시피 검색하기
 */

export async function SearchIngredientAPI(keyword: string, type: string) {
  const recipeName = {
    keyword: keyword,
    type: type,
  };
  infoLog("SEARCH_02", recipeName);

  try {
    const response = await fetch(`${API_URL}/search/getIngredientSearchList`, {
      method: "POST",
      body: JSON.stringify(recipeName),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("SEARCH_02", response.status, responseData);
    return responseData.search_list;
  } catch (error) {
    errLog("SEARCH_02", error);
    return [];
  }
}
