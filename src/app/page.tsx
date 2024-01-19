import { Authentication } from "@/components/auth/authentication";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/supabase/db";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    const user = await getUserProfile(supabase, session.user.id);
    redirect(`/profile/${user!.username}`);
  }
  return (
    <main className="w-full h-full">
      <Authentication />
    </main>
  );
}
