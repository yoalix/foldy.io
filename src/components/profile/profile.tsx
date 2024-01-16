"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FolderList } from "./folder-list";
import { TwitterX } from "@/components/icons/twitter-x";
import { Instagram } from "@/components/icons/instagram";
import { TikTok } from "@/components/icons/tiktok";
import { Dot, MoreHorizontal } from "lucide-react";
import { ProfileMenu } from "./profile-menu";
import { CreateFolder } from "./create-folder";
import { useGetCurrentUser } from "@/hooks/queries/useGetCurrentUser";
import { useGetUserById } from "@/hooks/queries/useGetUserById";
import { useGetUserByUsername } from "@/hooks/queries/useGetUserByUsername";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useGetProfile } from "@/hooks/queries/useGetProfile";
import Image from "next/image";
import { useGetUserSocials } from "@/hooks/queries/useGetUserSocials";
type Props = {
  username?: string;
};
const SocialIcons = {
  twitter: <TwitterX />,
  instagram: <Instagram />,
  tiktok: <TikTok />,
};

export const Profile = ({ username }: Props) => {
  const { data: currentUser } = useGetCurrentUser();
  const { data: user, isError } = useGetProfile(username);
  const { data: userSocials } = useGetUserSocials(user?.id || "");
  const { toast } = useToast();
  const isCurrentUser = currentUser?.id === user?.id;

  if (isError) {
    toast({
      title: "Error",
      description: "Could not find user",
    });
  }
  if (!user) return <div>profile not found</div>;
  return (
    <div className="flex flex-col gap-5 p-10">
      <div className="flex w-full items-center">
        <Link href="/profile/edit">
          <Avatar className="w-16 h-16">
            <AvatarImage src={user?.avatar_url || ""} asChild>
              <Image
                src={user?.avatar_url || ""}
                alt="avatar"
                width={64}
                height={64}
              />
            </AvatarImage>
            <AvatarFallback />
          </Avatar>
        </Link>
        <div className={"flex flex-col w-full justify-center ml-8"}>
          <h1 className="font-normal">{user?.full_name}</h1>
          <p className="text-black-secondary">@{user?.username}</p>
        </div>
        <ProfileMenu />
      </div>
      <div>
        <h1 className="flex font-normal">
          162 Followers <Dot /> 21 Following
        </h1>
        <p className="text-black-secondary ">{user?.bio || "No bio yet"}</p>
        <div className="flex gap-3 items-center">
          {userSocials?.map((social) => (
            <Button
              key={`social-${social.provider}`}
              className="w-min h-min rounded-lg"
              variant="outline"
              size="icon"
              asChild
            >
              <a key={social.provider} href={social.link} target="_blank">
                {SocialIcons[social.provider as keyof typeof SocialIcons] ||
                  social.provider}
              </a>
            </Button>
          ))}
          <Button className="text-black h-9 px-1" variant="link" size="sm">
            foldy.io/{user?.username}
          </Button>
        </div>
        {isCurrentUser ? (
          <CreateFolder userId={user.id} />
        ) : (
          <Button className="my-3 w-[180px]">Follow</Button>
        )}
      </div>
      <FolderList username={user?.username} userId={user?.id} />
    </div>
  );
};
