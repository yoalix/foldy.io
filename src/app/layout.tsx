import type { Metadata } from "next";
import { Header } from "@/components/header";
import "./globals.css";
import { QueryProvider } from "@/components/query-provider";
import { Body } from "@/components/body";
import { Toaster } from "@/components/ui/toaster";

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
  return (
    <html lang="en">
      <QueryProvider>
        <Body>
          <Header />
          {children}
          <Toaster />
        </Body>
      </QueryProvider>
    </html>
  );
}
