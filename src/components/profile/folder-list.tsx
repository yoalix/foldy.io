"use client";
import React from "react";
import { ListItem } from "@/components/ui/list-item";
import { useGetFolders } from "@/hooks/queries/useGetFolders";
import { timeSince } from "@/lib/strings";

export const FolderList = ({
  username,
  userId,
}: {
  username?: string;
  userId: string;
}) => {
  const { data: folders } = useGetFolders(userId);
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
            href={`/profile/${username || "@me"}/folder/${folder.id}`}
            updated={timeSince(updated) || "1 day ago"}
          />
        );
      })}
    </div>
  );
};
