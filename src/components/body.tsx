"use client";
import React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { Authentication } from "@/components/auth/authentication";
import { useUserSession } from "@/hooks/queries/useUserSession";
import { AUTH_ROUTES } from "@/lib/consts";

const inter = Inter({ subsets: ["latin"] });

export const Body = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const user = useUserSession();
  const pathName = usePathname();
  const isAuthRoute = AUTH_ROUTES.find((route) => pathName.includes(route));

  return (
    <body>
      {user || isAuthRoute ? (
        <div
          className={
            inter.className +
            " h-full w-full " +
            (isMobile ? " mt-20" : " ml-40 max-w-[680px]")
          }
        >
          {children}
        </div>
      ) : (
        <Authentication />
      )}
    </body>
  );
};
