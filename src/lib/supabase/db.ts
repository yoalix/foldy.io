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
  full_name: string;
  username: string;
  avatar_url?: string;
};

export const createUser = async (
  supabase: SupabaseClient<Database>,
  user: CreateUser
) => {
  return supabase
    .from("profile")
    .insert({ ...user })
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

export type UpdateUser = Partial<CreateUser> & { bio?: string; id: string };

export const updateUser = async (
  supabase: SupabaseClient<Database>,
  { id, ...user }: UpdateUser
) => {
  if (!id) throw new Error("No id provided");
  const allFieldsUndefined = Object.values(user).every(
    (value) => value === undefined
  );
  if (allFieldsUndefined) return;
  return supabase
    .from("profile")
    .update({ ...user })
    .eq("id", id)
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

export const uploadAvatar = async (
  supabase: SupabaseClient<Database>,
  file: Blob | File,
  uid: string
) => {
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(`avatars/${uid}`, file, { upsert: true });
  if (error) throw error;
  return data;
};

export const getAvatarUrl = async (
  supabase: SupabaseClient<Database>,
  path: string
) => {
  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  if (!data) throw new Error("No data");
  return data;
};
