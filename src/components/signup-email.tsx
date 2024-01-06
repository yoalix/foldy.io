"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { signUpWithEmailAndPassword } from "@/lib/firebase/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
type FormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  username: string;
};
export const SignupEmail = () => {
  const form = useForm<FormValues>();
  const router = useRouter();
  const signupWithEmail = useMutation({
    mutationFn: signUpWithEmailAndPassword,
  });
  const handleSignup: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log(data);

      await signupWithEmail.mutateAsync({
        email: data.email,
        password: data.password,
        fullName: data.firstName + " " + data.lastName,
        username: data.username,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-10">
      <BackButton />
      <h1>SIGN UP</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-3 mb-8"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="First Name"
                    {...field}
                    onClear={() => form.setValue("firstName", "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    {...field}
                    onClear={() => form.setValue("lastName", "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="birthMonth"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[...Array(12)].map((_, i) => (
                        <SelectItem key={"month" + i} value={i + 1 + ""}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDay"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[...Array(31)].map((_, i) => (
                        <SelectItem key={"day" + i} value={i + 1 + ""}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthYear"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper" side="bottom">
                      {[...Array(121)].map((_, i) => (
                        <SelectItem
                          key={"year" + i}
                          value={new Date().getFullYear() - i + ""}
                        >
                          {new Date().getFullYear() - i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="text-sm text-black-secondary">
            You must be 13 yeas or older to use this platform.
          </p>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="@username"
                    {...field}
                    onClear={() => form.setValue("username", "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    {...field}
                    onClear={() => form.setValue("password", "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="secondary"
            className="bg-black-50 flex gap-2 text-sm my-5 w-[180px]"
          >
            SIGN UP
          </Button>
        </form>
      </Form>
    </div>
  );
};
