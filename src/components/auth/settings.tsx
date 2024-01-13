"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/supabase/auth/client";
import { redirect, useRouter } from "next/navigation";

export const Settings = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("signed out");
      router.push("/auth");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center align-center h-full w-full p-10">
      <Button
        className="text-sm font-semibold self-center"
        variant="secondary"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  );
};
