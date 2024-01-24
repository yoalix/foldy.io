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
  createOrUpdateUserSocialMedia,
  getAvatarUrl,
  updateUser,
  uploadAvatar,
} from "@/lib/supabase/db";
import { Textarea } from "../ui/textarea";
import { useGetCurrentUser } from "@/hooks/queries/useGetCurrentUser";
import { useToast } from "../ui/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  instagram: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  tiktok: z.string().url().optional().or(z.literal("")),
});
type FormValues = z.infer<typeof ProfileSchema>;

export const ProfileEdit = () => {
  const { data } = useGetCurrentUser();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      bio: "",
      instagram: "",
      twitter: "",
      tiktok: "",
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
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.message) {
        toast({
          title: "Error",
          variant: "destructive",
          description: error.message || "Could not upload avatar",
        });
      }
    }
  };

  const handleEditProfile = async ({
    firstName,
    lastName,
    username,
    bio,
    instagram,
    twitter,
    tiktok,
  }: FormValues) => {
    try {
      const updatedUser: UpdateUser = { id: data?.id || "" };
      const supabase = createClient();
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
      if (avatarFile) {
        const avatarStorage = await uploadAvatar(
          supabase,
          avatarFile,
          data?.id || ""
        );
        const avatarUrl = await getAvatarUrl(supabase, avatarStorage.path);
        updatedUser.avatar_url = avatarUrl.publicUrl;
      }
      if (instagram) {
        await createOrUpdateUserSocialMedia(supabase, {
          uid: data?.id || "",
          provider: "instagram",
          link: instagram,
        });
      }
      if (twitter) {
        await createOrUpdateUserSocialMedia(supabase, {
          uid: data?.id || "",
          provider: "twitter",
          link: twitter,
        });
      }
      if (tiktok) {
        await createOrUpdateUserSocialMedia(supabase, {
          uid: data?.id || "",
          provider: "tiktok",
          link: tiktok,
        });
      }
      await updateUser(supabase, updatedUser);
      toast({
        title: "Success",
        description: "Successfully updated profile",
      });
      router.push(`/profile/${data?.username}`);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
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
              <AvatarImage src={avatarUrl || ""}>
                <Image
                  src={avatarUrl || data?.avatar_url || ""}
                  alt="avatar upload"
                  width={80}
                  height={80}
                />
              </AvatarImage>
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
