import React from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Folder } from "@/components/icons/folder";

export const CreateFolder = () => {
  const form = useForm();
  const modalTrigger = (
    <Button variant="secondary" className="bg-black-50 flex gap-2 text-sm my-5">
      <img src="/icons/folder.png" width={20} />
      NEW FOLDER
    </Button>
  );
  const ModalContent = () => (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => console.log(data))}
        className="flex flex-col gap-3 mb-8"
      >
        <FormField
          control={form.control}
          name="foldername"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Name for Folder"
                  {...field}
                  icon={<Folder />}
                  onClear={() => form.setValue("foldername", "")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Description (optional)"
                  {...field}
                  onClear={() => form.setValue("description", "")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
      content={<ModalContent />}
    />
  );
};
