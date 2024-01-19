"use server";

import { UserFollow, followUser } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const followUserAction = async (data: UserFollow) => {
  const supabase = createClient(cookies());
  return followUser(supabase, data);
};
