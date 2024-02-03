import { CreateLink } from "@/components/folder/create-link";
import { FolderHeader } from "@/components/folder/folder-header";
import { FolderMenu } from "@/components/folder/folder-menu";
import { ProfileHeaderSkeleton } from "@/components/profile/profile-skeleton";
import { BackButton } from "@/components/ui/back-button";
import { UserAvatar } from "@/components/ui/user-avatar";
import { getFolder, getUserByUsername } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import { Suspense } from "react";

export default async function FolderLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: {
    username: string;
    folderId: string;
  };
}) {
  return (
    <div className="flex flex-col gap-3">
      <BackButton />

      <Suspense fallback={<ProfileHeaderSkeleton />}>
        <FolderHeader
          username={props.params.username}
          folderId={props.params.folderId}
        />
      </Suspense>

      <CreateLink folderId={props.params.folderId} />
      <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>
      {/* {props.children} */}
      {props.modal}
    </div>
  );
}
