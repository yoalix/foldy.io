"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Input } from "@/components/ui/input";
import { useUserSession } from "@/hooks/firebase/useUserSession";
import { FirebaseUser } from "@/lib/firebase/firebase";
import { useCreateUser } from "@/hooks/firebase/useCreateUser";
import { verifyUsername } from "@/lib/firebase/firestore";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

type Props = {
  initialUser?: FirebaseUser | null;
};

export const SignupSocial = ({ initialUser }: Props) => {
  const userSession = useUserSession(initialUser);
  const createUser = useCreateUser();
  const [username, setUsername] = useState("");
  const form = useForm();

  const handleFinishSignup = async () => {
    try {
      if (!userSession) return;
      await verifyUsername(username);
      const { uid, email, displayName, photoURL } = userSession;
      const user = await createUser.mutateAsync({
        id: uid,
        email: email || "",
        fullName: displayName || "",
        imageUrl: photoURL || "",
        username,
      });
      console.log("created user", user);
    } catch (error) {
      console.error(error);
      if (
        error instanceof Error &&
        error.message &&
        error.message.includes("exists")
      ) {
        form.setError("username", { message: error.message });
      }
    }
  };
  return (
    <div className="p-10">
      <BackButton />
      <h1 className="bold text-sm">USERNAME</h1>
      <p className="text-sm text-black-secondary">Finishing Sign up</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFinishSignup)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="placeholder-black"
                    placeholder="@username"
                    {...field}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="secondary">
            FINISH SIGN UP
          </Button>
        </form>
      </Form>
    </div>
  );
};
