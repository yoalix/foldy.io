"use server";

import { UserFollow, unfollowUser } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const unfollowUserAction = async (data: UserFollow) => {
  const supabase = createClient(cookies());
  return unfollowUser(supabase, data);
};
