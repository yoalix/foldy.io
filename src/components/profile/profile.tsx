import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FolderList } from "./folder-list";
import { TwitterX } from "@/components/icons/twitter-x";
import { Instagram } from "@/components/icons/instagram";
import { TikTok } from "@/components/icons/tiktok";
import { Dot } from "lucide-react";
import { ProfileMenu } from "./profile-menu";
import { CreateFolder } from "./create-folder";
import Link from "next/link";
import Image from "next/image";
import { getUserByUsername, getUserSocials } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/supabase/auth/server";
type Props = {
  username?: string;
};
const SocialIcons = {
  twitter: <TwitterX />,
  instagram: <Instagram />,
  tiktok: <TikTok />,
};

export const Profile = async ({ username }: Props) => {
  const supabase = createClient(cookies());
  const { data: currentUser } = await getCurrentUser();
  const user = await getUserByUsername(supabase, username || "");
  const userSocials = await getUserSocials(supabase, user?.id || "");
  if (!user) return <div>profile not found</div>;
  const isCurrentUser = currentUser?.user?.id === user?.id;

  return (
    <div className="flex flex-col gap-5 p-10">
      <div className="flex w-full items-center">
        <Link href="/profile/edit">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/profile.png" asChild>
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
