import { Authentication } from "@/components/auth/authentication";
import { SplashScreen } from "@/components/splash-screen";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<SplashScreen />}>
      <main className="w-full h-full">
        <Authentication />
      </main>
    </Suspense>
  );
}
