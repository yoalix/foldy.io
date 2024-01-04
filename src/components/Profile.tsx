"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { FolderList } from "./folder-list";
import { TwitterX } from "./icons/twitter-x";
import { Instagram } from "./icons/instagram";
import { TikTok } from "./icons/tiktok";
import { Dot, MoreHorizontal } from "lucide-react";
import { ProfileMenu } from "./profile-menu";
import { CreateFolder } from "./create-folder";

export const Profile = () => {
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
    const isCurrentUser = true;
    return (
    <div className="flex flex-col gap-5 p-10">
      <div className="flex w-full items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src="/profile.png" />
          <AvatarFallback />
        </Avatar>
        <div className="flex flex-col w-full justify-center">
          <h1 className="text-sm">Joe Jamison</h1>{" "}
          <p className="text-sm text-black-secondary">@joeyj</p>
        </div>
        <ProfileMenu />
      </div>
      <div>
        <h1 className="flex">
          162 Followers <Dot /> 21 Following
        </h1>
        <p className="text-black-secondary text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum. Vulputate dis sapien laoreet duis at. Enim consequat urna
          urna porttitor sit egestaas ac vlutpat. Ut fusce Vacilsis
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
            foldy.io/joeyj
          </Button>
        </div>
        {isCurrentUser ?  <CreateFolder/>: <Button className="my-3 w-[180px]">Follow</Button> }
      </div>
      <FolderList />
    </div >
  );
};
