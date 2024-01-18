"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { signInWithGoogle } from "@/lib/supabase/auth/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";
import { BackButton } from "../ui/back-button";
import Image from "next/image";

export const Signup = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const handleSignup = async (method: string) => {
    try {
      await signInWithGoogle();
      router.push("/auth/signup/social");
    } catch (error) {
      console.log(error);
    }
  };
  const socialButtons = [
    {
      name: "Google",
      onClick: () => handleSignup("google"),
      icon: "/icons/google.png",
    },
    {
      name: "Apple",
      onClick: () => handleSignup("apple"),
      icon: "/icons/apple.png",
    },
    {
      name: "Facebook",
      onClick: () => handleSignup("facebook"),
      icon: "/icons/facebook.png",
    },
  ];

  const Content = () => (
    <div className="flex flex-col gap-4 w-[240px]">
      {socialButtons.map((social) => (
        <Button
          key={`social-${social.name}`}
          variant="secondary"
          onClick={social.onClick}
          className="relative"
        >
          {" "}
          SIGN UP WITH {social.name.toUpperCase()}
          <Image
            src={social.icon}
            width={36}
            height={36}
            alt={`${social.name} icon`}
            className="absolute right-[-36px] bg-white border border-black-50 rounded-r-[10px]"
          />
        </Button>
      ))}
      {!isMobile && <p className="p-4">OR</p>}
      <Button key={`social-email}`} variant="secondary">
        <Link href="/auth/signup/email">SIGN UP WITH EMAIL</Link>
      </Button>
    </div>
  );
  return isMobile ? (
    <div className="p-10">
      <BackButton />
      <h1 className="py-10">SIGN UP</h1>
      <Content />
    </div>
  ) : (
    <Dialog defaultOpen open>
      <DialogContent
        className="w-[500px] h-[500px] p-14 flex flex-col"
        closeIcon={false}
      >
        <BackButton />
        <DialogTitle>SIGN UP</DialogTitle>
        <Content />
      </DialogContent>
    </Dialog>
  );
};
