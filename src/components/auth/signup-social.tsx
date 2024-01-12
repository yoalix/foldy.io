"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { useUserSession } from "@/hooks/queries/useUserSession";
import { useCreateUser } from "@/hooks/queries/useCreateUser";
import { Form, FormInputField } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { checkUsername, getUserByUsername } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SignupSchema = z.object({
  username: z
    .string()
    .min(1)
    .refine(
      async (value) => {
        const supabase = createClient();
        const usernameTaken = await checkUsername(supabase, value);
        return !usernameTaken;
      },
      { message: "Username is already taken", params: {} }
    ),
});
type FormValues = z.infer<typeof SignupSchema>;

export const SignupSocial = () => {
  const { data } = useUserSession();
  const createUser = useCreateUser();
  const form = useForm<FormValues>({
    resolver: zodResolver(SignupSchema),
  });
  const router = useRouter();

  const handleFinishSignup: SubmitHandler<FormValues> = async (values) => {
    try {
      if (!data?.user) return;
      const supabase = createClient();
      const foundUser = await getUserByUsername(supabase, values.username);
      console.log("found user", foundUser);
      if (foundUser) {
        form.setError("username", { message: "Username already exists" });
        return;
      }
      const { email, full_name, avatar_url } = data.user.user_metadata;
      const user = await createUser.mutateAsync({
        id: data.user.id,
        email: email || "",
        fullName: full_name || "",
        avatarUrl: avatar_url || "",
        username: values.username,
      });
      console.log("created user", user);
      router.push("/profile");
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.message) {
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
          <FormInputField
            name="username"
            control={form.control}
            placeholder="@username"
            className="placeholder-black"
          />
          <Button type="submit" variant="secondary">
            FINISH SIGN UP
          </Button>
        </form>
      </Form>
    </div>
  );
};
