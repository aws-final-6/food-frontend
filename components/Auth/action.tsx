"use server";
const API_URL = process.env.API_URL;

export async function LoginAPI(provider: string) {
  console.log("AUTH_02 request token", provider);
  const loginInfo = {
    user_provider: provider,
  };
  console.log(loginInfo);

  try {
    const response = await fetch(`${API_URL}/auth/requestToken`, {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.text();
    //console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    return "로그인 실패 했습니다.";
  }
}

export async function getBookmark(userId: string, accessToken: string) {
  const userInfo = {
    user_id: userId,
    access_token: accessToken,
  };
  try {
    const response = await fetch(`${API_URL}/bookmark/getBookmark`, {
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
    console.error("Error:", error);
    return "북마크 가져오는데 실패했습니다.";
  }
}
