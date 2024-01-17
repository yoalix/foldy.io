import { EditLinks } from "@/components/folder/edit-links";
import { getLinks } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import React from "react";

export default async function EditLinksPage({
  params,
}: {
  params: { folderId: string; username: string };
}) {
  const supabase = createClient(cookies());
  const links = await getLinks(supabase, params.folderId);

  return (
    <EditLinks
      username={params.username}
      folderId={params.folderId}
      links={links}
    />
  );
}
