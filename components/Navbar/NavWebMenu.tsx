"use client";
import React, { useContext, useEffect, useState } from "react";
import { link as linkStyles } from "@nextui-org/theme";
import { NavbarItem } from "@nextui-org/navbar";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { UserContext } from "@/providers/userProvider";
import { usePathname } from "next/navigation";

const NavWebMenu = () => {
  const { userData } = useContext(UserContext);
  const pathname = usePathname();
  const [navWebMenu, setNavWebMenu] = useState(siteConfig.webbasicItems);

  useEffect(() => {
    if (userData && userData.nickname) {
      setNavWebMenu(siteConfig.webuserItems);
    }
  }, [userData]);
  return (
    <>
      <ul className="hidden lg:flex gap-12 justify-center ml-2">
        {navWebMenu.map((item) => (
          <NavbarItem key={item.href}>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium font-jua text-xl ",
                {
                  "border-b-3 border-gray-600": item.href == pathname,
                }
              )}
              href={item.href}
            >
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
      </ul>
    </>
  );
};

export default NavWebMenu;
