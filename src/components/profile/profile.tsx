import React from "react";
import { Button } from "@/components/ui/button";
import { FolderList } from "./folder-list";
import { TwitterX } from "@/components/icons/twitter-x";
import { Instagram } from "@/components/icons/instagram";
import { TikTok } from "@/components/icons/tiktok";
import { Dot } from "lucide-react";
import { ProfileMenu } from "./profile-menu";
import { CreateFolder } from "./create-folder";
import Link from "next/link";
import { getUserByUsername } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/supabase/auth/server";
import { followUserAction } from "@/actions/followUser";
import { revalidatePath } from "next/cache";
import { unfollowUserAction } from "@/actions/unfollowUserAction";
import { UserAvatar } from "../ui/user-avatar";
type Props = {
  username?: string;
};
const SocialIcons = {
  twitter: <TwitterX />,
  instagram: <Instagram />,
  tiktok: <TikTok />,
};

export const Profile = async ({ username }: Props) => {
  const supabase = createClient(cookies());
  const currentUser = await getCurrentUser();
  const user = await getUserByUsername(supabase, username || "");
  if (!user) return <div>profile not found</div>;
  const isCurrentUser = currentUser?.user?.id === user?.id;
  const handleFollow = async () => {
    "use server";
    if (!currentUser?.user?.id) return;
    await followUserAction({
      follower_id: currentUser?.user?.id,
      following_id: user?.id,
    });
    revalidatePath(`/${user?.username}`);
  };
  const handleUnfollow = async () => {
    "use server";
    if (!currentUser?.user?.id) return;
    await unfollowUserAction({
      follower_id: currentUser?.user?.id,
      following_id: user?.id,
    });
    revalidatePath(`/${user?.username}`);
  };

  const isFollowing = user.followers.some(
    (follower) => follower.follower_id === currentUser?.user?.id
  );
  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full items-center">
        <Link href="/profile/edit">
          <UserAvatar
            className="w-16 h-16"
            avatarUrl={user.avatar_url}
            fullName={user.full_name}
            width={64}
            height={64}
          />
        </Link>
        <div className={"flex flex-col w-full justify-center ml-8"}>
          <h1 className="font-normal">{user?.full_name}</h1>
          <p className="text-black-secondary">@{user?.username}</p>
        </div>
        <ProfileMenu />
      </div>
      <div>
        <h1 className="flex font-normal items-center">
          <Link
            href={`/${user.username}/followers`}
            className="hover:underline"
          >
            {user.followers.length} Followers
          </Link>{" "}
          <Dot />{" "}
          <Link
            href={`/${user.username}/following`}
            className="hover:underline"
          >
            {user.following.length} Following
          </Link>
        </h1>
        <p className="text-black-secondary ">{user?.bio || "No bio yet"}</p>
        <div className="flex gap-3 items-center">
          {user.userSocialMedia?.map((social) => (
            <Button
              key={`social-${social.provider}`}
              className="w-min h-min rounded-lg"
              variant="outline"
              size="icon"
              asChild
            >
              <a key={social.provider} href={social.link} target="_blank">
                {SocialIcons[social.provider as keyof typeof SocialIcons] ||
                  social.provider}
              </a>
            </Button>
          ))}
          <Button className="text-black h-9 px-1" variant="link" size="sm">
            foldy.io/{user?.username}
          </Button>
        </div>
        {isCurrentUser ? (
          <CreateFolder userId={user.id} />
        ) : (
          <form action={isFollowing ? handleUnfollow : handleFollow}>
            <Button
              className={`my-3 w-[180px]`}
              variant={isFollowing ? "outline" : "default"}
              accent={isFollowing ? "primary" : undefined}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </form>
        )}
      </div>
      <FolderList username={user?.username} userId={user?.id} />
    </div>
  );
};
