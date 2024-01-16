import React, { useState } from "react";
import { User } from "@/components/icons/user";
import { Moneybag } from "@/components/icons/moneybag";
import { ForwardArrow } from "@/components/icons/forward-arrow";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import Link from "next/link";
import { Create } from "../icons/create";

export const FolderMenu = ({
  username,
  folderId,
}: {
  username: string;
  folderId: string;
}) => {
  const [open, setOpen] = useState(false);
  const menuOptions = [
    {
      name: "Edit Description of Folder",
      icon: <User />,
      link: `/profile/${username}/folder/${folderId}/edit`,
    },
    {
      name: "Subscriptions (coming soon)",
      icon: <Moneybag />,
      disabled: true,
      link: "/subsriptions",
    },
    {
      name: "Edit Links",
      // icon: null,
      icon: <Create />,
      link: "/share",
    },
    {
      name: "Share Profile (coming soon)",
      icon: <ForwardArrow />,
      link: "/share",
      disabled: true,
    },
    {
      name: "Delete Folder",
      icon: <img src="/icons/trashred.png" alt="delete" width={24} />,
      link: "/folder/delete",
      disabled: true,
    },
  ];
  const modalTrigger = (
    <Button
      variant="ghost"
      size="icon"
      className="opacity-50"
      onClick={() => setOpen(true)}
    >
      <MoreHorizontal />
    </Button>
  );

  const modalContent = (
    <div className="flex flex-col gap-4 p-4">
      {menuOptions.map((option, i) => {
        const button = (
          <Button
            key={`${i}-menu-icon-${option.name}`}
            className={`flex gap-2 w-full justify-start${
              option.disabled ? " cursor-not-allowed" : ""
            }`}
            variant="ghost"
            disabled={option.disabled}
            onClick={() => setOpen(false)}
          >
            {option.icon}
            <p className={`${option.disabled ? "text-black-secondary" : ""}`}>
              {option.name}
            </p>
          </Button>
        );
        return option.disabled ? (
          button
        ) : (
          <Link key={`${i}-menu-icon-${option.name}`} href={option.link}>
            {button}
          </Link>
        );
      })}
    </div>
  );

  return (
    <Modal
      title="Folder Menu"
      trigger={modalTrigger}
      content={modalContent}
      open={open}
      onOpenChange={setOpen}
    />
  );
};
