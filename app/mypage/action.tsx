"use server";

const API_URL = process.env.API_URL;

export async function UpdateMypage(formData: FormData) {
  const userInfo = {
    user_id: formData.get("id"),
    user_email: formData.get("email"),
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
  //console.log(userInfo);
  try {
    const response = await fetch(`${API_URL}/mypage/updateProfile`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.status;
    //console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("MYPAGE_02 Error:", error);
    return "마이페이지 업데이트 실패했습니다.";
  }
}

export async function MyPageAPI(userId: string, accessToken: string) {
  const userInfo = {
    user_id: userId,
    access_token: accessToken,
  };

  try {
    const response = await fetch(`${API_URL}/mypage/getProfile`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("MYPAGE_01 Error:", error);
    return "마이페이지 정보 가져오기에 실패했습니다.";
  }
}
