import type { Metadata } from "next";
import { Header } from "@/components/header";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase";
import "./globals.css";
import { QueryProvider } from "@/components/query-provider";
import { Body } from "@/components/body";

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
    title: "Foldy.io",
    description: "Currating the best of the web",
    icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { currentUser } = await getAuthenticatedAppForUser();
    return (
        <html lang="en">
            <QueryProvider>
                <Header initalUser={currentUser} />
                <Body >
                    {children}
                </Body>
            </QueryProvider>
        </html>
    );
}
