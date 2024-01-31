import React from "react";
import { Folder } from "@/components/folder";
type Params = {
  params: {
    folderId: string;
  };
};
export default function FolderPage({ params }: Params) {
  return <Folder folderId={params.folderId} />;
}
