"use server";

"use server";
const API_URL = process.env.API_URL;

/**
 * **AUTH_07**
 *
 * API Path: /auth/logout
 *
 * 로그아웃 API, 백엔드에게 사용자가 로그아웃 했다고 전달
 * SESSION DB에서 사용자 정보 삭제
 */

export async function LogoutAPI(
  provider: string,
  userId: string,
  accessToken: string
) {
  const logoutInfo = {
    user_provider: provider,
    user_id: userId,
    access_token: accessToken,
  };

  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      body: JSON.stringify(logoutInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.text();
    return "로그아웃 성공했습니다!ㄴ";
  } catch (error) {
    console.error("AUTH_07 Logout Error:", error);
    return "로그아웃 실패 했습니다.";
  }
}
