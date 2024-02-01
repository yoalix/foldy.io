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
import Image from "next/image";
import { NavMenuItem } from "./nav-menu-item";
import { Bell } from "lucide-react";

export async function Header() {
  const supabase = createClient(cookies());
  const userSession = await supabase.auth.getUser();
  const user = await getUserProfile(supabase, userSession.data.user?.id || "");
  if (!user) return null;
  const NavMenuItems = [
    { name: "Search", href: "/explore", icon: <Compass /> },
    {
      name: "Profile",
      href: `/${user?.username}`,
      icon: <CircleUser />,
    },
    {
      name: "Notifications",
      href: "/profile/notifications",
      icon: <Bell strokeWidth={1} />,
    },
    { name: "Settings", href: "/settings", icon: <Settings /> },
  ];
  return (
    <header>
      <div className="hidden fixed top-0 left-0 bottom-0 md:flex flex-col justify-around items-center border-r border-black-50 ">
        <Link href="/" className="flex w-full items-center p-10 border-b">
          <Image
            className="text-2xl font-bold h-4 w-4"
            src="/icons/logo.png"
            alt="FoldyIcon"
            width={16}
            height={16}
          />
          <h1 className="text-primary font-bold italic">FOLDY</h1>
        </Link>

        <div className="flex flex-1 flex-col items-center justify-start">
          {NavMenuItems.map((item) => (
            <NavMenuItem
              key={`nav-${item.name}`}
              name={item.name}
              icon={item.icon}
              href={item.href}
            />
          ))}
        </div>
      </div>
      <MobileNav username={user?.username} />
    </header>
  );
}
