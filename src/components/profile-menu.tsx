import React from "react";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { User } from "./icons/user";
import { Moneybag } from "./icons/moneybag";
import { ForwardArrow } from "./icons/forward-arrow";
import { MoreHorizontal } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export const ProfileMenu = () => {
  const breakpoint = useBreakpoints();
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

  return breakpoint === "sm" ? (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="opacity-50">
          <MoreHorizontal />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col px-3 ">
          <DrawerHeader>
            <DrawerTitle>Profile Menu</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-4 p-4">
            {menuOptions.map((option, i) => (
              <div key={`${i}-menu-icon-${option.name}`} className="flex gap-2">
                {option.icon}
                <p
                  className={`${option.disabled ? "text-black-secondary" : ""}`}
                >
                  {option.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="opacity-50">
          <MoreHorizontal />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col px-3 ">
          <DialogHeader>
            <DialogTitle>Profile Menu</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 p-4">
            {menuOptions.map((option, i) => (
              <div key={`${i}-menu-icon-${option.name}`} className="flex gap-2">
                {option.icon}
                <p
                  className={`${option.disabled ? "text-black-secondary" : ""}`}
                >
                  {option.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
