import { Profile } from "@/components/profile";
import { Authentication } from "@/components/auth/authentication";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const session = await supabase.auth.getSession();
  if (session.data.session?.user) {
    redirect("/profile/@me");
  }
  return (
    <main className="w-full h-full">
      <Authentication />
    </main>
  );
}
