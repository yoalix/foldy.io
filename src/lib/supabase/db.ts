import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import { FIVE_MINUTES, hasPassed } from "../utils/date";

//-----------USER------------------
export type User = Database["public"]["Tables"]["profiles"]["Row"];

export const getUserProfile = async (
  supabase: SupabaseClient<Database>,
  uid?: string
) => {
  if (!uid) return null;
  return supabase
    .from("profiles")
    .select(
      "*, userSocialMedia:user_social_media(*),followers:user_followers!user_followers_following_id_fkey(*), following:user_followers!user_followers_follower_id_fkey(*)"
    )
    .eq("id", uid)
    .maybeSingle()
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

export const getCurrentUserProfile = async (
  supabase: SupabaseClient<Database>
) => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return getUserProfile(supabase, data?.user?.id);
};

export async function checkUsername(
  supabase: SupabaseClient<Database>,
  username: string
): Promise<boolean> {
  try {
    const user = await getUserByUsername(supabase, username);
    if (user) {
      return true;
    }
    return false;
  } catch {
    return true;
  }
}

export async function checkEmail(
  supabase: SupabaseClient<Database>,
  email: string
) {
  try {
    const { data: user, error } = await supabase
      .from("profiles")
      .select()
      .eq("email", email)
      .maybeSingle();
    if (user) {
      return true;
    }
    return false;
  } catch {
    return true;
  }
}

export const getUserByUsername = async (
  supabase: SupabaseClient<Database>,
  username: string
) => {
  if (!username) return null;
  return (
    supabase
      .from("profiles")

      // followers are users who are following the user
      // following are users who the user is follows
      .select(
        "*, userSocialMedia:user_social_media(*), followers:user_followers!user_followers_following_id_fkey(follower_id), following:user_followers!user_followers_follower_id_fkey(following_id)"
      )
      .eq("username", username)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      })
  );
};

export type CreateUser = Database["public"]["Tables"]["profiles"]["Insert"];

