"use client";
import React, { useContext } from "react";
import { UserContext } from "@/providers/userProvider";
import { NavbarItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

const LoginButton = () => {
  const { clearUserData, userData } = useContext(UserContext);

  function handleLogout() {
    if (userData && userData.nickname) {
    }
    clearUserData();
  }

  return (
    <>
      <NavbarItem className="hidden md:flex">
        {userData && userData.nickname ? (
          <Button
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={"/"}
            variant="flat"
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        ) : (
          <Button
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={"/login"}
            variant="flat"
          >
            로그인
          </Button>
        )}
      </NavbarItem>
    </>
  );
};

export default LoginButton;
