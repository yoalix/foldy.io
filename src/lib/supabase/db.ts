import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import { supabase } from "./auth/client";

export const getUserProfile = async (
  supabase: SupabaseClient<Database>,
  uid?: string
) => {
  if (!uid) throw new Error("No uid provided");
  return supabase
    .from("profile")
    .select("*")
    .eq("id", uid)
    .single()
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

export async function checkUsername(
  supabase: SupabaseClient<Database>,
  username: string
): Promise<boolean> {
  try {
    const user = await getUserByUsername(supabase, username);
    if (user) {
      return true;
    }
    return false;
  } catch {
    return true;
  }
}

export const getUserByUsername = (
  supabase: SupabaseClient<Database>,
  username: string
) => {
  return supabase
    .from("profile")
    .select("*")
    .eq("username", username)
    .maybeSingle()
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};
export type CreateUser = {
  id: string;
  email: string;
  fullName: string;
  username: string;
  avatarUrl?: string;
};

export const createUser = async (
  supabase: SupabaseClient<Database>,
  { fullName: full_name, avatarUrl: avatar_url, ...user }: CreateUser
) => {
  console.log("createUser", user);
  return supabase
    .from("profile")
    .insert({ ...user, full_name, avatar_url })
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};
