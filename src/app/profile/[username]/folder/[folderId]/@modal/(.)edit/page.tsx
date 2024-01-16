import { EditFolder } from "@/components/folder/edit-folder";
import React from "react";

type Props = {
  params: {
    username: string;
    folderId: string;
  };
};

export default function FolderEditModalPage({ params }: Props) {
  return <EditFolder username={params.username} folderId={params.folderId} />;
}
