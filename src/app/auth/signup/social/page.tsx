import React from "react";
import { SignupSocial } from "@/components/auth/signup-social";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase";

export default async function SignupSocialPage() {
  return (
    <main>
      <SignupSocial />
    </main>
  );
}
