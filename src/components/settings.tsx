"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/supabase/auth/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RightArrow } from "@/components/icons/right-arrow";
import { BackButton } from "./ui/back-button";

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
  const settings = [
    {
      text: "Edit Profile",
      href: "/profile/edit",
    },

    {
      text: "Following",
      href: "/following",
    },
    {
      text: "Followers",
      href: "/followers",
    },
    {
      text: "Terms and Agreements",
      href: "/terms",
    },
    {
      text: "Privacy Policy",
      href: "/privacy",
    },
    {
      text: "Forms and Billing (coming soon)",
      // TODO: add billing page
      // href: "/billing",
    },
    {
      text: "Subscriptions (coming soon)",
      // TODO: add subscriptions page
      // href: "/subscriptions",
    },
  ];
  return (
    <div className="flex flex-col gap-3 h-full w-full p-10">
      <BackButton className="ml-4" />
      <h1 className="pl-4">Settings</h1>
      {settings.map((setting) =>
        setting.href ? (
          <Link href={setting.href}>
            <Button
              key={`setting-${setting.text}`}
              variant="ghost"
              className="flex justify-between items-center gap-2 py-6 w-full"
            >
              {setting.text}
              <RightArrow />
            </Button>
          </Link>
        ) : (
          <div>
            <Button
              key={`setting-${setting.text}`}
              className="text-black-secondary"
              variant="ghost"
              disabled
            >
              {setting.text}
            </Button>
          </div>
        )
      )}
      <Button
        className="text-left text-urgent hover:text-urgent justify-start w-full"
        variant="ghost"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  );
};
