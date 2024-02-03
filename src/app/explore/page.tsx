import { Explore } from "@/components/explore/explore";
import { LogoLoading } from "@/components/ui/logo-loading";
import React, { Suspense } from "react";

export default function ExplorePage() {
  return (
    <Suspense fallback={<LogoLoading />}>
      <Explore />
    </Suspense>
  );
}
