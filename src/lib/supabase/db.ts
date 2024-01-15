import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import { supabase } from "./auth/client";

//-----------USER------------------
export type User = Database["public"]["Tables"]["profiles"]["Row"];

export const getUserProfile = async (
  supabase: SupabaseClient<Database>,
  uid?: string
) => {
  if (!uid) return null;
  return supabase
    .from("profiles")
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

export const getUserByUsername = async (
  supabase: SupabaseClient<Database>,
  username: string
) => {
  if (!username) return null;
  return supabase
    .from("profiles")

    .select("*, user_social_media(*)")
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
    .from("profiles")
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
  if (allFieldsUndefined) return null;
  return supabase
    .from("profiles")
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

// -----------User Social Media------------------
export const getUserSocials = async (
  supabase: SupabaseClient<Database>,
  uid?: string
) => {
  if (!uid) return null;
  return supabase
    .from("user_social_media")
    .select("*")
    .eq("user_id", uid)
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

export const createOrUpdateUserSocialMedia = async (
  supabase: SupabaseClient<Database>,
  { uid, provider, link }: { uid: string; provider: string; link: string }
) => {
  let socialId: number | undefined;
  const foundSocial = await supabase
    .from("user_social_media")
    .select("*")
    .eq("user_id", uid)
    .eq("provider", provider)
    .maybeSingle();
  if (foundSocial.data) {
    socialId = foundSocial.data.id;
  }

  if (!socialId) {
    const { data, error } = await supabase
      .from("user_social_media")
      .insert({ user_id: uid, provider, link });
    if (error) throw error;
    return data;
  }

  const { data, error } = await supabase
    .from("user_social_media")
    .upsert({ provider, link, user_id: uid }, { onConflict: "provider" })
    .eq("id", socialId);
  if (error) throw error;
  return data;
};

// -----------Folder------------------
export type Folder = Database["public"]["Tables"]["folders"]["Row"];

export const getFolders = async (
  supabase: SupabaseClient<Database>,
  uid?: string
) => {
  if (!uid) return null;
  return supabase
    .from("folders")
    .select("*, links(*)")
    .eq("user_id", uid)
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

export const getFolder = async (
  supabase: SupabaseClient<Database>,
  folderId?: string
) => {
  if (!folderId) return null;
  return supabase
    .from("folders")
    .select("*, links(*)")
    .eq("id", folderId)
    .single()
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

export type CreateFolder = {
  userId: string;
  name: string;
  description?: string;
};

export const createFolder = async (
  supabase: SupabaseClient<Database>,
  { userId, name, description }: CreateFolder
) => {
  const { data, error } = await supabase
    .from("folders")
    .insert({ user_id: userId, name, description });
  if (error) throw error;
  return data;
};
// -----------Links------------------

export type Link = Database["public"]["Tables"]["links"]["Row"];

export const getLinks = async (
  supabase: SupabaseClient<Database>,
  folderId?: string
) => {
  if (!folderId) return null;
  return supabase
    .from("links")
    .select("*")
    .eq("folder_id", folderId)
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

export type CreateLink = {
  folderId: string;
  name?: string;
  url: string;
};

export const createLink = async (
  supabase: SupabaseClient<Database>,
  { folderId, name, url }: CreateLink
) => {
  const { data, error } = await supabase
    .from("links")
    .insert({ folder_id: folderId, name, url });
  if (error) throw error;
  return data;
};
