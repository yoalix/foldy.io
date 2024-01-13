"use client";

import React from "react";
import { BackButton } from "../ui/back-button";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormInputField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import {
  UpdateUser,
  checkUsername,
  getAvatarUrl,
  updateUser,
  uploadAvatar,
} from "@/lib/supabase/db";
import { Textarea } from "../ui/textarea";
import { useGetCurrentUser } from "@/hooks/queries/useGetCurrentUser";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const ProfileSchema = z.object({
  firstName: z.string().max(256).optional(),
  lastName: z.string().max(256).optional(),
  username: z
    .string()
    .optional()
    .refine(
      async (value) => {
        if (!value) return true;
        const supabase = createClient();
        const usernameTaken = await checkUsername(supabase, value);
        return !usernameTaken;
      },
      { message: "Username is already taken", params: {} }
    ),
  bio: z
    .string()
    .max(160, { message: "Bio must be less than 160 characters" })
    .optional(),
  instagram: z.string().url().optional(),
  twitter: z.string().url().optional(),
  tiktok: z.string().url().optional(),
});
type FormValues = z.infer<typeof ProfileSchema>;

export const ProfileEdit = () => {
  const { data } = useGetCurrentUser();
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: data?.full_name.split(" ")[0],
      lastName: data?.full_name.split(" ")[1],
      username: data?.username,
      bio: data?.bio || "",
    },
  });
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      setAvatarFile(file);
      setAvatarUrl(URL.createObjectURL(file));
      //   const supabase = createClient();
      //   console.log("uploading avatar");
      //   const avatarStorage = await uploadAvatar(supabase, file, data?.id || "");
      //   console.log("avatar storage", avatarStorage);
      //   const avatarUrl = await getAvatarUrl(supabase, avatarStorage.path);
      //   console.log("avatar url", avatarUrl);
      //   setAvatarUrl(avatarUrl.publicUrl);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message || "Could not upload avatar",
      });
    }
  };

  const handleEditProfile = async ({
    firstName,
    lastName,
    username,
    bio,
  }: FormValues) => {
    try {
      const updatedUser: UpdateUser = { id: data?.id || "" };
      let [userFirstName, userLastName] = data?.full_name.split(" ") || [];
      if (firstName) {
        userFirstName = firstName;
        updatedUser.full_name = `${userFirstName} ${userLastName}`;
      }
      if (lastName) {
        userLastName = lastName;
        updatedUser.full_name = `${userFirstName} ${userLastName}`;
      }
      if (username) {
        updatedUser.username = username;
      }
      if (bio) {
        updatedUser.bio = bio;
      }
      console.log("avatar file", avatarFile);
      if (avatarFile) {
        const supabase = createClient();
        const avatarStorage = await uploadAvatar(
          supabase,
          avatarFile,
          data?.id || ""
        );
        const avatarUrl = await getAvatarUrl(supabase, avatarStorage.path);
        updatedUser.avatar_url = avatarUrl.publicUrl;
      }
      const supabase = createClient();
      const res = await updateUser(supabase, updatedUser);
      console.log("update", res);
      toast({
        title: "Success",
        description: "Successfully updated profile",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-10">
      <BackButton />
      <Form {...form}>
        <form
          className="flex flex-col gap-8"
          onSubmit={form.handleSubmit(handleEditProfile)}
        >
          <div className="flex w-full justify-between">
            <div>
              <h1>Settings</h1>
              <p>EditProfile</p>
            </div>
            <Button
              className="text-urgent font-bold"
              type="submit"
              variant="ghost"
            >
              Save
            </Button>
          </div>
          <div className="relative group w-20 h-20">
            <Avatar className="w-20 h-20 transition-all duration-200 group-hover:blur-sm">
              <AvatarImage src={avatarUrl || data?.avatar_url || ""} />
              <AvatarFallback />
            </Avatar>
            <div className="text-white absolute flex justify-center items-center inset-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                className="h-8 w-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>

            <FormInputField
              name="avatar"
              className="w-full h-full absolute inset-0 opacity-0 cursor-pointer z-10"
              id="avatar"
              type="file"
              onChange={handleAvatarChange}
            />
          </div>
          <p className="text-black-secondary">Tap to Update Profile Picture</p>
          <FormInputField
            control={form.control}
            name="firstName"
            placeholder="First Name"
          />
          <FormInputField
            control={form.control}
            name="lastName"
            placeholder="Last Name"
          />
          <FormInputField
            control={form.control}
            name="username"
            placeholder="@newusername"
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormInputField
            control={form.control}
            name="instagram"
            placeholder="Instagram profile link"
          />
          <FormInputField
            control={form.control}
            name="twitter"
            placeholder="Twitter profile link"
          />
          <FormInputField
            control={form.control}
            name="tiktok"
            placeholder="TikTok profile link"
          />
        </form>
      </Form>
    </div>
  );
};