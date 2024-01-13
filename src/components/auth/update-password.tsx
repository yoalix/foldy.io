"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormInputField } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const UpdatePasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(256)
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must include a lowercase letter",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must include an uppercase letter",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password must include a number",
    })
    .refine((value) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value), {
      message: "Password must include a special character",
    }),
  confirmPassword: z.string().min(8).max(256),
});

type FormValues = z.infer<typeof UpdatePasswordSchema>;

export const UpdatePassword = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(UpdatePasswordSchema),
  });
  const { toast } = useToast();
  const router = useRouter();
  const handleUpdatePassword: SubmitHandler<FormValues> = async (values) => {
    try {
      const supabase = createClient();
      const res = await supabase.auth.updateUser({ password: values.password });
      console.log("updated password", res);
      if (res.error) {
        throw new Error(res.error.message);
      }
      toast({ title: "Password updated" });
      router.push("/profile");
    } catch (error) {
      if (error instanceof Error && error.message) {
        form.setError("confirmPassword", { message: error.message });
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <h1 className="text-2xl">Update Password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdatePassword)}>
          <FormInputField
            control={form.control}
            name="password"
            onClear={() => form.setValue("password", "")}
            placeholder="Password"
            type="password"
          />

          <FormInputField
            control={form.control}
            name="confirmPassword"
            onClear={() => form.setValue("confirmPassword", "")}
            placeholder="Confirm Password"
            type="password"
          />
          <Button
            variant="secondary"
            className="bg-black-50 flex gap-2 my-5 w-[180px]"
          >
            SIGN UP
          </Button>
        </form>
      </Form>
    </div>
  );
};
