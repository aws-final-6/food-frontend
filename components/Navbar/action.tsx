"use server";

const API_URL = process.env.API_URL;

export async function SearchRecipeAPI(keyword: string, type: string) {
  const recipeName = {
    keyword: keyword,
    type: type,
  };

  try {
    const response = await fetch(`${API_URL}/search/getTitleSearchList`, {
      method: "POST",
      body: JSON.stringify(recipeName),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    return responseData.search_list;
  } catch (error) {
    console.error("SEARCH_01 Error:", error);
    return "레시피 검색에 실패했습니다.";
  }
}

export async function SearchIngredientAPI(keyword: string, type: string) {
  const recipeName = {
    keyword: keyword,
    type: type,
  };

  try {
    const response = await fetch(`${API_URL}/search/getIngredientSearchList`, {
      method: "POST",
      body: JSON.stringify(recipeName),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    return responseData.search_list;
  } catch (error) {
    console.error("RECIPE_02 Error:", error);
    return "재료로 레시피 검색에 실패했습니다.";
  }
}
