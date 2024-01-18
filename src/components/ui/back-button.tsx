"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { LeftArrow } from "@/components/icons/left-arrow";

export const BackButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <Button
      className={"self-start mb-3 p-0 gap-1 " + className}
      variant="ghost"
      onClick={() => router.back()}
    >
      <LeftArrow />
      Back
    </Button>
  );
};
