import React from "react";
import { Folder } from "@/components/folder";
type Params = {
  params: {
    folderId: string;
    username: string;
  };
};
export default function FolderPage({ params }: Params) {
  let username: string | undefined = params?.username;
  if (decodeURIComponent(username) == "@me") {
    username = undefined;
  }
  return (
    <main>
      <Folder folderId={params.folderId} />
    </main>
  );
}
