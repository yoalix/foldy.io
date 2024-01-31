import { followUserAction } from "@/actions/followUser";
import { Dot } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { UserAvatar } from "../ui/user-avatar";
import { revalidatePath } from "next/cache";

type ExploreItemProps = {
  avatar_url: string | null;
  username: string;
  full_name: string;
  followersCount: number;
  followingCount: number;
  id: string;
  currentUserId: string | null;
  bio: string | null;
};

export const ExploreItem = ({
  username,
  full_name,
  avatar_url,
  followersCount,
  followingCount,
  id,
  currentUserId,
  bio,
}: ExploreItemProps) => {
  const handleFollow = async () => {
    "use server";
    if (!currentUserId) return;
    await followUserAction({
      follower_id: currentUserId,
      following_id: id,
    });
    revalidatePath(`/explore`);
  };

  return (
    <Card className="max-w-96">
      <CardContent className="pt-6 flex flex-col gap-5">
        <div className="flex justify-between w-full">
          <Link href={`/${username}`} className="w-full">
            <div className="flex justify-between item-center w-full">
              <div className="flex items-center gap-3">
                <UserAvatar
                  avatarUrl={avatar_url}
                  width={64}
                  height={64}
                  className="w-16 h-16"
                  fullName={full_name}
                />
                <div>
                  <h1>{full_name}</h1>
                  <p className="text-black-secondary">@{username}</p>
                </div>
              </div>
            </div>
            <div className="flex">
              <p>{followersCount} Followers</p>
              <Dot size={16} /> <p>{followingCount} Following</p>
            </div>
            {bio && <div className="text-gray-500">{bio}</div>}
            <Button variant="link" className="text-black p-0 w-fit">
              www.foldy.io/@{username}
            </Button>
          </Link>
          <form action={handleFollow} className="flex w-fit">
            <Button>Follow</Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
