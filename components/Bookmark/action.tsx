"use server";

const API_URL = process.env.API_URL;
import { infoLog, successLog, errLog } from "@/utils/Logger";

/**
 * **BOOKMK_02**
 *
 * API Path: /bookmark/getBookmarkList
 *
 * 레시피 메타데이터 와 함께 즐겨찾기 목록 불러오기
 */

export async function mypageBookmark(userId: string, accessToken: string) {
  const userInfo = {
    user_id: userId,
    access_token: accessToken,
  };
  infoLog("BOOKMK_02", userInfo);

  try {
    const response = await fetch(`${API_URL}/bookmark/getBookmarkList`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("BOOKMK_02", response.status, responseData);
    return responseData.user_bookmark;
  } catch (error) {
    errLog("BOOKMK_02", error);
    return "마이페이지 북마크 가져오는데 실패했습니다.";
  }
}

/**
 * **BOOKMK_03**
 *
 * API Path: /bookmark/removeBookmark
 *
 * 북마크에서 레시피번호 제거
 */

export async function removeBookmark(
  userId: string,
  accessToken: string,
  recipeNo: number
) {
  const favoriteInfo = {
    user_id: userId,
    access_token: accessToken,
    recipe_id: recipeNo,
  };
  infoLog("BOOKMK_03", favoriteInfo);

  try {
    const response = await fetch(`${API_URL}/bookmark/removeBookmark`, {
      method: "POST",
      body: JSON.stringify(favoriteInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.text();
    successLog("BOOKMK_03", response.status, responseData);
    return responseData;
  } catch (error) {
    errLog("BOOKMK_03", error);
    return "북마크 삭제에 실패했습니다.";
  }
}

/**
 * **BOOKMK_04**
 *
 * API Path: /bookmark/updateBookmark
 *
 * 북마크에 레시피번호 추가
 */

export async function updateBookmark(
  userId: string,
  accessToken: string,
  recipeNo: number
) {
  const favoriteInfo = {
    user_id: userId,
    access_token: accessToken,
    recipe_id: recipeNo,
  };
  infoLog("BOOKMK_04", favoriteInfo);
  try {
    const response = await fetch(`${API_URL}/bookmark/updateBookmark`, {
      method: "POST",
      body: JSON.stringify(favoriteInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.text();
    successLog("BOOKMK_04", response.status, responseData);
    return responseData;
  } catch (error) {
    errLog("BOOKMK_04", error);
    return "북마크 추가하는데 실패했습니다.";
  }
}
