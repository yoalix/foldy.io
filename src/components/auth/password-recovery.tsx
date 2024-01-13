"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { BackButton } from "@/components/ui/back-button";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "../ui/use-toast";

export const PasswordRecovery = () => {
  const form = useForm();
  const { toast } = useToast();
  const handlePasswordRecovery = async (email: string) => {
    try {
      const supabase = createClient();
      const res = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/auth/callback?next=/auth/update-password`,
      });
      if (res.error) throw new Error(res.error.message);
      toast({
        title: "Password recovery email sent",
        description: "Check your email for the password recovery link",
      });
    } catch (error) {
      if (error instanceof Error && error.message) {
        form.setError("email", { message: error.message });
      }
    }
  };
  return (
    <div className="p-10 flex flex-col gap-5">
      <BackButton />
      <h1>RECOVER PASSWORD</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            handlePasswordRecovery(data.email)
          )}
          className="flex flex-col gap-3 mb-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="email"
                    {...field}
                    onClear={() => form.setValue("email", "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="secondary" className="w-[180px]" type="submit">
            SEND VERIFICATION LINK
          </Button>
        </form>
      </Form>
    </div>
  );
};
