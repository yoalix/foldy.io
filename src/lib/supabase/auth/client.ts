import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../client";
export const getAuthSession = (client: SupabaseClient) => {
  return client.auth.getUser();
};

export const signInWithEmailAndPassword = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = createClient();
  return supabase.auth.signInWithPassword({ email, password });
};

export const signUpWithEmailAndPassword = async ({
  email,
  password,
  fullName,
  username,
}: {
  email: string;
  password: string;
  fullName: string;
  username: string;
}) => {
  const supabase = createClient();
  try {
    const user = await supabase
      .schema("public")
      .from("profiles")
      .select("*")
      .eq("email", email)
      .maybeSingle();
    // TODO: link emails or sign user in if email is already taken
    if (user.data) throw new Error("email already taken");
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, fullName },
        emailRedirectTo: `${location.origin}/auth/callback?next=/auth/verify-email`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const signInWithGoogle = () => {
  const supabase = createClient();
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `${location.origin}/auth/callback?next=/auth/signup/social`,
    },
  });
};

export const signOut = () => {
  const supabase = createClient();
  return supabase.auth.signOut();
};
