"use server";
import { createClient as createServerClient } from "../server";
import { cookies, headers } from "next/headers";

export const signOut = async () => {
  const supabase = createServerClient(cookies());
  return supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  const supabase = createServerClient(cookies());
  return supabase.auth.getUser().then(({ data, error }) => {
    if (error) throw error;
    return data;
  });
};
