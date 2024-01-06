"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
  signInWithApple,
  signInWithFacebook,
} from "@/lib/firebase/auth";
import { useGetCurrentUser } from "@/hooks/firebase/useGetCurrentUser";
import { useUserSession } from "@/hooks/firebase/useUserSession";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export const Login = ({ initialUser }) => {
  const form = useForm();
  const router = useRouter();
  const handleSignIn = async (method: string) => {
    try {
      if (method === "google") {
        await signInWithGoogle();
      } else if (method === "apple") {
        await signInWithApple();
      } else if (method === "facebook") {
        await signInWithFacebook();
      }
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  const handleEmailSignIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword({
      email,
      password,
    });
    router.push("/profile");
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
  return (
    <Dialog defaultOpen open>
      <DialogContent closeIcon={false}>
        <DialogTitle>LOG IN</DialogTitle>
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
        <p>OR</p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              handleEmailSignIn(data.email, data.password)
            )}
            className="flex flex-col gap-3 mb-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="email"
                      {...field}
                      onClear={() => form.setValue("email", "")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="password"
                      type="password"
                      {...field}
                      onClear={() => form.setValue("password", "")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button key={`social-email}`} variant="secondary">
              <Link href="/signup/email">LOG IN</Link>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
