"use server";
import { getRandomItems } from "@/utils/RandomGenerator";
import { errLog, infoLog, successLog } from "@/utils/Logger";

const API_URL = process.env.API_URL;
const FAST_API_URL = process.env.FAST_API_URL;

/**
 * **RECIPE_01**
 *
 * API Path: /recipe/getRecentList
 *
 * DB에 추가된 최신 데이터를 가져온다.
 */
export async function getToday() {
  try {
    const response = await fetch(`${API_URL}/recipe/getRecentList`);

    if (!response.ok) {
      successLog("RECIPE_01", response.status, await response.json());
      return [];
    }

    const recipeList = await response.json();

    successLog("RECIPE_01", response.status, recipeList);

    // 랜덤하게 4개의 데이터 전달
    return getRandomItems(recipeList.recipes, 4);
  } catch (error) {
    errLog("RECIPE_01", error);

    return [];
  }
}

/**
 * **RECIPE_02**
 *
 * API Path: /recipe/getSeasonalList
 *
 * 계절별로 제철 재료를 가져온다
 */

export async function getSeasonal() {
  try {
    const response = await fetch(`${API_URL}/recipe/getSeasonalList`);

    if (!response.ok) {
      successLog("RECIPE_02", response.status, await response.json());
      return [];
    }

    const seasonalList = await response.json();
    successLog("RECIPE_02", response.status, seasonalList);

    // 랜덤하게 4개의 데이터 전달
    return getRandomItems(seasonalList.seasonal_list, 4);
  } catch (error) {
    errLog("RECIPE_02", error);
    return [];
  }
}

export interface IPrefer {
  recipe_id: number;
  recipe_title: string;
  recipe_thumbnail: string;
}

export interface GetPreferedResponse {
  data: IPrefer[];
  statusCode: number;
}

/**
 * **RECIPE_03**
 *
 * API Path: /recipe/getPreferList
 *
 * 사용자 선호도에 맞춰 레시피를 추천해준다.
 */

export async function getPrefered(
  userid: string,
  accessToken: string
): Promise<GetPreferedResponse> {
  const userInfo = {
    user_id: userid,
    access_token: accessToken,
  };

  infoLog("RECIPE_03", userInfo);

  try {
    const response = await fetch(`${API_URL}/recipe/getPreferList`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("RECIPE_03", response.status, responseData);

    return {
      data: getRandomItems(responseData.prefer_list, 4),
      statusCode: response.status,
    };
  } catch (error) {
    errLog("RECIPE_03", error);
    return {
      data: [],
      statusCode: 500,
    };
  }
}

/**
 * **YOUTUBE_01*
 *
 * API Path: /api/video/long
 *
 * 유튜브 레시피 영상을 가져온다
 */

export async function getVideoList() {
  try {
    const response = await fetch(`${FAST_API_URL}/api/video/long`);

    if (!response.ok) {
      successLog("YOUTUBE_01", response.status, await response.json());
      return [];
    }

    const videoList = await response.json();

    successLog("YOUTUBE_01", response.status, videoList);

    return getRandomItems(videoList, 3);
  } catch (error) {
    errLog("YOUTUBE_01", error);
    return [];
  }
}

/**
 * **YOUTUBE_02*
 *
 * API Path: /api/video/short
 *
 * 유튜브 레시피 쇼츠들을 가져온다
 */

export async function getShortsList() {
  try {
    const response = await fetch(`${FAST_API_URL}/api/video/short`);

    if (!response.ok) {
      successLog("YOUTUBE_02", response.status, await response.json());
      return [];
    }

    const videoList = await response.json();
    successLog("YOUTUBE_02", response.status, videoList);

    return getRandomItems(videoList, 3);
  } catch (error) {
    errLog("YOUTUBE_02", error);
    return [];
  }
}
