import { EditFolder } from "@/components/folder/edit-folder";
import { getFolder, getUserByUsername } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import React from "react";

type Props = {
  params: {
    username: string;
    folderId: string;
  };
};

export default async function FolderEditModalPage({ params }: Props) {
  const supabase = createClient(cookies());
  const user = await getUserByUsername(supabase, params.username);
  const folder = await getFolder(supabase, params.folderId);

  return <EditFolder user={user} folder={folder} />;
}
