import { Button } from "@/components/ui/button";
import { ListItem } from "@/components/ui/list-item";
import { UserAvatar } from "@/components/ui/user-avatar";
import { timeSince } from "@/lib/utils/date";
import { Dot } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  avatarUrl?: string | null;
  fullName?: string;
  username?: string;
  folderName?: string;
  itemId?: string;
  itemTitle?: string | null;
  itemSubtitle: string;
  itemHref: string;
  itemIcon: React.ReactNode;
  itemCreatedAt: string;
  type: "link" | "folder";
};

export const CreatedItem = async ({
  avatarUrl,
  fullName,
  username,
  folderName,
  itemCreatedAt,
  itemId,
  itemTitle,
  itemSubtitle,
  itemHref,
  itemIcon,
  type,
}: Props) => {
  return (
    <div className="pt-3 border-b w-full truncate">
      <div className="flex items-center text-black-secondary">
        <UserAvatar avatarUrl={avatarUrl} width={24} height={24} />
        <Button className="text-black-secondary px-0 ml-3" variant={"link"}>
          <Link href={`/${username}`}>{fullName}</Link>
        </Button>
        <Dot />
        <p>{timeSince(new Date(itemCreatedAt).getTime())}</p>
      </div>
      <p className="mt-3">
        {type === "folder" ? "New Folder:" : "New Link in Folder:"} &quot;
        {folderName}&quot;
      </p>
      <ListItem
        id={itemId || ""}
        title={itemTitle || ""}
        subtitle={itemSubtitle}
        href={itemHref}
        icon={itemIcon}
      />
    </div>
  );
};
