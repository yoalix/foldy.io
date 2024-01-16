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
import { useToast } from "../ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const CreateFolderSchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof CreateFolderSchema>;

export const CreateFolder = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const modalTrigger = (
    <Button
      variant="secondary"
      className="bg-black-50 flex gap-2 my-5"
      onClick={() => setOpen(true)}
    >
      <img src="/icons/folder.png" width={20} />
      NEW FOLDER
    </Button>
  );
  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const supabase = createClient();
      await createFolder(supabase, { ...data, user_id: userId });
      toast({
        title: "Folder created",
        description: `Folder ${data.name} created successfully`,
      });

      queryClient.invalidateQueries({ queryKey: ["getFolders", userId] });
    } catch (error) {
      console.log(error);
      if (error instanceof Error && error.message) {
        form.setError("description", { message: error.message });
        toast({ title: error.message, variant: "destructive" });
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
        <Button type="submit" className="mt-8">
          <img src="/icons/plus.png" width={18} />
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
