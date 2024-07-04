"use client";
import React from "react";
import NextLink from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { NavbarBrand } from "@nextui-org/navbar";

const NavLogo = () => {
  const { theme } = useTheme();
  return (
    <>
      <NavbarBrand>
        <NextLink className="flex justify-start items-center" href="/">
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
        </NextLink>
      </NavbarBrand>
    </>
  );
};

export default NavLogo;
