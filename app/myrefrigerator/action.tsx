"use server";

const API_URL = process.env.API_URL;

export async function getRefrigerator(userId: string) {
  const favoriteInfo = {
    user_id: userId,
  };
  try {
    const response = await fetch(`${API_URL}/refrig/getRefrig`, {
      method: "POST",
      body: JSON.stringify(favoriteInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error:", error);
    return "냉장고 가져오기 실패 했습니다.";
  }
}
