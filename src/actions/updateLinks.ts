"use server";

import { UpdateLink, upsertLinks } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const updateLinksAction = async (data: UpdateLink[]) => {
  const supabase = createClient(cookies());
  return upsertLinks(supabase, data);
};
