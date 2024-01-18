"use client";
import React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { useGetCurrentUser } from "@/hooks/queries/useGetCurrentUser";
import { useGetFolder } from "@/hooks/queries/useGetFolder";
import { deleteFolderAction } from "@/actions/deleteFolder";
import { useToast } from "../ui/use-toast";

type Props = {
  username: string;
  folderId: string;
};

export const DeleteFolder = ({ username, folderId }: Props) => {
  const { data: folder, isPending: isFolderPending } = useGetFolder(folderId);
  const { data: currentUser, isPending: isUserPending } = useGetCurrentUser();
  const { toast } = useToast();
  const router = useRouter();
  console.log({ folder, currentUser });
  if (!currentUser && !isFolderPending && !isUserPending)
    return redirect(`/auth`);
  const handleDelete = async () => {
    try {
      await deleteFolderAction(folderId, currentUser!.id);
      toast({ title: "Folder deleted" });
    } catch (error) {
      console.log(error);
      if (error instanceof Error && error.message) {
        toast({ title: error.message, variant: "destructive" });
      }
    }
    router.push(`/profile/${username}`);
    router.refresh();
  };

  const modalContent = (
    <form action={handleDelete} className="flex justify-center items-center">
      <Button
        type="submit"
        className="mt-8 border-urgent hover:bg-urgent-200"
        variant="outline"
      >
        <img src="/icons/trashred.png" alt="delete" width={24} />
        Delete Folder
      </Button>
    </form>
  );

  return (
    <Modal
      title={`Are you sure you want to delete Folder ${folder?.name}?`}
      content={modalContent}
      open={true}
    />
  );
};
