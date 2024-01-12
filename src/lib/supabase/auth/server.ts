"use server";
import { APP_URL } from "@/lib/consts";
import { createClient as createServerClient } from "../server";
import { cookies, headers } from "next/headers";
export const signInWithGoogle = async () => {
  const supabase = createServerClient(cookies());

  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },

      redirectTo: `${APP_URL}/auth/callback`,
    },
  });
};

export const signOut = async () => {
  const supabase = createServerClient(cookies());
  return supabase.auth.signOut();
};
