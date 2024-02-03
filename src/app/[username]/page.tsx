import { Profile } from "@/components/profile/profile";
import { ProfileHeaderSkeleton } from "@/components/profile/profile-skeleton";
import React, { Suspense } from "react";

type Params = {
  params: {
    username: string;
  };
};
export default function ProfilePage({ params }: Params) {
  return (
    <Suspense fallback={<ProfileHeaderSkeleton />}>
      <Profile username={params.username} />
    </Suspense>
  );
}
