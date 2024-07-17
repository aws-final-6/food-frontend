"use server";

const API_URL = process.env.API_URL;

export async function getShoppingList(ingredientName: string) {
  const ingredientInfo = {
    ingredient_name: ingredientName,
  };
  try {
    const response = await fetch(`${API_URL}/recipe/getShop`, {
      method: "POST",
      body: JSON.stringify(ingredientInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error:", error);
    return "북마크 가져오는데 실패했습니다.";
  }
}
