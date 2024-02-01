import { Activity, getLink, getUserProfile } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import React from "react";
import Image from "next/image";
import { CreatedItem } from "./created-item";

type Props = {
  activityItem: Activity;
};

export const LinkCreated = async ({ activityItem }: Props) => {
  const supabase = createClient(cookies());
  const user = await getUserProfile(supabase, activityItem.ownerId);
  const link = await getLink(supabase, activityItem.subjectId);

  return (
    <CreatedItem
      avatarUrl={user?.avatar_url}
      fullName={user?.full_name}
      username={user?.username}
      folderName={link?.folder?.name}
      itemCreatedAt={activityItem.createdAt}
      itemId={link?.id}
      itemTitle={link?.name}
      itemSubtitle={link?.url || ""}
      itemHref={link?.url || ""}
      itemIcon={
        <Image
          src="/icons/link.png"
          alt={link?.name || ""}
          width={24}
          height={24}
        />
      }
      type="link"
    />
  );
};
