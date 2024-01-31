import { Follow } from "@/components/follow/follow";
import { Profile } from "@/components/profile/profile";
import React from "react";

type Params = {
  params: {
    username: string;
  };
};
export default function FollowersPage({ params }: Params) {
  return <Follow username={params.username} active="followers" />;
}
