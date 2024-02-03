"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Form, FormInputField } from "@/components/ui/form";
import {
  CreateFolder as CreateFolderDb,
  createFolder,
} from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/client";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Folder } from "lucide-react";
import Link from "next/link";

const CreateFolderSchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof CreateFolderSchema>;

export const CreateFolder = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [open, setOpen] = useState(false);
  const modalTrigger = (
    <Button
      variant="ghost"
      accent="primary"
      className="flex justify-start gap-2 py-6 text-sm font-bold w-full"
      onClick={() => setOpen(true)}
    >
      <Folder className="w-5 h-5 flex-shrink-0" strokeWidth={1.3} />
      Tap to Add New Folder
    </Button>
  );
  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const supabase = createClient();
      await createFolder(supabase, { ...data, user_id: userId });
      toast("Folder created", {
        description: `Folder ${data.name} created successfully`,
      });

      router.refresh();
    } catch (error) {
      console.log(error);
      if (error instanceof Error && error.message) {
        form.setError("description", { message: error.message });
        toast.error(error.message);
      }
    }
    setOpen(false);
  };
  const modalContent = (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-3 mb-8"
      >
        <FormInputField
          control={form.control}
          name="name"
          placeholder="Name for Folder"
          onClear={() => form.setValue("name", "")}
        />
        <FormInputField
          control={form.control}
          name="description"
          placeholder="Description (optional)"
          onClear={() => form.setValue("description", "")}
        />
        <Button
          type="submit"
          className="mt-8"
          disabled={form.formState.isSubmitting}
        >
          <Image src="/icons/plus.png" alt="plus icon" width={18} height={18} />
          Create New Folder
        </Button>
      </form>
    </Form>
  );
  return (
    <Modal
      title="New Folder"
      trigger={modalTrigger}
      content={modalContent}
      open={open}
      onOpenChange={(isOpen) => setOpen(isOpen)}
    />
  );
};
