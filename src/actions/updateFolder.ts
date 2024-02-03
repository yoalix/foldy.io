"use server";
import { UpdateFolder, updateFolder } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const updateFolderAction = async (
  username: string,
  folder: UpdateFolder
) => {
  const supabase = createClient(cookies());
  await updateFolder(supabase, folder);
  revalidatePath(`/${username}/folders/${folder.id}`);
};
