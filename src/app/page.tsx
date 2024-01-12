import { Profile } from "@/components/profile";
import { Authentication } from "@/components/auth/authentication";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const session = await supabase.auth.getSession();
  return (
    <main className="w-full h-full">
      {session.data.session?.user ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      ) : (
        <Authentication />
      )}
    </main>
  );
}
