import { Profile } from "@/components/profile";
import { Authentication } from "@/components/auth/authentication";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/supabase/db";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const session = await supabase.auth.getSession();

  if (session.data.session?.user) {
    const user = await getUserProfile(supabase, session.data.session.user.id);
    redirect(`/profile/${user!.username}`);
  }
  return (
    <main className="w-full h-full">
      <Authentication />
    </main>
  );
}
