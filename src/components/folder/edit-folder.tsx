"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Form, FormInputField } from "@/components/ui/form";
import { Folder, UpdateFolder, User, updateFolder } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateFolderAction } from "@/actions/updateFolder";

const EditFolderSchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z.string().optional(),
});

type Props = {
  user: User | null;
  folder: Folder | null;
};

type FormValues = z.infer<typeof EditFolderSchema>;

export const EditFolder = ({ user, folder }: Props) => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(EditFolderSchema),
    defaultValues: {
      name: folder?.name,
      description: folder?.description || "",
    },
  });
  const [open, setOpen] = useState(true);

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const supabase = createClient();
      if (!user || !folder) return;
      const updateData: UpdateFolder = {
        id: folder?.id,
        user_id: user!.id,
      };
      if (data.name && data.name !== folder?.name) {
        updateData.name = data.name;
      }
      if (data.description && data.description !== folder?.description) {
        updateData.description = data.description;
      }
      await updateFolderAction(user.username, updateData);
      toast("Folder updated", {
        description: `Folder ${folder?.name} updated successfully`,
      });

      setOpen(false);
      router.back();
    } catch (error) {
      console.log(error);
      if (error instanceof Error && error.message) {
        form.setError("description", { message: error.message });
        toast.error(error.message);
      }
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen === false) {
      router.back();
    }
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
          value={form.watch("name")}
          onClear={() => form.setValue("name", "")}
        />
        <FormInputField
          control={form.control}
          name="description"
          placeholder="Description (optional)"
          onClear={() => form.setValue("description", "")}
        />
        <Button type="submit" className="mt-8">
          <Image src="/icons/plus.png" alt="plus icon" width={18} height={18} />
          Save Folder
        </Button>
      </form>
    </Form>
  );
  return (
    <Modal
      title="Edit Folder"
      content={modalContent}
      open={open}
      onOpenChange={handleOpenChange}
    />
  );
};
