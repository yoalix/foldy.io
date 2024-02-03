import React from "react";
import { UserAvatar } from "../ui/user-avatar";
import { FolderMenu } from "./folder-menu";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { getUserByUsername, getFolder } from "@/lib/supabase/db";
import { cookies } from "next/headers";

type Props = {
  username: string;
  folderId: string;
};

export const FolderHeader = async ({ username, folderId }: Props) => {
  const supabase = createClient(cookies());
  const user = await getUserByUsername(supabase, username);
  const folder = await getFolder(supabase, folderId);
  return (
    <>
      <div className="flex gap-3">
        <UserAvatar
          className="w-6 h-6"
          avatarUrl={user?.avatar_url}
          fullName={user?.full_name}
          width={24}
          height={24}
        />
        <p className="text-black-secondary">@{user?.username}</p>
      </div>
      <div className="flex items-center gap-3 w-full">
        <Image
          src="/icons/folder.png"
          alt="folder-image"
          width={40}
          height={40}
        />
        <div className="w-full">
          <h1 className="font-normal">{folder?.name}</h1>
          <p className="text-black-secondary">
            {folder?.links.length}{" "}
            {folder?.links?.length === undefined || folder.links.length > 1
              ? "links"
              : "link"}
          </p>
        </div>
        <FolderMenu
          username={username}
          folderId={folderId}
          linksLength={folder?.links.length}
        />
      </div>
      <p className="text-money ml-4">$0/mo. for followers of this folder</p>
      <p className="text-black-secondary ">
        {folder?.description || "No description"}
      </p>
    </>
  );
};
