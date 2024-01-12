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
type Props = {
  username?: string;
};
export const Profile = ({ username }: Props) => {
  const { data, isError } = username
    ? useGetUserByUsername(username)
    : useGetCurrentUser();
  const { toast } = useToast();
  console.log("data", data?.data);
  const socials = [
    {
      name: "Twitter",
      link: "https://twitter.com/joeyj",
      icon: <TwitterX />,
    },
    {
      name: "Instagram",
      link: "https://instagram.com/joeyj",
      icon: <Instagram />,
    },
    {
      name: "TikTok",
      link: "https://facebook.com/joeyj",
      icon: <TikTok />,
    },
  ];
  if (isError) {
    toast({
      title: "Error",
      description: "Could not find user",
    });
  }
  return (
    <div className="flex flex-col gap-5 p-10">
      <div className="flex w-full items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={data?.avatar_url || ""} />
          <AvatarFallback />
        </Avatar>
        <div className="flex flex-col w-full justify-center">
          <h1 className="text-sm">{data?.full_name}</h1>
          <p className="text-sm text-black-secondary">@{data?.username}</p>
        </div>
        <ProfileMenu />
      </div>
      <div>
        <h1 className="flex text-sm">
          162 Followers <Dot /> 21 Following
        </h1>
        <p className="text-black-secondary text-sm">
          {data?.bio || "No bio yet"}
        </p>
        <div className="flex gap-3 items-center">
          {socials.map((social) => (
            <Button
              key={`social-${social.name}`}
              className="w-min h-min rounded-lg"
              variant="outline"
              size="icon"
              asChild
            >
              <a key={social.name} href={social.link}>
                {social.icon || social.name}
              </a>
            </Button>
          ))}
          <Button className="text-black h-9 px-1" variant="link" size="sm">
            foldy.io/@{data?.username}
          </Button>
        </div>
        {!username ? (
          <CreateFolder />
        ) : (
          <Button className="my-3 w-[180px]">Follow</Button>
        )}
      </div>
      <FolderList />
    </div>
  );
};
