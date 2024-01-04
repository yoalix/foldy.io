"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    signInWithGoogle,
    signOut,
    onAuthStateChanged,
} from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

function useUserSession(initialUser) {
    const [user, setUser] = useState(initialUser);
    const router = useRouter();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(setUser);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        onAuthStateChanged((u) => {
            if (!user) return;
            if (user?.email !== u?.email) {
                router.refresh();
            }
        });
    }, [user]);
    return user;
}

export function Header({ initalUser }) {
    const user = useUserSession(initalUser);
    console.log({user})
    return (
        <header className="fixed top-0 left-0 right-0 flex flex-row justify-between items-center p-4">
            <Link href="/">
                <img
                    className="text-2xl font-bold"
                    src="/icons/logo.png"
                    alt="FoldyIcon"
                    width={16}
                />
            </Link>
            <div className="flex flex-row items-center">
                {user ? (
                    <div className="flex flex-row items-center">
                        <Link href="/dashboard">
                            <button className="text-sm font-semibold mr-4">Dashboard</button>
                        </Link>
                        <button className="text-sm font-semibold mr-4" onClick={signOut}>
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <button
                        className="text-sm font-semibold mr-4"
                        onClick={signInWithGoogle}
                    >
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
}