export const createUser = async (
  supabase: SupabaseClient<Database>,
  user: CreateUser
) => {
  return supabase
    .from("profiles")
    .insert({ ...user })
    .select()
    .single()
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

export type UpdateUser = Database["public"]["Tables"]["profiles"]["Update"] & {
  id: string;
};

export const updateUser = async (
  supabase: SupabaseClient<Database>,
  { id, ...user }: UpdateUser
) => {
  if (!id) throw new Error("No id provided");
  const allFieldsUndefined = Object.values(user).every(
    (value) => value === undefined
  );
  if (allFieldsUndefined) return null;
  return supabase
    .from("profiles")
    .update({ ...user })
    .eq("id", id)
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

export const uploadAvatar = async (
  supabase: SupabaseClient<Database>,
  file: Blob | File,
  uid: string
) => {
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(`avatars/${uid}`, file, { upsert: true });
  if (error) throw error;
  return data;
};

export const getAvatarUrl = async (
  supabase: SupabaseClient<Database>,
  path: string
) => {
  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  if (!data) throw new Error("No data");
  return data;
};

// -----------User Social Media------------------
export const getUserSocials = async (
  supabase: SupabaseClient<Database>,
  uid?: string
) => {
  if (!uid) return null;
  return supabase
    .from("user_social_media")
    .select("*")
    .eq("user_id", uid)
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

export const createOrUpdateUserSocialMedia = async (
  supabase: SupabaseClient<Database>,
  { uid, provider, link }: { uid: string; provider: string; link: string }
) => {
  let socialId: number | undefined;
  const foundSocial = await supabase
    .from("user_social_media")
    .select("*")
    .eq("user_id", uid)
    .eq("provider", provider)
    .maybeSingle();
  if (foundSocial.data) {
    socialId = foundSocial.data.id;
  }

  if (!socialId) {
    const { data, error } = await supabase
      .from("user_social_media")
      .insert({ user_id: uid, provider, link });
    if (error) throw error;
    return data;
  }

  const { data, error } = await supabase
    .from("user_social_media")
    .upsert({ provider, link, user_id: uid }, { onConflict: "provider" })
    .eq("id", socialId);
  if (error) throw error;
  return data;
};

// -----------User Followers------------------
export const getUserFollowsByUsername = async (
  supabase: SupabaseClient<Database>,
  username?: string
) => {
  if (!username) return null;
  return supabase
    .from("profiles")
    .select(
      "followers:user_followers!user_followers_following_id_fkey(profiles!user_followers_follower_id_fkey(id, avatar_url, full_name, username)), following:user_followers!user_followers_follower_id_fkey(profiles!user_followers_following_id_fkey(id, avatar_url, full_name, username))"
    )
    .eq("username", username)
    .single()
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

export const getUserFollowing = async (
  supabase: SupabaseClient<Database>,
  uid?: string
) => {
  if (!uid) return null;
  return supabase
    .from("user_followers")
    .select("*")
    .eq("follower_id", uid)
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

export type UserFollow = { follower_id: string; following_id: string };

export const followUser = async (
  supabase: SupabaseClient<Database>,
  { follower_id, following_id }: UserFollow
) => {
  const { data, error } = await supabase
    .from("user_followers")
    .insert({ follower_id, following_id });
  if (error) throw error;
  const { error: activityError } = await createActivity(supabase, {
    ownerId: follower_id,
    ownerType: "user",
    subjectId: following_id,
    subjectType: "user",
    eventType: "user.followed",
  });
  if (activityError) console.log(activityError);
  return data;
};

export const unfollowUser = async (
  supabase: SupabaseClient<Database>,
  { follower_id, following_id }: UserFollow
) => {
  const { data, error } = await supabase
    .from("user_followers")
    .delete()
    .eq("follower_id", follower_id)
    .eq("following_id", following_id);
  if (error) throw error;
  const { data: activity, error: activityError } =
    await getActivityByOwnerSubject(supabase, {
      ownerId: follower_id,
      ownerType: "user",
      subjectId: following_id,
      subjectType: "user",
      eventType: "user.followed",
    });
  if (activityError) console.log(activityError);
  if (activity && !hasPassed(activity.createdAt, FIVE_MINUTES)) {
    await deleteActivity(supabase, activity.id);
  }

  return data;
};

// -----------Folder------------------
export type Folder = Database["public"]["Tables"]["folders"]["Row"];

export const getFolders = async (
  supabase: SupabaseClient<Database>,
  uid?: string
) => {
  if (!uid) return null;
  return supabase
    .from("folders")
    .select("*, links(*)")
    .eq("user_id", uid)
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

export const getFolder = async (
  supabase: SupabaseClient<Database>,
  folderId?: string | null
) => {
  if (!folderId) return null;
  return supabase
    .from("folders")
    .select("*, links(*)")
    .eq("id", folderId)
    .single()
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

export type CreateFolder = Database["public"]["Tables"]["folders"]["Insert"];

export const createFolder = async (
  supabase: SupabaseClient<Database>,
  { user_id, name, description }: CreateFolder
) => {
  const { data, error } = await supabase
    .from("folders")
    .insert({ user_id, name, description })
    .select()
    .single();
  if (error) throw error;
  const user = await supabase.auth.getUser();
  const { data: activity, error: activityError } = await createActivity(
    supabase,
    {
      ownerId: user?.data?.user?.id || "",
      ownerType: "user",
      subjectId: data?.id || "",
      subjectType: "folder",
      eventType: "folder.created",
    }
  );

  if (activityError) console.log(activityError);
  return data;
};

export type UpdateFolder = Database["public"]["Tables"]["folders"]["Update"] & {
  id: string;
  user_id: string;
};

export const updateFolder = async (
  supabase: SupabaseClient<Database>,
  { id, user_id, ...folder }: UpdateFolder
) => {
  if (!id) throw new Error("No id provided");
  const allFieldsUndefined = Object.values(folder).every(
    (value) => value === undefined
  );
  if (allFieldsUndefined) return null;
  return supabase
    .from("folders")
    .update({ ...folder })
    .eq("id", id)
    .eq("user_id", user_id)
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

export const deleteFolder = async (
  supabase: SupabaseClient<Database>,
  id: string,
  user_id: string
) => {
  if (!id) throw new Error("No id provided");
  const { data: activities, error: activitiesError } =
    await getActivityByOwnerSubject(supabase, {
      ownerId: user_id,
      ownerType: "user",
      subjectId: id,
      subjectType: "folder",
      eventType: "folder.created",
    });
  if (activitiesError) console.log(activitiesError);
  if (activities && !hasPassed(activities.createdAt, FIVE_MINUTES)) {
    await deleteActivity(supabase, activities.id);
  }
  return supabase
    .from("folders")
    .delete()
    .eq("id", id)
    .eq("user_id", user_id)
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

// -----------Links------------------

export type Link = Database["public"]["Tables"]["links"]["Row"];

export const getLinks = async (
  supabase: SupabaseClient<Database>,
  folderId?: string
) => {
  if (!folderId) return null;
  return supabase
    .from("links")
    .select("*")
    .eq("folder_id", folderId)
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};
export const getLink = async (
  supabase: SupabaseClient<Database>,
  linkId?: string | null
) => {
  if (!linkId) return null;
  return supabase
    .from("links")
    .select("*, folder:folders(*)")
    .eq("id", linkId)
    .maybeSingle()
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

export type CreateLink = Database["public"]["Tables"]["links"]["Insert"];

export const createLink = async (
  supabase: SupabaseClient<Database>,
  { folder_id, name, url }: CreateLink
) => {
  const res = await getLinks(supabase, folder_id);
  const order = res?.length || 0;
  const { data: link, error } = await supabase
    .from("links")
    .insert({ folder_id, name, url, order })
    .select()
    .single();
  if (error) throw error;
  const user = await supabase.auth.getUser();
  const { data: activity, error: activityError } = await createActivity(
    supabase,
    {
      ownerId: user?.data?.user?.id || "",
      ownerType: "user",
      subjectId: link.id,
      subjectType: "link",
      eventType: "link.created",
    }
  );
  console.log(activity, activityError);

  return link;
};

export type UpdateLink = Database["public"]["Tables"]["links"]["Update"] & {
  id: string;
  folder_id: string;
  url: string;
};

export const upsertLinks = async (
  supabase: SupabaseClient<Database>,
  links: UpdateLink[]
) => {
  return supabase
    .from("links")
    .upsert(links)
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

export const deleteLinks = async (
  supabase: SupabaseClient<Database>,
  ids: string[]
) => {
  ids.forEach(async (id) => {
    const { data: activities, error: activitiesError } =
      await getActivityByOwnerSubject(supabase, {
        ownerId: id,
        ownerType: "user",
        subjectId: id,
        subjectType: "link",
        eventType: "link.created",
      });
    if (activitiesError) console.log(activitiesError);
    if (activities && !hasPassed(activities.createdAt, FIVE_MINUTES)) {
      await deleteActivity(supabase, activities.id);
    }
  });

  return supabase
    .from("links")
    .delete()
    .in("id", ids)
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};

// -----------Activity------------------

type CreateActivity = Database["public"]["Tables"]["activities"]["Insert"];

export const createActivity = (
  supabase: SupabaseClient<Database>,
  data: CreateActivity
) => {
  return supabase.from("activities").insert(data);
};

export type Activity = Database["public"]["Tables"]["activities"]["Row"];

export const getActivities = async (
  supabase: SupabaseClient<Database>,
  uid?: string | null
) => {
  if (!uid) return null;
  const { data: followingIds, error: followError } = await supabase
    .from("user_followers")
    .select("following_id")
    .eq("follower_id", uid);

  if (followError) {
    throw followError;
  }

  const query = `and(eventType.neq."user.followed",ownerId.in.(${followingIds
    .map(({ following_id }) => `"${following_id}"`)
    .join(",")}),ownerType.eq.user)`;
  console.log(query);
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    // .or(query)
    .or(`${query}, and(eventType.eq."user.followed",subjectId.eq.${uid})`)
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return data;
};

const getActivityByOwnerSubject = (
  supabase: SupabaseClient<Database>,
  {
    ownerId,
    ownerType,
    subjectId,
    subjectType,
    eventType,
  }: {
    ownerId: string;
    ownerType: string;
    subjectId: string;
    subjectType: string;
    eventType: string;
  }
) => {
  return supabase
    .from("activities")
    .select("*")
    .eq("ownerId", ownerId)
    .eq("ownerType", ownerType)
    .eq("subjectId", subjectId)
    .eq("subjectType", subjectType)
    .eq("eventType", eventType)
    .maybeSingle();
};

const deleteActivity = (supabase: SupabaseClient<Database>, id: number) => {
  return supabase.from("activities").delete().eq("id", id);
};
