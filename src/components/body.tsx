"use client";
import React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const Body = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();

  return (
    <body
      className={
        inter.className + (isMobile ? " mt-20" : " ml-40 max-w-[680px]")
      }
    >
      {children}
    </body>
  );
};
