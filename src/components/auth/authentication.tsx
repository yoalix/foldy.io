import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Authentication = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-10 gap-10">
      <div className="flex justify-start items-center self-start">
        <Image
          className="text-2xl font-bold h-4 w-4"
          src="/icons/logo.png"
          alt="FoldyIcon"
          width={16}
          height={16}
        />
        <h1 className="text-primary italic">FOLDY</h1>
      </div>
      <h1 className="text-6xl font-normal">
        Organized Links for You and Your Followers.
      </h1>
      <div className="flex justify-center gap-2">
        <div>
          <Link href="/auth/signup">
            <Button className="w-44" variant="default" size="lg">
              Sign Up
            </Button>
          </Link>
          <p className="text-primary text-center mr-4">new account</p>
        </div>
        <div>
          <Link href="/auth/login">
            <Button
              className="
            w-44"
              variant="secondary"
              size="lg"
            >
              Log In
            </Button>
          </Link>
          <p className="text-center mr-4">existing account</p>
        </div>
      </div>
      <div className="mt-24">
        <h1>Foldy, LLC</h1>
        <div className="text-black-secondary italic">Idea by Zander Huff</div>
      </div>
    </div>
  );
};
