import React from "react";
import Link from "next/link";
import { Button } from "./button";

type ListItemProps = {
  id: string;
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
        <img src={icon} alt="folder" width={24} height={24} />
        <div className="flex flex-col w-full justify-start items-start">
          <h1 className="font-normal">{title}</h1>
          <p className="text-black-secondary ">{subtitle}</p>
        </div>
        <p className="text-black-secondary w-fit justify-self-end">{updated}</p>
      </Link>
    </Button>
  );
};
