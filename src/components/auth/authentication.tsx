import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Authentication = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-10 gap-10">
      <div className="flex justify-start items-center self-start">
        <img
          className="text-2xl font-bold h-4 w-4"
          src="/icons/logo.png"
          alt="FoldyIcon"
        />
        <h1 className="text-primary font-bold italic">FOLDY</h1>
      </div>
      <h1 className="text-6xl">Organized Links for You and Your Followers.</h1>
      <div className="flex justify-center gap-2">
        <div>
          <Link href="/auth/signup">
            <Button className="w-44" variant="default" size="lg">
              Sign Up
            </Button>
          </Link>
          <p className="text-sm text-primary text-center mr-4">new account</p>
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
          <p className="text-sm text-center mr-4">existing account</p>
        </div>
      </div>
      <div className="text-sm mt-24">
        <h1>Foldy, LLC</h1>
        <div className="text-black-secondary italic">Idea by Zander Huff</div>
      </div>
    </div>
  );
};
