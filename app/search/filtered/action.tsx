"use server";
import { infoLog, errLog, successLog } from "@/utils/Logger";

const API_URL = process.env.API_URL;

/**
 * **SEARCH_03**
 *
 * API Path: /search/getFilteredSearchList
 *
 * 제외필터 적용해서 레시피 검색하기
 */

export async function FilterSearchAPI(
  keyword: string,
  type: string,
  filterList: string[]
) {
  const recipeName = {
    keyword: keyword,
    keyword_filter: filterList,
    type: type,
  };
  infoLog("SEARCH_03", recipeName);
  try {
    const response = await fetch(`${API_URL}/search/getFilteredSearchList`, {
      method: "POST",
      body: JSON.stringify(recipeName),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("SEARCH_03", response.status, responseData);
    return responseData.search_list;
  } catch (error) {
    errLog("SEARCH_03", error);
    return [];
  }
}

/**
 * **FILTER_01**
 *
 * API Path: /searchfilter/getFilterList
 *
 * 제외 필터 가져오기
 */

export async function getFilterList(userId: string, accessToken: string) {
  const userInfo = {
    user_id: userId,
    access_token: accessToken,
  };
  infoLog("FILTER_01", userInfo);
  try {
    const response = await fetch(`${API_URL}/searchfilter/getFilterList`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("FILTER_01", response.status, responseData);
    return responseData;
  } catch (error) {
    errLog("FILTER_01", error);
    return {};
  }
}

/**
 * **FILTER_02**
 *
 * API Path: /searchfilter/updateFilterList
 *
 * 제외 필터 저장
 */

export async function updateFilterList(
  userId: string,
  accessToken: string,
  filterList: Number[]
) {
  const userInfo = {
    user_id: userId,
    access_token: accessToken,
    filter_list: filterList,
  };
  infoLog("FILTER_02", userInfo);
  try {
    const response = await fetch(`${API_URL}/searchfilter/updateFilterList`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("FILTER_02", response.status, responseData);
    return responseData;
  } catch (error) {
    errLog("FILTER_02", error);
    return {};
  }
}

/**
 * **FILTER_03**
 *
 * API Path: /searchfilter/searchIngredient
 *
 * 재료 테이블 안에서 재료 검색하기
 */

export async function getFilterIngredientList(ingredient: string) {
  const ingInfo = {
    ingredient_name: ingredient,
  };
  infoLog("FILTER_03", ingInfo);
  try {
    const response = await fetch(`${API_URL}/searchfilter/searchIngredient`, {
      method: "POST",
      body: JSON.stringify(ingInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("FILTER_03", response.status, responseData);
    return responseData;
  } catch (error) {
    errLog("FILTER_03", error);
    return {};
  }
}
