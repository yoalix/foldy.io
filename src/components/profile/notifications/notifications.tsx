import { getActivities } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import React from "react";
import { ActivityItem } from "./activity-item";

export const Notifications = async () => {
  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const notifications = await getActivities(supabase, user?.id);
  console.log(notifications);
  return (
    <div>
      <h1>Notifications</h1>

      {notifications?.map((notification) => (
        <ActivityItem key={notification.id} activityItem={notification} />
      ))}
    </div>
  );
};
