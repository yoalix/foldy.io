"use server";
import { deleteFolder } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const deleteFolderAction = async (folderId: string, userId: string) => {
  const supabase = createClient(cookies());
  await deleteFolder(supabase, folderId, userId);
};
