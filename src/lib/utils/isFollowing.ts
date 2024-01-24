import { UserFollow } from "../supabase/db";

export function isFollowing(userId: string, following: UserFollow[] | null) {
  if (!following) return false;
  return following.some((user) => user.following_id === userId);
}
