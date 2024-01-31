import React from "react";
import { Button } from "@/components/ui/button";
import { getCurrentUser, signOut } from "@/lib/supabase/auth/server";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { RightArrow } from "@/components/icons/right-arrow";
import { BackButton } from "./ui/back-button";
import { revalidatePath } from "next/cache";
import { getUserProfile } from "@/lib/supabase/db";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export const Settings = async () => {
  const supabase = createClient(cookies());
  const { user: curentUser } = await getCurrentUser();
  const user = await getUserProfile(supabase, curentUser?.id);
  const handleSignOut = async () => {
    "use server";
    try {
      await signOut();
      console.log("signed out");
      revalidatePath("/");
    } catch (error) {
      console.log(error);
    }
    redirect("/");
  };
  const settings = [
    {
      text: "Edit Profile",
      href: "/profile/edit",
    },

    {
      text: "Following",
      href: `/${user?.username}/following`,
    },
    {
      text: "Followers",
      href: `/${user?.username}/followers`,
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
    <div className="flex flex-col gap-3 h-full w-full">
      <BackButton className="ml-4" />
      <h1 className="pl-4">Settings</h1>
      {settings.map((setting) =>
        setting.href ? (
          <Link key={`setting-${setting.text}`} href={setting.href}>
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
          <div key={`setting-${setting.text}`}>
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
      <form action={handleSignOut}>
        <Button
          className="text-left text-urgent hover:text-urgent justify-start w-full"
          variant="ghost"
        >
          Sign Out
        </Button>
      </form>
    </div>
  );
};
