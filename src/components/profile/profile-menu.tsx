import React from "react";
import { User } from "@/components/icons/user";
import { Moneybag } from "@/components/icons/moneybag";
import { ForwardArrow } from "@/components/icons/forward-arrow";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import Link from "next/link";

export const ProfileMenu = () => {
  const menuOptions = [
    {
      name: "Edit Profile",
      icon: <User />,
      link: "/profile/edit",
    },
    {
      name: "Subscriptions (coming soon)",
      icon: <Moneybag />,
      disabled: true,
      link: "/subsriptions",
    },
    {
      name: "Share Profile (coming soon)",
      icon: <ForwardArrow />,
      link: "/share",
      disabled: true,
    },
  ];
  const modalTrigger = (
    <Button variant="ghost" size="icon" className="opacity-50">
      <MoreHorizontal />
    </Button>
  );

  const modalContent = (
    <div className="flex flex-col gap-4 p-4">
      {menuOptions.map((option, i) => {
        const button = (
          <Button
            key={`${i}-menu-icon-${option.name}`}
            className="flex gap-2 justify-start w-full"
            variant="ghost"
            disabled={option.disabled}
          >
            {option.icon}
            <p className={`${option.disabled ? " text-black-secondary" : ""}`}>
              {option.name}
            </p>
          </Button>
        );
        return option.disabled ? (
          button
        ) : (
          <Link
            href={option.link}
            key={`${i}-menu-icon-${option.name}`}
            className="flex gap-2"
          >
            {button}
          </Link>
        );
      })}
    </div>
  );

  return (
    <Modal title="Profile Menu" trigger={modalTrigger} content={modalContent} />
  );
};
