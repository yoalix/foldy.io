import { Profile } from "@/components/profile/profile";
import React from "react";

type Params = {
  params: {
    username: string;
  };
};
export default function ProfilePage({ params }: Params) {
  return <Profile username={params.username} />;
}
