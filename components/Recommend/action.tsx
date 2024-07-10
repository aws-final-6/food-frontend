"use server";
import { getRandomItems } from "@/utils/RandomGenerator";
const API_URL = process.env.API_URL;
const FAST_API_URL = process.env.FAST_API_URL;

export async function getSeasonal() {
  const res = await fetch(`${API_URL}/recipe/getSeasonalList`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const seasonalList = await res.json();

  return getRandomItems(seasonalList.seasonal_list, 4);
}

export async function getPrefered(userid: string, accessToken: string) {
  const userInfo = {
    user_id: userid,
    access_token: accessToken,
  };

  try {
    const response = await fetch(`${API_URL}/recipe/getPreferList`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    return getRandomItems(responseData.prefer_list, 4);
  } catch (error) {
    console.error("Error:", error);
    return "회원 전용 추천 메뉴 가져오는데 실패했습니다.";
  }
}

export async function getToday() {
  const res = await fetch(`${API_URL}/recipe/getRecentList`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const recipeList = await res.json();

  return getRandomItems(recipeList.recipes, 4);
}

export async function getVideoList() {
  const res = await fetch(`${FAST_API_URL}/api/video/long`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const videoList = await res.json();

  return getRandomItems(videoList, 4);
}

export async function getShortsList() {
  const res = await fetch(`${FAST_API_URL}/api/video/short`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const videoList = await res.json();

  return getRandomItems(videoList, 4);
}
