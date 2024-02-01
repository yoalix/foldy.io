import React from "react";
import { ListItem } from "@/components/ui/list-item";
import { timeSince } from "@/lib/utils/date";
import { getFolders } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Folder } from "lucide-react";

export const FolderList = async ({
  username,
  userId,
}: {
  username?: string;
  userId: string;
}) => {
  const supabase = createClient(cookies());
  const folders = await getFolders(supabase, userId);
  return (
    <>
      {folders?.map((folder, i) => {
        const numberOfLinks = folder?.links?.length || 0;
        const updated = Math.max(
          new Date(folder.created_at).getTime(),
          ...folder.links.map((l) => new Date(l.updated_at).getTime())
        );
        return (
          <ListItem
            key={`folder-${folder.id}-${folder.name}`}
            id={folder.id}
            title={folder.name}
            subtitle={`${numberOfLinks} links`}
            icon={<Folder className="w-5 h-5 flex-shrink-0" />}
            href={`/${username}/folder/${folder.id}`}
            rightText={timeSince(updated) || "1 day ago"}
          />
        );
      })}
    </>
  );
};
