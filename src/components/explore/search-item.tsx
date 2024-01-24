import Link from "next/link";
import { Button } from "../ui/button";
import { followUserAction } from "@/actions/followUser";
import { unfollowUserAction } from "@/actions/unfollowUserAction";
import { UserAvatar } from "../ui/user-avatar";
import { CommandItem } from "../ui/command";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

type UserSearchItemProps = {
  currentUserId?: string;
  userId: string;
  username: string;
  avatarUrl?: string | null;
  fullName: string;
  buttonText: "following" | "follow";
  accent: "primary" | "money";
  folder?: React.ReactNode;
  value: string;
};

const UserSearchItem = ({
  value,
  fullName,
  username,
  avatarUrl,
  currentUserId,
  userId,
  buttonText,
  accent,
  folder,
}: UserSearchItemProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleFollowUnfollow = async () => {
    if (buttonText === "follow" && currentUserId) {
      await followUserAction({
        follower_id: currentUserId,
        following_id: userId,
      });
    }
    if (buttonText === "following" && currentUserId) {
      await unfollowUserAction({
        follower_id: currentUserId,
        following_id: userId,
      });
    }
    const params = new URLSearchParams(window.location.href.split("?")[1]);

    console.log("follow search", params.get("search"));
    await queryClient.invalidateQueries({
      queryKey: ["search", "currentUser"],
    });
    router.replace(`/explore?${params.toString()}`);
  };
  return (
    <CommandItem
      value={value}
      className="max-w-96 flex items-center justify-between py-3 border-b border-b-white hover:border-b hover:border-b-black-50"
    >
      <Link href={`/profile/${username}`} className="w-full">
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
            <p className="text-black-secondary ">@{username}</p>
          </div>
        </div>

        {folder}
      </Link>

      <Button
        className="py-0"
        variant={buttonText === "follow" ? "default" : "outline"}
        {...(buttonText === "following" && { accent })}
        onClick={handleFollowUnfollow}
      >
        {buttonText}
      </Button>
    </CommandItem>
  );
};

type FolderSearchItemProps = {
  name: string;
  id: string;
  _count: {
    links: number;
  };
};

const FolderSearchItem = ({
  name,
  id,
  _count: { links },
}: FolderSearchItemProps) => {
  return (
    <div className="flex gap-3 ml-5 items-center">
      <Image
        src="/icons/folder.png"
        alt="folder"
        className="h-6 w-6"
        width={24}
        height={24}
      />
      <div className="flex flex-col justify-start items-start">
        <h1 className="font-normal">{name}</h1>
        <p className="text-black-secondary ">{links} links</p>
      </div>
    </div>
  );
};

type SearchItemProps = UserSearchItemProps & {
  folders: FolderSearchItemProps[];
};

export const SearchItem = ({ folders, ...props }: SearchItemProps) => {
  return (
    <>
      <UserSearchItem {...props} />
      {folders.map((folder) => {
        return (
          <UserSearchItem
            {...props}
            key={folder.id}
            value={folder.id}
            folder={<FolderSearchItem {...folder} />}
          />
        );
      })}
    </>
  );
};
