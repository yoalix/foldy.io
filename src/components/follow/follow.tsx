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
import { isFollowing } from "@/lib/utils/isFollowing";

type Props = {
  username: string;
  active: "following" | "followers";
};

export const Follow = async ({ username, active }: Props) => {
  const supabase = createClient(cookies());
  const userFollows = await getUserFollowsByUsername(supabase, username);
  const curentUser = await supabase.auth.getUser();
  const currentUserFollowing = await getUserFollowing(
    supabase,
    curentUser?.data.user?.id
  );

  return (
    <div>
      <BackButton />
      <Tabs defaultValue={active}>
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
                href={`/${user.profiles?.username}`}
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
                href={`/${user.profiles?.username}`}
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
