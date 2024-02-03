import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";

export default async function VerifyEmailPage() {
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
