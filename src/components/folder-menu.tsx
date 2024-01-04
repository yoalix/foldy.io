import React from "react";
import { User } from "./icons/user";
import { Moneybag } from "./icons/moneybag";
import { ForwardArrow } from "./icons/forward-arrow";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Modal } from "./ui/modal";

export const FolderMenu = () => {
  const menuOptions = [
    {
      name: "Edit Description of Profile",
      icon: <User />,
      link: "/folder/edit",
    },
    {
      name: "Subscriptions (coming soon)",
      icon: <Moneybag />,
      disabled: true,
      link: "/subsriptions",
    },
    {
      name: "Edit Links",
      icon: <ForwardArrow />,
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
      icon: <ForwardArrow />,
      link: "/folder/delete",
      disabled: true,
    },
  ];
  const modalTrigger = (
    <Button variant="ghost" size="icon" className="opacity-50">
      <MoreHorizontal />
    </Button>
  );

  const ModalContent = () => (
    <div className="flex flex-col gap-4 p-4">
      {menuOptions.map((option, i) => (
        <div key={`${i}-menu-icon-${option.name}`} className="flex gap-2">
          {option.icon}
          <p className={`${option.disabled ? "text-black-secondary" : ""}`}>
            {option.name}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <Modal
      title="Profile Menu"
      trigger={modalTrigger}
      content={<ModalContent />}
    />
  );
};
