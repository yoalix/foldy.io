import { CreateLink } from "@/components/folder/create-link";
import { FolderMenu } from "@/components/folder/folder-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackButton } from "@/components/ui/back-button";
import { getFolder, getUserByUsername } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function FolderLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: {
    username: string;
    folderId: string;
  };
}) {
  const supabase = createClient(cookies());
  const user = await getUserByUsername(supabase, props.params.username);
  const folder = await getFolder(supabase, props.params.folderId);

  return (
    <div className="flex flex-col gap-3 p-8">
      <BackButton />
      <div className="flex gap-3">
        <Avatar className="w-6 h-6">
          <AvatarImage src="/profile.png" asChild>
            <Image
              src={user?.avatar_url || ""}
              alt="avatar"
              width={24}
              height={24}
            />
          </AvatarImage>
          <AvatarFallback />
        </Avatar>
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
          username={props.params.username}
          folderId={props.params.folderId}
          linksLength={folder?.links.length}
        />
      </div>
      <p className="text-money ml-4">$0/mo. for followers of this folder</p>
      <p className="text-black-secondary ">
        {folder?.description || "No description"}
      </p>

      <CreateLink folderId={props.params.folderId} />
      {props.children}
      {props.modal}
    </div>
  );
}
