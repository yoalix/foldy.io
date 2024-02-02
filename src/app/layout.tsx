import type { Metadata, Viewport } from "next";
import { Header } from "@/components/navigation/header";
import "./globals.css";
import { QueryProvider } from "@/components/query-provider";
import { Body } from "@/components/body";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { SplashScreen } from "@/components/splash-screen";

export const dynamic = "force-dynamic";

const APP_TITLE = "Foldy.io";
const APP_DESCRIPTION = "Curating the best of the web";

export const metadata: Metadata = {
  title: APP_TITLE,
  manifest: "/manifest.json",
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_TITLE,
    startupImage: "/splash-screen.png",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_TITLE,
    title: APP_TITLE,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: APP_TITLE,
    description: APP_DESCRIPTION,
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#0849B5",
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
          <Suspense fallback={<SplashScreen />}>
            <Header />
            {children}
            <Toaster richColors />
          </Suspense>
        </Body>
      </QueryProvider>
    </html>
  );
}
