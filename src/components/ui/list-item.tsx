import React from "react";
import Link from "next/link";
import { Button } from "./button";
import Image from "next/image";

type ListItemProps = {
  id: string;
  title: string;
  subtitle: string;
  rightText?: string | React.ReactNode;
  href: string;
  icon: React.ReactNode;
};

export const ListItem = ({
  title,
  subtitle,
  rightText,
  href,
  icon,
}: ListItemProps) => {
  return (
    <Button className="py-6 w-full" variant="ghost">
      <Link
        className="flex w-full items-center gap-3"
        href={href}
        target={href.includes("http") ? "_blank" : ""}
      >
        {icon}
        <div className="flex flex-col w-full text-left justify-start items-start  truncate">
          <h1 className="font-normal w-full truncate">{title}</h1>
          <p className="text-black-secondary  w-full truncate">{subtitle}</p>
        </div>
        {rightText && (
          <p className="text-black-secondary w-fit justify-self-end">
            {rightText}
          </p>
        )}
      </Link>
    </Button>
  );
};
