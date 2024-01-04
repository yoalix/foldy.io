import React from "react";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

type ModalProps = {
  trigger: React.ReactNode;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  content: React.ReactNode;
};
export const Modal = ({ trigger, title, description, content }: ModalProps) => {
  const breakpoint = useBreakpoints();

  return breakpoint === "sm" ? (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="px-3">
          {title && (
            <DrawerHeader>
              {title && <DrawerTitle>{title}</DrawerTitle>}
              {description && (
                <DrawerDescription>{description}</DrawerDescription>
              )}
            </DrawerHeader>
          )}
        <div className="flex flex-col px-3 ">
          {content}
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <div className="flex flex-col px-3 gap-3">
          {title && (
            <DialogHeader>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          )}
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
};
