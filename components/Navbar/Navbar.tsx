import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import NavLogo from "./NavLogo";
import NavWebMenu from "./NavWebMenu";
import LoginButton from "./LoginButton";
import { ThemeSwitch } from "./ThemeSwitch";
import Searchbar from "./Searchbar";
import NavMobileMenu from "./NavMobileMenu";
import SearchMobile from "./SearchMobile";

const Navbar = () => {
  return (
    <>
      <NextUINavbar maxWidth="xl" position="sticky" height={"100px"}>
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavLogo />
          <NavWebMenu />
        </NavbarContent>
        <NavbarContent justify="end" className="hidden lg:flex">
          <Searchbar />
          {/* <ThemeSwitch /> */}
          <LoginButton />
        </NavbarContent>
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          {/* <ThemeSwitch /> */}
          <SearchMobile />
          <NavbarMenuToggle />
        </NavbarContent>
        <NavbarMenu>
          <NavMobileMenu />
        </NavbarMenu>
      </NextUINavbar>
    </>
  );
};

export default Navbar;
