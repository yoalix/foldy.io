import { ExploreUsers, getExploreUsers } from "@/lib/prisma/db";
import React from "react";
import { SearchBar } from "./search-bar";
import { getCurrentUser } from "@/lib/supabase/auth/server";
import { ExploreItem } from "./exploreItem";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const Explore = () => {
  // const currentUser = await getCurrentUser();
  // const supabase = createClient(cookies());
  // const users: ExploreUsers = await getExploreUsers(supabase);
  return (
    <div className="flex flex-col gap-5 h-full">
      <SearchBar />
      {/* {users.map((user) => (
        <ExploreItem
          key={user.id}
          {...user}
          currentUserId={currentUser?.user?.id}
          followersCount={user.followers.length}
          followingCount={user.following.length}
        />
      ))} */}
    </div>
  );
};
