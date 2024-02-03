import { Button } from "@/components/ui/button";
import { ListItem } from "@/components/ui/list-item";
import { UserAvatar } from "@/components/ui/user-avatar";
import {
  Activity,
  getFolder,
  getLink,
  getUserProfile,
} from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { timeSince } from "@/lib/utils/date";
import { Dot, Folder } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { CreatedItem } from "./created-item";

type Props = {
  activityItem: Activity;
};

export const FolderCreated = async ({ activityItem }: Props) => {
  const supabase = createClient(cookies());
  const user = await getUserProfile(supabase, activityItem.ownerId);
  const folder = await getFolder(supabase, activityItem.subjectId);

  return (
    <CreatedItem
      avatarUrl={user?.avatar_url}
      fullName={user?.full_name}
      username={user?.username}
      folderName={folder?.name}
      itemCreatedAt={activityItem.createdAt}
      itemId={folder?.id}
      itemTitle={folder?.name}
      itemSubtitle={""}
      itemHref={`/${user?.username}/folder/${folder?.id}`}
      itemIcon={<Folder size={24} width={24} height={24} strokeWidth={1.3} />}
      type="folder"
    />
  );
};
