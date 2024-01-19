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
  FormInputField,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { signUpWithEmailAndPassword } from "@/lib/supabase/auth/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { checkUsername } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/client";

const today = new Date();
const thirteenYearsAgo = new Date(
  today.getFullYear() - 13,
  today.getMonth(),
  today.getDate()
);

const isNumber = (val: string, ctx: z.RefinementCtx) => {
  const parsed = parseInt(val);
  if (isNaN(parsed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Not a number",
    });

    // This is a special symbol you can use to
    // return early from the transform function.
    // It has type `never` so it does not affect the
    // inferred return type.
    return z.NEVER;
  }
  return parsed;
};

const isInRange =
  (min: number, max: number) => (val: number, ctx: z.RefinementCtx) => {
    if (val < min || val > max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Value must be between ${min} and ${max}`,
      });
      return z.NEVER;
    }
    return val;
  };

const SignupSchema = z
  .object({
    firstName: z.string().min(1).max(256),
    lastName: z.string().min(1).max(256),
    birthMonth: z.string().transform(isNumber).transform(isInRange(1, 12)),
    birthDay: z.string().transform(isNumber).transform(isInRange(1, 31)),
    birthYear: z.string().transform(isNumber),
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
    email: z.string().email({ message: "Invalid email address" }),
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
    termsAgreements: z.boolean().refine((value) => value === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine(
    ({ password, confirmPassword }) => {
      console.log("password match validation");
      return password === confirmPassword;
    },
    {
      path: ["confirmPassword"],
      message: "Passwords must match",
    }
  )
  .refine(
    ({ birthMonth, birthDay, birthYear }) => {
      const date = new Date(birthYear, birthMonth - 1, birthDay);
      console.log("date", date);
      return date < thirteenYearsAgo;
    },
    {
      path: ["birthYear"],
      message: "You must be 13 or older",
    }
  );

type FormValues = z.infer<typeof SignupSchema>;

export const SignupEmail = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  console.log(form.formState.errors);
  const router = useRouter();
  const signupWithEmail = useMutation({
    mutationFn: signUpWithEmailAndPassword,
  });
  const handleSignup: SubmitHandler<FormValues> = async (data) => {
    console.log("made it to signup", data);
    try {
      await signupWithEmail.mutateAsync({
        email: data.email,
        password: data.password,
        fullName: data.firstName + " " + data.lastName,
        username: data.username,
      });
      router.push("/auth/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10">
      <BackButton />
      <h1 className="py-8">SIGN UP</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-3 mb-8"
        >
          <FormInputField
            control={form.control}
            name="firstName"
            placeholder="First Name"
            onClear={() => form.setValue("firstName", "")}
          />
          <FormInputField
            control={form.control}
            name="lastName"
            placeholder="Last Name"
            onClear={() => form.setValue("lastName", "")}
          />

          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="birthMonth"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
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
                  <Select onValueChange={field.onChange}>
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
                  <Select onValueChange={field.onChange}>
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
          <p className="text-black-secondary">
            You must be 13 years or older to use this platform.
          </p>
          <FormInputField
            control={form.control}
            name="username"
            placeholder="@username"
            onClear={() => form.setValue("username", "")}
          />
          <FormInputField
            control={form.control}
            name="email"
            placeholder="Email"
            onClear={() => form.setValue("email", "")}
          />

          <FormInputField
            control={form.control}
            name="password"
            placeholder="Password"
            type="password"
          />
          <FormInputField
            control={form.control}
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
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
            variant="secondary"
            className="bg-black-50 flex gap-2 my-5 w-[180px]"
            disabled={form.formState.isSubmitting}
          >
            SIGN UP
          </Button>
        </form>
      </Form>
    </div>
  );
};
