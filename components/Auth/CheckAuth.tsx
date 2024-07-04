"use client";

import React, { useContext, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { UserContext } from "@/providers/userProvider";
import { useRouter } from "next/navigation";
import { getBookmark } from "./action";

const CheckAuth = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { updateUserData } = useContext(UserContext);

  const user_id = searchParams.get("user_id");
  const access_token = searchParams.get("access_token");
  const refresh_token = searchParams.get("refresh_token");
  const is_new = searchParams.get("new");

  useEffect(() => {
    const fetchDataAndSetUserData = async (userId: string) => {
      try {
        if (is_new === "true") {
          router.push("/signup");
          updateUserData({
            id: userId,
            accessToken: access_token || "",
            refreshToken: refresh_token || "",
            favorite: [],
          });
        } else {
          const favorite = await getBookmark(userId);
          router.push("/");
          updateUserData({
            id: userId,
            accessToken: access_token || "",
            refreshToken: refresh_token || "",
            favorite: favorite,
          });
        }
      } catch (error) {
        console.error("Error fetching userdata", error);
      }
    };

    if (user_id && access_token && refresh_token) {
      fetchDataAndSetUserData(user_id);
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
