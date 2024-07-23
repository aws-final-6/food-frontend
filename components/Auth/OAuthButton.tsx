"use client";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import Image from "next/image";
import { useTheme } from "next-themes";
import { KakaoLogo, NaverLogo, GoogleLogo } from "../icons";
import { checkSession, LoginAPI } from "./action";
import { useRouter } from "next/navigation";
import { UserContext } from "@/providers/userProvider";

const OAuthButton = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { userData, clearUserData } = useContext(UserContext);
  const [userAgent, setUserAgent] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserAgent(navigator.userAgent);
    }
  }, []);

  useLayoutEffect(() => {
    const fetchData = async () => {
      if (userData) {
        const res = await checkSession(
          userData.provider,
          userData.id,
          userData.accessToken
        );
        if (res !== 200) {
          clearUserData();
        }
      }
    };
    fetchData();
  }, []);

  async function handleLoginButton(provider: string, userAgent: any) {
    console.log("provider", provider);
    const data = await LoginAPI(provider, userAgent);
    console.log("backend url", data);
    router.push(data);
  }
  return (
    <Card>
      <CardBody className="p-10 flex flex-col gap-5">
        <Image
          src={
            theme === "light" || theme == null
              ? "/logo_light.png"
              : "/logo_dark.png"
          }
          alt="Logo"
          width={200}
          height={50}
        />
        <Button
          variant="shadow"
          className="bg-kakao"
          startContent={<KakaoLogo className="w-5" />}
          onClick={() => handleLoginButton("kakao", userAgent)}
        >
          카카오로 로그인
        </Button>
        <Button
          variant="shadow"
          className="bg-naver text-white"
          startContent={<NaverLogo />}
          onClick={() => handleLoginButton("naver", userAgent)}
        >
          네이버로 로그인
        </Button>
        <Button
          variant="shadow"
          className=" bg-slate-100"
          startContent={<GoogleLogo />}
          onClick={() => handleLoginButton("google", userAgent)}
        >
          구글로 로그인
        </Button>
      </CardBody>
    </Card>
  );
};

export default OAuthButton;
