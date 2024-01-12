import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../client";
import { APP_URL } from "@/lib/consts";
export const supabase = createClient();
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
      .from("profile")
      .select("*")
      .eq("email", email)
      .maybeSingle();
    // TODO: link emails or sign user in if email is already taken
    if (user) throw new Error("email already taken");
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, fullName },
        emailRedirectTo: `${APP_URL}/auth/callback`,
      },
    });
    console.log("sign up res", res);
  } catch (error) {
    throw error;
  }
};

export const signInWithGoogle = async () => {
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
  console.log("signout");
  return supabase.auth.signOut();
};
