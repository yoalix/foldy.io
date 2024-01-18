import type { Metadata } from "next";
import { Header } from "@/components/header";
import "./globals.css";
import { QueryProvider } from "@/components/query-provider";
import { Body } from "@/components/body";
import { Toaster } from "@/components/ui/toaster";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { getUserProfile } from "@/lib/supabase/db";

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
  const supabase = createClient(cookies());
  const userSession = await supabase.auth.getUser();
  const user = await getUserProfile(supabase, userSession.data.user?.id || "");
  return (
    <html lang="en">
      <QueryProvider>
        <Body>
          <Header user={user} />
          {children}
          <Toaster />
        </Body>
      </QueryProvider>
    </html>
  );
}
