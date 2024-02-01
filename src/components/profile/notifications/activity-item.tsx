import { Activity } from "@/lib/supabase/db";
import React from "react";
import { LinkCreated } from "./link-created";
import { FolderCreated } from "./folder-created";
import { UserFollowed } from "./user-followed";

const components = {
  "link.created": LinkCreated,
  "folder.created": FolderCreated,
  "user.followed": UserFollowed,
} as const;

type EventType = keyof typeof components;

type Props = {
  activityItem: Activity;
};

export const ActivityItem = ({ activityItem }: Props) => {
  const Component = components[activityItem.eventType as EventType];
  if (!Component) {
    return null;
  }
  return <Component activityItem={activityItem} />;
};
