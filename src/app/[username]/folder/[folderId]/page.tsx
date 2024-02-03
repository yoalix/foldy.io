import React, { Suspense } from "react";
import { Folder } from "@/components/folder";
import { LogoLoading } from "@/components/ui/logo-loading";
type Params = {
  params: {
    folderId: string;
  };
};
export default function FolderPage({ params }: Params) {
  return (
    <Suspense fallback={<LogoLoading />}>
      <Folder folderId={params.folderId} />
    </Suspense>
  );
}
