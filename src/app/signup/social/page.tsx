import React from "react";
import { SignupSocial } from "@/components/signup-social";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase";

export default async function SignupSocialPage() {
  const { currentUser } = await getAuthenticatedAppForUser();

  return (
    <main>
      <SignupSocial initialUser={currentUser} />
    </main>
  );
}
