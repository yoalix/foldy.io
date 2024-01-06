import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <Button variant="ghost">
      <Link className="flex w-full items-center gap-3" href={href}>
        <img
          src={icon}
          alt="folder"
          width={24}
          height={24}
          className="h-[24px]"
        />
        <div className="flex-1">
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
