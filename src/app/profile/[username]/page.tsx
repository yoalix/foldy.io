import { Profile } from "@/components/profile/profile";
import React from "react";

type Params = {
  params: {
    username: string;
  };
};
export default function ProfilePage({ params }: Params) {
  let username: string | undefined = params?.username;
  console.log("username page", decodeURIComponent(username));
  if (decodeURIComponent(username) == "@me") {
    username = undefined;
  }
  return <Profile username={username} />;
}
