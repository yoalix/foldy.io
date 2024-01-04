import type { Metadata } from "next";
import { Header } from "@/components/header";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase";
import { Inter } from "next/font/google";
import "./globals.css";

export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Foldy.io",
    description: "Currating the best of the web",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { currentUser } = getAuthenticatedAppForUser();
    return (
        <html lang="en">
            <Header initalUser={currentUser?.toJSON()} />
            <body className={inter.className}>{children}</body>
        </html>
    );
}
