"use server";
const API_URL = process.env.API_URL;

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

  try {
    const response = await fetch(`${API_URL}/search/getFilteredSearchList`, {
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
