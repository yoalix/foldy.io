import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserFollow,
  getUserFollowing,
  getUserFollowsByUsername,
} from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { BackButton } from "../ui/back-button";
import { FollowItem } from "./followItem";

type Props = {
  username: string;
  active: "following" | "followers";
};

function isFollowing(userId: string, following: UserFollow[] | null) {
  if (!following) return false;
  return following.some((user) => user.following_id === userId);
}

export const Follow = async ({ username, active }: Props) => {
  const supabase = createClient(cookies());
  const userFollows = await getUserFollowsByUsername(supabase, username);
  const curentUser = await supabase.auth.getUser();
  const currentUserFollowing = await getUserFollowing(
    supabase,
    curentUser?.data.user?.id
  );

  return (
    <div className="p-10">
      <BackButton />
      <Tabs defaultValue={active} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="followers">Followers</TabsTrigger>
        </TabsList>
        <TabsContent value="following">
          <div>
            {userFollows?.following.map((user) => (
              <FollowItem
                key={user.profiles?.username}
                currentUserId={curentUser?.data.user?.id || ""}
                userId={user.profiles?.id || ""}
                fullName={user.profiles?.full_name || ""}
                username={user.profiles?.username || ""}
                href={`/profile/${user.profiles?.username}`}
                avatarUrl={user.profiles?.avatar_url || ""}
                buttonText={
                  isFollowing(user.profiles?.id || "", currentUserFollowing)
                    ? "following"
                    : "follow"
                }
                accent="primary"
                disableButton={user.profiles?.id === curentUser?.data.user?.id}
                currentPage={active}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="followers">
          <div>
            {userFollows?.followers.map((user) => (
              <FollowItem
                key={user.profiles?.username}
                currentUserId={curentUser?.data.user?.id || ""}
                userId={user.profiles?.id || ""}
                fullName={user.profiles?.full_name || ""}
                username={user.profiles?.username || ""}
                href={`/profile/${user.profiles?.username}`}
                avatarUrl={user.profiles?.avatar_url}
                buttonText={
                  isFollowing(user.profiles?.id || "", currentUserFollowing)
                    ? "following"
                    : "follow"
                }
                accent="primary"
                disableButton={user.profiles?.id === curentUser?.data.user?.id}
                currentPage={active}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
