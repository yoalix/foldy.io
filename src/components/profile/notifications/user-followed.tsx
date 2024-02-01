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

export const UserFollowed = async ({ activityItem }: Props) => {
  const supabase = createClient(cookies());
  const user = await getUserProfile(supabase, activityItem.ownerId);

  return (
    <div className="border-b py-3">
      <Link href={`/${user?.username}`} className="flex items-center gap-3">
        <UserAvatar avatarUrl={user?.avatar_url} width={24} height={24} />
        <p className="inline-block">
          <b>{user?.full_name}</b> started following you{" "}
          {timeSince(new Date(activityItem.createdAt).getTime())} ago
        </p>
      </Link>
    </div>
  );
};
