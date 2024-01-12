import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import React from "react";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { access_token, type } = searchParams as {
    access_token?: string;
    type?: EmailOtpType;
  };
  //TODO: verify email
  //   if (access_token && type) {
  //     const supabase = createClient(cookies());
  //     const {
  //       data: { session },
  //       error,
  //     } = await supabase.auth.verifyOtp({ token: access_token, type });
  //     console.log("session", session);
  //   }

  // subsequently redirect the user back to the client using the redirect_to param
  // ...

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Verify Email</CardTitle>
        </CardHeader>
        <CardContent>
          Please check your email to verify your account
        </CardContent>
      </Card>
    </div>
  );
}
