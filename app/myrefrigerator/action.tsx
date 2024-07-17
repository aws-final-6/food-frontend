"use server";
import { infoLog, errLog, successLog } from "@/utils/Logger";
const API_URL = process.env.API_URL;

/**
 * **REFRIG_01**
 *
 * API Path: /refrig/getRefrig
 *
 * 냉장고 가져오기
 */

export async function getRefrigerator(userId: string, accessToken: string) {
  const userInfo = {
    user_id: userId,
    access_token: accessToken,
  };
  infoLog("REFRIG_01", userInfo);
  try {
    const response = await fetch(`${API_URL}/refrig/getRefrig`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("REFRIG_01", response.status, responseData);

    return responseData;
  } catch (error) {
    errLog("REFRIG_01", error);
    return "냉장고 가져오기 실패 했습니다.";
  }
}
