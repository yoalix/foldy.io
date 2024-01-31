import { DeleteFolder } from "@/components/folder/delete-folder";
import React from "react";

type Props = {
  params: {
    username: string;
    folderId: string;
  };
};

export default function FolderDeleteModalPage({ params }: Props) {
  return <DeleteFolder username={params.username} folderId={params.folderId} />;
}
