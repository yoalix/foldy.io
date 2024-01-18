"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { useUserSession } from "@/hooks/queries/useUserSession";
import { useCreateUser } from "@/hooks/queries/useCreateUser";
import {
  Form,
  FormControl,
  FormField,
  FormInputField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  checkUsername,
  getAvatarUrl,
  getUserByUsername,
  uploadAvatar,
} from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchFile } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

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
  termsAgreements: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions",
  }),
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
      if (foundUser) {
        form.setError("username", { message: "Username already exists" });
        return;
      }
      const { email, full_name, avatar_url } = data.user.user_metadata;
      let avatarUrl = avatar_url;
      if (avatarUrl) {
        const blob = await fetchFile(avatarUrl);
        const res = await uploadAvatar(supabase, blob, data.user.id);
        avatarUrl = (await getAvatarUrl(supabase, res.path)).publicUrl;
      }
      const user = await createUser.mutateAsync({
        id: data.user.id,
        email: email || "",
        full_name: full_name || "",
        avatar_url,
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
      <h1>USERNAME</h1>
      <p className="text-black-secondary mb-5">Finishing Sign up</p>
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(handleFinishSignup)}
        >
          <FormInputField
            name="username"
            control={form.control}
            placeholder="@username"
            className="placeholder-black"
          />

          <FormField
            control={form.control}
            name="termsAgreements"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                {/* <div className="space-y-1 leading-none"> */}
                <FormLabel className="ml-2 text-black-secondary font-normal">
                  Fill in the box acknowledging you’ve read and agree to the{" "}
                  <Link href="/terms" className="underline ">
                    Terms and Agreement
                  </Link>
                </FormLabel>
                {/* </div> */}
              </FormItem>
            )}
          />
          <Button
            className="w-[180px]"
            type="submit"
            variant="secondary"
            disabled={form.formState.isSubmitting}
          >
            FINISH SIGN UP
          </Button>
        </form>
      </Form>
    </div>
  );
};
