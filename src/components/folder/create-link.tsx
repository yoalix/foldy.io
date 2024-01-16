import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormInputField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Folder } from "@/components/icons/folder";
import { CreateLink as CreateLinkDb, createLink } from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/client";
import { revalidatePath } from "next/cache";
import { toast } from "../ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export const CreateLink = ({ folderId }: { folderId: string }) => {
  const queryClient = useQueryClient();
  const form = useForm<CreateLinkDb>({
    defaultValues: {
      name: "",
      url: "",
      folder_id: folderId,
    },
  });

  const [open, setOpen] = React.useState(false);
  const modalTrigger = (
    <Button
      variant="secondary"
      className="bg-black-50 flex gap-2 my-5 w-[180px]"
      onClick={() => setOpen(true)}
    >
      <img src="/icons/plus.png" width={20} />
      NEW LINK
    </Button>
  );
  const handleSubmit: SubmitHandler<CreateLinkDb> = async (data) => {
    try {
      const supabase = createClient();
      await createLink(supabase, data);
      toast({
        title: "Link created",
        description: `Link ${data.url} created successfully`,
      });
      queryClient.invalidateQueries({ queryKey: ["getFolder", folderId] });
    } catch (error) {
      console.log(error);
      if (error instanceof Error && error.message) {
        form.setError("url", { message: error.message });
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
          name="url"
          placeholder="Link Address"
          onClear={() => form.setValue("url", "")}
        />
        <FormInputField
          control={form.control}
          name="name"
          placeholder="Name for Link (optional)"
          onClear={() => form.setValue("name", "")}
          icon={<Folder />}
        />
        <Button type="submit" className="mt-8">
          <img src="/icons/plus.png" width={18} />
          Create New Link
        </Button>
      </form>
    </Form>
  );
  return (
    <Modal
      open={open}
      onOpenChange={(isOpen) => setOpen(isOpen)}
      title="New Link"
      trigger={modalTrigger}
      content={modalContent}
    />
  );
};
