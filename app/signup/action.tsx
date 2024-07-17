"use server";
import { errLog, infoLog, successLog } from "@/utils/Logger";

const API_URL = process.env.API_URL;

/**
 * **AUTH_08**
 *
 * API Path: /auth/signup
 *
 * 회원가입
 */

export async function SignupAPI(formData: FormData) {
  const userInfo = {
    user_id: formData.get("id"),
    user_email: formData.get("email"),
    user_nickname: formData.get("nickname"),
    user_provider: formData.get("provider"),
    user_subscription: formData.get("subscription"),
    user_prefer: [
      {
        cate_no: formData.get("prefer_cate"),
        situ_no: formData.get("prefer_situ"),
      },
    ],
    access_token: formData.get("access_token"),
  };

  infoLog("AUTH_08", userInfo);

  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("AUTH_08", response.status, responseData);

    return response.status;
  } catch (error) {
    errLog("AUTH_08 Error:", error);
    return "회원가입 실패했습니다.";
  }
}
