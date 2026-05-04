"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Products",
      path: "/products",
    },
    {
      name: "My Profile",
      path: "/my-profile",
    },
  ];

  return (
    <>
      {navItems.map((link) => {
        const isActive = pathname === link.path;

        return (
          <li key={link.path}>
            <Link
              href={link.path}
              className={`text-sm tracking-wide transition-all duration-300 ${isActive ? "font-semibold text-[#FF7206]" : "font-medium text-neutral-500 hover:text-neutral-900"}`}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;