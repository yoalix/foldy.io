import { Notifications } from "@/components/profile/notifications/notifications";
import { LogoLoading } from "@/components/ui/logo-loading";
import React, { Suspense } from "react";

export default function NotificationsPage() {
  return (
    <Suspense
      fallback={
        <div>
          <h1>Notifications</h1>
          <LogoLoading />
        </div>
      }
    >
      <Notifications />
    </Suspense>
  );
}
