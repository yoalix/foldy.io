"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

export const NavMenuItem = ({ name, icon, href }: Props) => {
  return (
    <Button
      key={`nav-${name}`}
      className="p-10 w-full justify-start flex gap-2"
      variant="ghost"
      asChild
    >
      <Link href={href}>
        {icon}
        {name}
      </Link>
    </Button>
  );
};
