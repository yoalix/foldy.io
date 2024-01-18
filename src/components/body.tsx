"use client";
import React from "react";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { Authentication } from "@/components/auth/authentication";
import { useUserSession } from "@/hooks/queries/useUserSession";
import { AUTH_ROUTES } from "@/lib/consts";

const inter = Inter({ subsets: ["latin"] });

export const Body = ({ children }: { children: React.ReactNode }) => {
  const user = useUserSession();
  const pathName = usePathname();
  const isAuthRoute = AUTH_ROUTES.find((route) => pathName.includes(route));

  return (
    <body>
      {user || isAuthRoute ? (
        <div
          className={`${inter.className} h-full w-full mt-20 md:mt-0 md:ml-40 md:max-w-[680px]`}
        >
          {children}
        </div>
      ) : (
        <Authentication />
      )}
    </body>
  );
};
