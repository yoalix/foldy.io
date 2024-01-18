import React from "react";
import Link from "next/link";
import { Compass } from "@/components/icons/compass";
import { CircleUser } from "@/components/icons/circle-user";
import { Settings } from "@/components/icons/settings";
import { Button } from "@/components/ui/button";
import { getUserProfile } from "@/lib/supabase/db";
import { MobileNav } from "./mobile-nav";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function Header() {
  const supabase = createClient(cookies());
  const userSession = await supabase.auth.getUser();
  const user = await getUserProfile(supabase, userSession.data.user?.id || "");
  if (!user) return null;
  const NavMenuItems = [
    { name: "Explore", href: "/explore", icon: <Compass /> },
    {
      name: "Profile",
      href: `/profile/${user?.username}`,
      icon: <CircleUser />,
    },
    { name: "Settings", href: "/settings", icon: <Settings /> },
  ];
  return (
    <header>
      <div className="hidden fixed top-0 left-0 bottom-0 md:flex flex-col justify-around items-center border-r border-black-50 ">
        <Link href="/" className="flex w-full items-center p-10 border-b">
          <img
            className="text-2xl font-bold h-4 w-4"
            src="/icons/logo.png"
            alt="FoldyIcon"
          />
          <h1 className="text-primary font-bold italic">FOLDY</h1>
        </Link>

        <div className="flex flex-1 flex-col items-center justify-center">
          {NavMenuItems.map((item) => (
            <Button
              key={`nav-${item.name}`}
              className="p-10 w-full justify-start"
              variant="ghost"
            >
              <Link href={item.href} className="flex gap-2">
                {item.icon}
                {item.name}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <MobileNav username={user?.username} />
    </header>
  );
}
