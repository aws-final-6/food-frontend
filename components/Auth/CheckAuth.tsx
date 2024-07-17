"use client";

import React, { useContext, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { UserContext } from "@/providers/userProvider";
import { useRouter } from "next/navigation";
import { getBookmark, getUserInfo } from "./action";

const CheckAuth = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { updateUserData, setFavorite } = useContext(UserContext);

  const user_id = searchParams.get("user_id");
  const access_token = searchParams.get("access_token");
  const refresh_token = searchParams.get("refresh_token");
  const is_new = searchParams.get("new");
  const user_email = searchParams.get("user_email");
  const provider = searchParams.get("provider");

  useEffect(() => {
    const fetchDataAndSetUserData = async (
      userId: string,
      access_token: string
    ) => {
      try {
        if (is_new == "false") {
          const data = await getUserInfo(userId, access_token);
          updateUserData({
            id: userId,
            accessToken: access_token || "",
            refreshToken: refresh_token || "",
            email: user_email || "",
            provider: provider || "",
            nickname: data.user_nickname,
            cate_no: data.user_prefer[0].cate_no,
            situ_no: data.user_prefer[0].situ_no,
          });
          const favorite = await getBookmark(userId, access_token);
          setFavorite(favorite);
        } else {
          updateUserData({
            id: userId,
            accessToken: access_token || "",
            refreshToken: refresh_token || "",
            email: user_email || "",
            provider: provider || "",
          });
        }
      } catch (error) {
        console.error("Error fetching userdata", error);
      }
    };

    if (user_id && access_token && refresh_token) {
      fetchDataAndSetUserData(user_id, access_token);
      if (is_new == "true") {
        router.push("/signup");
      } else {
        router.push("/");
      }
    }
  }, []);

  return <div></div>;
};

export default CheckAuth;
