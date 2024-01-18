import React from "react";
import { LinksList } from "./links-list";
import { getFolder } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const Folder = async ({ folderId }: { folderId: string }) => {
  const supabase = createClient(cookies());
  const folder = await getFolder(supabase, folderId);
  if (!folder) return <div>folder not found</div>;
  return (
    <div className="flex flex-col gap-3">
      <LinksList links={folder?.links} />
    </div>
  );
};
