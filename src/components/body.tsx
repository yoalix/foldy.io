"use client";
import React from "react";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { Authentication } from "@/components/auth/authentication";
import { useUserSession } from "@/hooks/queries/useUserSession";
import { AUTH_ROUTES } from "@/lib/utils/consts";

const inter = Inter({ subsets: ["latin"] });

export const Body = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const isAuthRoute = AUTH_ROUTES.find((route) => pathName.includes(route));

  return (
    <body>
      <div
        className={`${inter.className} p-10 md:p-20 h-full w-full  ${
          isAuthRoute ? "" : "md:max-w-[680px] md:ml-40 mt-20 md:mt-0"
        }`}
      >
        {children}
      </div>
    </body>
  );
};
