"use server";

import { infoLog, successLog, errLog } from "@/utils/Logger";

const API_URL = process.env.API_URL;

/**
 * **AUTH_01**
 *
 * API Path: /auth/checkToken
 *
 * 토큰 만료 확인
 *
 * status 419: TOKEN EXPIRED
 * status 200: VALID TOKEN
 */

export async function checkSession(
  provider: string,
  user_id: string,
  access_token: string
) {
  const loginInfo = {
    user_provider: provider,
    user_id: user_id,
    access_token: access_token,
  };

  infoLog("AUTH_01", loginInfo);

  try {
    const response = await fetch(`${API_URL}/auth/checkToken`, {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("AUTH_01", response.status, responseData);
    return response.status;
  } catch (error) {
    errLog("AUTH_01", error);
    return "토큰 확인에 실패했습니다.";
  }
}

/**
 * **AUTH_02**
 *
 * API Path: /auth/requestToken
 *
 * 로그인 API
 *
 * user_provider: provider, user_agent: userAgent
 */

export async function LoginAPI(provider: string, userAgent: any) {
  const loginInfo = {
    user_provider: provider,
    user_agent: userAgent,
  };

  infoLog("AUTH_02", loginInfo);

  try {
    const response = await fetch(`${API_URL}/auth/requestToken`, {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.text();
    successLog("AUTH_02", response.status, responseData);
    return responseData;
  } catch (error) {
    errLog("AUTH_02", error);
    return "/login";
  }
}

/**
 * **BOOKMK_01**
 *
 * API Path: /bookmark/getBookmark
 *
 * 즐겨찾기 목록을 리스트로 가져온다.
 */

export async function getBookmark(userId: string, accessToken: string) {
  const userInfo = {
    user_id: userId,
    access_token: accessToken,
  };
  infoLog("BOOKMK_01", userInfo);

  try {
    const response = await fetch(`${API_URL}/bookmark/getBookmark`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("BOOKMK_01", response.status, responseData);
    return responseData.user_bookmark;
  } catch (error) {
    errLog("BOOKMK_01", error);
    return "북마크 가져오는데 실패했습니다.";
  }
}

/**
 * **MYPAGE_03**
 *
 * API Path: /mypage/getBasicProfile
 *
 * 마이페이지 회원정보 가져오기
 */

export async function getUserInfo(userId: string, accessToken: string) {
  const userInfo = {
    user_id: userId,
    access_token: accessToken,
  };

  infoLog("MYPAGE_03", userInfo);

  try {
    const response = await fetch(`${API_URL}/mypage/getBasicProfile`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("MYPAGE_03", response.status, responseData);
    return responseData;
  } catch (error) {
    errLog("MYPAGE_03", error);
    return "마이페이지 정보 가져오기에 실패했습니다.";
  }
}
