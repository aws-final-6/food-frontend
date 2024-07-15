"use client";
import React, { useContext } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import Image from "next/image";
import { useTheme } from "next-themes";
import { KakaoLogo, NaverLogo, GoogleLogo } from "../icons";
import { LoginAPI } from "./action";
import { useRouter } from "next/navigation";
import { UserContext } from "@/providers/userProvider";

const OAuthButton = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { updateProvider } = useContext(UserContext);
  async function handleLoginButton(provider: string) {
    updateProvider(provider);
    //console.log(provider);
    const data = await LoginAPI(provider);

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
          onClick={() => handleLoginButton("kakao")}
        >
          카카오로 로그인
        </Button>
        <Button
          variant="shadow"
          className="bg-naver text-white"
          startContent={<NaverLogo />}
          onClick={() => handleLoginButton("naver")}
        >
          네이버로 로그인
        </Button>
        <Button
          variant="shadow"
          className=" bg-slate-100"
          startContent={<GoogleLogo />}
          onClick={() => handleLoginButton("google")}
        >
          구글로 로그인
        </Button>
      </CardBody>
    </Card>
  );
};

export default OAuthButton;
