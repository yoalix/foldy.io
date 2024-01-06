import type { Metadata } from "next";
import { Header } from "@/components/header";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/query-provider";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foldy.io",
  description: "Currating the best of the web",
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
        <body className={inter.className + " ml-40"}>{children}</body>
      </QueryProvider>
    </html>
  );
}
