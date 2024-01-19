import Link from "next/link";
import { Button } from "../ui/button";
import { followUserAction } from "@/actions/followUser";
import { unfollowUserAction } from "@/actions/unfollowUserAction";
import { revalidatePath } from "next/cache";
import { UserAvatar } from "../ui/user-avatar";

type FollowItemProps = {
  currentUserId: string;
  userId: string;
  username: string;
  href: string;
  avatarUrl?: string | null;
  fullName: string;
  buttonText: "following" | "follow";
  accent: "primary" | "money";
  disableButton?: boolean;
  currentPage: "following" | "followers";
};

export const FollowItem = ({
  currentUserId,
  userId,
  fullName,
  username,
  href,
  avatarUrl,
  buttonText,
  accent,
  disableButton,
  currentPage,
}: FollowItemProps) => {
  const handleFollowUnfollow = async () => {
    "use server";
    if (buttonText === "follow") {
      followUserAction({
        follower_id: currentUserId,
        following_id: userId,
      });
    }
    if (buttonText === "following") {
      unfollowUserAction({
        follower_id: currentUserId,
        following_id: userId,
      });
    }
    revalidatePath(`/profile/${username}/${currentPage}`);
  };
  return (
    <div className="flex items-center justify-between py-3 border-b border-b-white hover:border-b hover:border-b-black-50">
      <Link
        href={href}
        target={href.includes("http") ? "_blank" : ""}
        className="w-full"
      >
        <div className="flex items-center gap-3 w-full">
          <UserAvatar
            className="w-9 h-9"
            avatarUrl={avatarUrl}
            fullName={fullName}
            height={36}
            width={36}
          />
          <div className="flex flex-col justify-start items-start">
            <h1 className="font-normal">{fullName}</h1>
            <p className="text-s-secondary ">{username}</p>
          </div>
        </div>
      </Link>
      {!disableButton && (
        <form action={handleFollowUnfollow} className="flex w-fit">
          <Button
            variant={buttonText === "follow" ? "default" : "outline"}
            {...(buttonText === "following" && { accent })}
          >
            {buttonText}
          </Button>
        </form>
      )}
    </div>
  );
};
