"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useGetCurrentUser } from "@/hooks/firebase/useGetCurrentUser";
import { useUserSession } from "@/hooks/firebase/useUserSession";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Signup = ({ initialUser }) => {
    const router = useRouter();
    const handleSignup = async (method: string) => {
        try {
            await signInWithGoogle();
            router.push("/signup/social");
        } catch (error) {
            console.log(error);
        }
    };
    const socialButtons = [
        { name: "Google", onClick: () => handleSignup("google"), icon: "/icons/google.png" },
        { name: "Apple", onClick: () => handleSignup("apple"), icon: "/icons/apple.png" },
        { name: "Facebook", onClick: () => handleSignup("facebook"), icon: "/icons/facebook.png" },
    ];
    const userSession = useUserSession(initialUser);
    const user = useGetCurrentUser();
    console.log("signup", user);
    return (
        <Dialog defaultOpen open>
            <DialogContent closeIcon={false}>
                <DialogTitle>SIGN UP</DialogTitle>
                {socialButtons.map((social) => (
                    <Button
                        key={`social-${social.name}`}
                        variant="secondary"
                        onClick={social.onClick}
                    >
                        {" "}
                        SIGN UP WITH {social.name.toUpperCase()}
                        <img
                            src={social.icon}
                            width={36}
                            className="absolute right-10 bg-white border-secondary"
                        />
                    </Button>
                ))}
                <p>OR</p>
                <Button key={`social-email}`} variant="secondary">
                    <Link href="/signup/email">SIGN UP WITH EMAIL</Link>
                </Button>
            </DialogContent>
        </Dialog>
    );
};
