"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FolderMenu } from "./folder-menu";
import { CreateLink } from "./create-link";
import { LinksList } from "./links-list";
import { BackButton } from "../ui/back-button";
import { useGetProfile } from "@/hooks/queries/useGetProfile";
import Image from "next/image";
import { useGetFolder } from "@/hooks/queries/useGetFolder";

export const Folder = ({
  folderId,
  username,
}: {
  folderId: string;
  username: string;
}) => {
  const { data: user, isPending: isUserPending } = useGetProfile(username);
  const { data: folder, isPending: isFolderPending } = useGetFolder(folderId);
  if (isUserPending || isFolderPending) return <div>loading...</div>;
  if (!folder) return <div>folder not found</div>;
  return (
    <div className="flex flex-col gap-3 p-8">
      <BackButton />
      <div className="flex gap-3">
        <Avatar className="w-6 h-6">
          <AvatarImage src="/profile.png" asChild />
          <Image
            src={user?.avatar_url || ""}
            alt="avatar"
            width={24}
            height={24}
          />
          <AvatarFallback />
        </Avatar>
        <p className="text-black-secondary">@{user?.username}</p>
      </div>
      <div className="flex items-center gap-3 w-full">
        <img src="/icons/folder.png" width={40} />
        <div className="w-full">
          <h1 className="font-normal">{folder?.name}</h1>
          <p className="text-black-secondary">{folder?.links.length}</p>
        </div>
        <FolderMenu username={username} folderId={folderId} />
      </div>
      <p className="text-money ml-4">$0/mo. for followers of this folder</p>
      <p className="text-black-secondary ">
        {folder?.description || "No description"}
      </p>
      <CreateLink folderId={folder?.id} />
      <LinksList links={folder?.links} />
    </div>
  );
};
