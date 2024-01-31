import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { FolderList } from "./folder-list";
import { User, getUserFollowsByUsername } from "@/lib/supabase/db";
import { CreateFolder } from "./create-folder";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { UserAvatar } from "../ui/user-avatar";
import { Button } from "../ui/button";
import Link from "next/link";

export const FoldersListNav = async ({ user }: { user: User }) => {
  const supabase = createClient(cookies());
  const userFollows = await getUserFollowsByUsername(supabase, user.username);
  return (
    <Tabs defaultValue="me">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="me">Your Account</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>
      <TabsContent value="me">
        <CreateFolder userId={user.id} />
        <div className="flex flex-col">
          <FolderList username={user?.username} userId={user?.id} />
        </div>
      </TabsContent>
      <TabsContent value="following">
        <div className="flex flex-col justify-start w-full">
          {userFollows?.following.map((user) => (
            <Button
              key={user.profiles?.id}
              className="flex gap-3 w-full justify-start h-16 py-3 border-b border-b-white hover:border-b hover:border-b-black-50"
              variant="ghost"
              asChild
            >
              <Link href={`/${user.profiles?.username}`}>
                <UserAvatar
                  avatarUrl={user.profiles?.avatar_url}
                  width={36}
                  height={36}
                  className="w-9 h-9"
                />
                <div className="flex flex-col justify-start items-start">
                  <h1>{user.profiles?.full_name}</h1>
                  <p>{user.profiles?.username}</p>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};
