"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  signInWithGoogle,
  signOut,
  onAuthStateChanged,
} from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { Compass } from "@/components/icons/compass";
import { CircleUser } from "@/components/icons/circle-user";
import { Settings } from "@/components/icons/settings";
import { Button } from "@/components/ui/button";
import { useUserSession } from "@/hooks/firebase/useUserSession";
import { FirebaseUser } from "@/lib/firebase/firebase";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { Menu } from "@/components/icons/menu";

type HeaderProps = {
  initalUser?: FirebaseUser | null;
};

const NavMenuItems = [
  { name: "Explore", href: "/explore", icon: <Compass /> },
  { name: "Profile", href: "/profile", icon: <CircleUser /> },
  { name: "Settings", href: "/settings", icon: <Settings /> },
];

const MobileNav = () => {
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
          <h1 className="text-primary font-bold italic">FOLDY</h1>
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
        <Link href="/profile">
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

export function Header({ initalUser }: HeaderProps) {
  const user = useUserSession(initalUser);
  const breakpoint = useBreakpoints();
  const isMobile = breakpoint === "sm" || breakpoint === "xs";

  return isMobile ? (
    <MobileNav />
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

      {user ? (
        <div className="flex flex-1 flex-col items-start gap-8 mt-8">
          {NavMenuItems.map((item) => (
            <Button
              key={`nav-${item.name}`}
              className={"text-sm mr-4"}
              variant="ghost"
            >
              <Link href={item.href} className="flex items-center gap-2">
                {item.icon}
                {item.name}
              </Link>
            </Button>
          ))}
          <Button
            className="text-sm font-semibold self-center"
            variant="secondary"
            onClick={signOut}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="flex flex-col flex-1 justify-end gap-5 m-5">
          <Button className="text-sm font-semibold mr-4" variant="secondary">
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button className="text-sm font-semibold mr-4" variant="secondary">
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
