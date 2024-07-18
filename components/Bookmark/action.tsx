"use server";

const API_URL = process.env.API_URL;

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
  try {
    const response = await fetch(`${API_URL}/bookmark/updateBookmark`, {
      method: "POST",
      body: JSON.stringify(favoriteInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.text();

    return responseData;
  } catch (error) {
    console.error("Error:", error);
    return "로그인 실패 했습니다.";
  }
}

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
  try {
    const response = await fetch(`${API_URL}/bookmark/removeBookmark`, {
      method: "POST",
      body: JSON.stringify(favoriteInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.text();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    return "로그인 실패 했습니다.";
  }
}

export async function mypageBookmark(userId: string, accessToken: string) {
  const userInfo = {
    user_id: userId,
    access_token: accessToken,
  };
  try {
    const response = await fetch(`${API_URL}/bookmark/getBookmarkList`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    return responseData.user_bookmark;
  } catch (error) {
    console.error("Error:", error);
    return "로그인 실패 했습니다.";
  }
}
