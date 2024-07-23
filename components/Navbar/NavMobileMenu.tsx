"use client";

import React, { useState, useContext, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { NavbarMenuItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { UserContext } from "@/providers/userProvider";
import { usePathname } from "next/navigation";

const NavMobileMenu = () => {
  const { userData } = useContext(UserContext);
  const pathname = usePathname();
  const [navMobileMenu, setNavMobileMenu] = useState(
    siteConfig.mobilebasicItems
  );
  useEffect(() => {
    if (userData && userData.nickname) {
      setNavMobileMenu(siteConfig.mobileuserItems);
    }
  }, []);
  return (
    <div className="mx-4 mt-2 flex flex-col gap-2">
      {navMobileMenu.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`}>
          <Link
            color={
              item.label == "로그아웃"
                ? "danger"
                : item.href == pathname
                  ? "primary"
                  : "foreground"
            }
            href={item.href}
            size="lg"
          >
            {item.label}
          </Link>
        </NavbarMenuItem>
      ))}
    </div>
  );
};

export default NavMobileMenu;
