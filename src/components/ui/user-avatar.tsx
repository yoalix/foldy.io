import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Image from "next/image";
type Props = {
  avatarUrl?: string | null;
  fullName?: string;
  className?: string;
  width: number;
  height: number;
};

export const UserAvatar = ({
  avatarUrl,
  fullName,
  className,
  width,
  height,
}: Props) => {
  const initial =
    fullName &&
    fullName
      .split(" ")
      .map((name) => name[0])
      .join("");

  return (
    <Avatar className={className}>
      {avatarUrl != null && (
        <AvatarImage src={"/profile.png"} asChild>
          <Image
            src={avatarUrl}
            alt="avatar"
            width={width}
            height={height}
            priority
          />
        </AvatarImage>
      )}
      <AvatarFallback>{initial}</AvatarFallback>
    </Avatar>
  );
};
