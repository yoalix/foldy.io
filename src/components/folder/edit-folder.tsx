"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Form, FormInputField } from "@/components/ui/form";
import { UpdateFolder, updateFolder } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "../ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useGetUserByUsername } from "@/hooks/queries/useGetUserByUsername";
import { useGetFolder } from "@/hooks/queries/useGetFolder";
import { z } from "zod";
import Image from "next/image";

const EditFolderSchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z.string().optional(),
});

type Props = {
  username: string;
  folderId: string;
};

type FormValues = z.infer<typeof EditFolderSchema>;

export const EditFolder = ({ username, folderId }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: user } = useGetUserByUsername(username);
  const { data: folder } = useGetFolder(folderId);

  const form = useForm<FormValues>({
    defaultValues: {
      name: folder?.name,
      description: folder?.description || "",
    },
  });
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const supabase = createClient();
      const updateData: UpdateFolder = {
        id: folderId,
        user_id: user!.id,
      };
      if (data.name !== folder?.name) {
        updateData.name = data.name;
      }
      if (data.description !== folder?.description) {
        updateData.description = data.description;
      }
      await updateFolder(supabase, updateData);
      toast({
        title: "Folder updated",
        description: `Folder ${data.name} updated successfully`,
      });

      queryClient.invalidateQueries({ queryKey: ["getFolder", folderId] });
    } catch (error) {
      console.log(error);
      if (error instanceof Error && error.message) {
        form.setError("description", { message: error.message });
        toast({ title: error.message, variant: "destructive" });
      }
    }
    setOpen(false);
    router.back();
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
