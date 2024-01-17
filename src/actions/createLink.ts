"use server";

import { CreateLink, createLink } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const createLinkAction = async (data: CreateLink) => {
  const supabase = createClient(cookies());
  return createLink(supabase, data);
};
