"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FolderMenu } from "./folder-menu";
import { CreateLink } from "./create-link";
import { LinksList } from "./links-list";
import { useRouter } from "next/router";
import { BackButton } from "../ui/back-button";
import { useGetProfile } from "@/hooks/queries/useGetProfile";
import Image from "next/image";

export const Folder = ({
  folderId,
  username,
}: {
  folderId: string;
  username?: string;
}) => {
  const { data } = useGetProfile(username);
  return (
    <div className="flex flex-col gap-3 p-8">
      <BackButton />
      <div className="flex gap-3">
        <Avatar className="w-6 h-6">
          <AvatarImage src="/profile.png" asChild />
          <Image
            src={data?.avatar_url || ""}
            alt="avatar"
            width={24}
            height={24}
          />
          <AvatarFallback />
        </Avatar>
        <p className="text-black-secondary">@{data?.username}</p>
      </div>
      <div className="flex items-center gap-3 w-full">
        <img src="/icons/folder.png" width={40} />
        <div className="w-full">
          <h1 className="font-normal">Raising Money</h1>
          <p className="text-black-secondary">143 Links</p>
        </div>
        <FolderMenu />
      </div>
      <p className="text-money ml-4">$0/mo. for followers of this folder</p>
      <p className="text-black-secondary ">
        This could be a description or instructions for a folder from the
        influencer or creator standpoint that has a bunch of followers on the
        platform.
      </p>
      <CreateLink />
      <LinksList />
    </div>
  );
};
