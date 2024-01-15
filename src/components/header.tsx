"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "@/lib/supabase/auth/client";
import { Compass } from "@/components/icons/compass";
import { CircleUser } from "@/components/icons/circle-user";
import { Settings } from "@/components/icons/settings";
import { Button } from "@/components/ui/button";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { Menu } from "@/components/icons/menu";
import { User } from "@/lib/supabase/db";

const MobileNav = ({ username }: { username?: string }) => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.scrollY || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollTop(currentScrollTop);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);
  return (
    <header>
      <div
        className={`fixed top-0 left-0 right-0 flex justify-between p-9 bg-[#FFF] transition-all duration-500 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <Link href="/" className="flex w-full items-center">
          <img
            className="text-2xl font-bold h-4 w-4"
            src="/icons/logo.png"
            alt="FoldyIcon"
          />
          <h1 className="text-primary italic">FOLDY</h1>
        </Link>
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </Link>
      </div>
      <nav
        className={`fixed bottom-3 left-0 right-0 flex justify-center transition-all duration-500 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <Link href="/explore">
          <Button
            className="font-bold border-r-0 rounded-r-none rounded-l-3xl"
            variant="outline"
            size="lg"
          >
            Explore
          </Button>
        </Link>
        <Link href={`/profile/${username}`}>
          <Button
            className="border-l-0 rounded-l-none rounded-r-3xl"
            variant="outline"
            size="lg"
          >
            Profile
          </Button>
        </Link>
      </nav>
    </header>
  );
};

export function Header({ user }: { user?: User | null }) {
  const breakpoint = useBreakpoints();
  const isMobile = breakpoint === "sm" || breakpoint === "xs";
  const NavMenuItems = [
    { name: "Explore", href: "/explore", icon: <Compass /> },
    {
      name: "Profile",
      href: `/profile/${user?.username}`,
      icon: <CircleUser />,
    },
    { name: "Settings", href: "/settings", icon: <Settings /> },
  ];
  if (!user) return null;
  return isMobile ? (
    <MobileNav username={user?.username} />
  ) : (
    <header className="fixed top-0 left-0 bottom-0 flex flex-col justify-around items-center  border-r border-black-50 ">
      <Link href="/" className="flex w-full items-center p-10 border-b">
        <img
          className="text-2xl font-bold h-4 w-4"
          src="/icons/logo.png"
          alt="FoldyIcon"
        />
        <h1 className="text-primary font-bold italic">FOLDY</h1>
      </Link>

      <div className="flex flex-1 flex-col items-start gap-8 mt-8">
        {NavMenuItems.map((item) => (
          <Button key={`nav-${item.name}`} className={"mr-4"} variant="ghost">
            <Link href={item.href} className="flex items-center gap-2">
              {item.icon}
              {item.name}
            </Link>
          </Button>
        ))}
        <Button
          className="font-semibold self-center"
          variant="secondary"
          onClick={signOut}
        >
          Sign Out
        </Button>
      </div>
    </header>
  );
}
