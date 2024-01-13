"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
  //signInWithApple,
  //signInWithFacebook,
} from "@/lib/supabase/auth/client";
import { signInWithGoogle as signInWithGoogleServer } from "@/lib/supabase/auth/server";
import { useGetCurrentUser } from "@/hooks/queries/useGetCurrentUser";
import { useUserSession } from "@/hooks/queries/useUserSession";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormInputField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Checkbox } from "../ui/checkbox";

type LoginForm = {
  email: string;
  password: string;
};

export const Login = () => {
  const form = useForm<LoginForm>();
  const router = useRouter();
  const isMobile = useIsMobile();
  const handleSignIn = async (method: string) => {
    try {
      //   if (method === "google") {
      const res = await signInWithGoogle();
      console.log("res", res);
      /*  } else if (method === "apple") {
        await signInWithApple();
      } else if (method === "facebook") {
        await signInWithFacebook();
      }*/
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  const handleEmailSignIn = async ({ email, password }: LoginForm) => {
    try {
      const res = await signInWithEmailAndPassword({
        email,
        password,
      });
      console.log("res", res);
      if (res.error) {
        form.setError("password", {
          type: "validate",
          message: res.error.message,
        });
      }
      router.push("/profile");
    } catch {
      console.log("am i here");
    }
  };
  const socialButtons = [
    {
      name: "Google",
      onClick: () => handleSignIn("google"),
      icon: "/icons/google.png",
    },
    {
      name: "Apple",
      onClick: () => handleSignIn("apple"),
      icon: "/icons/apple.png",
    },
    {
      name: "Facebook",
      onClick: () => handleSignIn("facebook"),
      icon: "/icons/facebook.png",
    },
  ];

  const Content = () => (
    <>
      <div className="flex flex-row gap-3">
        {socialButtons.map((social) => (
          <Button
            key={`social-${social.name}`}
            className="w-8 h-min rounded-lg"
            variant="outline"
            size="icon"
            asChild
            onClick={social.onClick}
          >
            <img src={social.icon} alt={social.name} width={24} />
          </Button>
        ))}
      </div>
      <p className="italic">OR</p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleEmailSignIn)}
          className="flex flex-col gap-3 mb-8"
        >
          <FormInputField
            control={form.control}
            name="email"
            placeholder="email"
          />
          <FormInputField
            control={form.control}
            name="password"
            placeholder="password"
            type="password"
          />
          <Link
            href="/auth/password-recovery"
            className="text-black-secondary self-end pt-0 mt-[-10px]"
          >
            forgot password?
          </Link>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" className="bg-black-50" />
            <label
              htmlFor="terms"
              className="text-black-secondary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              remember me when logging in next time
            </label>
          </div>
          <Button variant="secondary" className="w-[180px]" type="submit">
            LOG IN
          </Button>
        </form>
      </Form>
      <div>
        <p className="text-black-secondary">Don’t have an account?</p>
        <Link className="text-primary" href="/auth/signup">
          Get started today!
        </Link>
      </div>
    </>
  );
  return isMobile ? (
    <div className="p-10 flex flex-col gap-5">
      <h1>LOG IN</h1>
      <Content />
    </div>
  ) : (
    <Dialog defaultOpen open>
      <DialogContent closeIcon={false}>
        <DialogTitle>LOG IN</DialogTitle>
        <Content />
      </DialogContent>
    </Dialog>
  );
};
