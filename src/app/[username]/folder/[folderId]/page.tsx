import React, { Suspense } from "react";
import { Folder } from "@/components/folder";
type Params = {
  params: {
    folderId: string;
  };
};
export default function FolderPage({ params }: Params) {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse w-full flex justify-center py-5">
          <img src="/icons/logo.png" height={16} width={16} />
        </div>
      }
    >
      <Folder folderId={params.folderId} />
    </Suspense>
  );
}
