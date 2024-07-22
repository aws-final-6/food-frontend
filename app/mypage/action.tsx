"use server";
import { errLog, infoLog, successLog } from "@/utils/Logger";

const API_URL = process.env.API_URL;

/**
 * **MYPAGE_01**
 *
 * API Path: /mypage/getProfile
 *
 * 마이페이지 회원정보 가져오기
 */

export async function getMyPage(userId: string, accessToken: string) {
  const userInfo = {
    user_id: userId,
    access_token: accessToken,
  };

  infoLog("MYPAGE_01", userInfo);

  try {
    const response = await fetch(`${API_URL}/mypage/getProfile`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("MYPAGE_01", response.status, responseData);
    return responseData;
  } catch (error) {
    errLog("MYPAGE_01", error);
    return "마이페이지 정보 가져오기에 실패했습니다.";
  }
}

/**
 * **MYPAGE_02**
 *
 * API Path: /mypage/updateProfile
 *
 * 마이페이지 회원정보 업데이트
 */

export async function updateMypage(formData: FormData) {
  const userInfo = {
    user_id: formData.get("id"),
    access_token: formData.get("accessToken"),
    user_nickname: formData.get("nickname"),
    user_provider: formData.get("provider"),
    user_subscription: formData.get("subscription"),
    user_prefer: [
      {
        cate_no: formData.get("prefer_one"),
        situ_no: formData.get("prefer_two"),
      },
    ],
  };
  infoLog("MYPAGE_02", userInfo);

  try {
    const response = await fetch(`${API_URL}/mypage/updateProfile`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("MYPAGE_02", response.status, responseData);
    return responseData.message;
  } catch (error) {
    errLog("MYPAGE_02", error);
    return "마이페이지 업데이트 실패했습니다.";
  }
}
