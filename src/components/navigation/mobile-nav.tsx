"use client";

// import { Menu } from "@/components/icons/menu";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { Bell, Menu, Search } from "lucide-react";

export const MobileNav = ({ username }: { username?: string }) => {
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
    <div className="md:hidden z-10">
      <div
        className={`fixed top-0 left-0 right-0 flex justify-between gap-3 p-9 bg-[#FFF] transition-all duration-500 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <Link href="/" className="flex w-full items-center">
          <Image
            className="text-2xl font-bold h-4 w-4"
            src="/icons/logo.png"
            alt="FoldyIcon"
            width={16}
            height={16}
          />
          <h1 className="text-primary italic">FOLDY</h1>
        </Link>
        <Link href="/explore">
          <Button
            variant="ghost"
            size="icon"
            className="flex justify-center items-center text-black-secondary"
          >
            <Search />
          </Button>
        </Link>
        <Link href="/profile/notifications">
          <Button
            variant="ghost"
            size="icon"
            className="flex justify-center items-center text-black-secondary"
          >
            <Bell />
          </Button>
        </Link>
        <Link href="/settings">
          <Button variant="ghost" size="icon" className="text-black-secondary">
            <Menu />
          </Button>
        </Link>
      </div>
      {/* <nav
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
        <Link href={`/${username}`}>
          <Button
            className="border-l-0 rounded-l-none rounded-r-3xl"
            variant="outline"
            size="lg"
          >
            Profile
          </Button>
        </Link>
      </nav> */}
    </div>
  );
};
