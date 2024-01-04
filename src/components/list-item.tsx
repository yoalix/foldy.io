import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

type ListItemProps = {
  id: number;
  title: string;
  subtitle: string;
  updated: string;
  href: string;
  icon: string;
};

export const ListItem = ({
  title,
  subtitle,
  updated,
  href,
  icon,
}: ListItemProps) => {
  return (
    <Button className="py-6" variant="ghost">
      <Link
        className="flex w-full items-center gap-3"
        href={href}
        target={href.includes("http") ? "_blank" : ""}
      >
        <img
          src={icon}
          alt="folder"
          width={24}
          height={24}
          className="h-[24px]"
        />
        <div className="flex flex-col w-full justify-start">
          <h1 className="text-sm">{title}</h1>
          <p className="text-black-secondary text-sm">{subtitle}</p>
        </div>
        <p className="text-black-secondary text-sm w-fit justify-self-end">
          {updated}
        </p>
      </Link>
    </Button>
  );
};
