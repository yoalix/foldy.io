import React from "react";
import { ListItem } from "@/components/ui/list-item";
import { timeSince } from "@/lib/utils/strings";
import { getFolders } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

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
    <div className="flex flex-col ">
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
            icon="/icons/folder.png"
            href={`/${username}/folder/${folder.id}`}
            rightText={timeSince(updated) || "1 day ago"}
          />
        );
      })}
    </div>
  );
};
