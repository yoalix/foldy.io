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

export function Header({ initalUser }) {
    const user = useUserSession(initalUser);
    console.log({ user });
    const navMenuItems = [
        { name: "Explore", href: "/explore", icon: <Compass /> },
        { name: "Profile", href: "/profile", icon: <CircleUser /> },
        { name: "Settings", href: "/settings", icon: <Settings /> },
    ];
    return (
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
                    {navMenuItems.map((item) => (
                        <Button className={"text-sm mr-4"} variant="ghost">
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
                    <Button
                        className="text-sm font-semibold mr-4"
                        variant="secondary"
                    >
                        <Link href="/login">Log In</Link>
                    </Button>
                </div>
            )}
        </header>
    );
}
