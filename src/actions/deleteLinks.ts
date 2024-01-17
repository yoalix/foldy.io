"use server";

import { deleteLinks } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const deleteLinksAction = async (ids: string[]) => {
  const supabase = createClient(cookies());
  return deleteLinks(supabase, ids);
};
