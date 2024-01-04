
import React from "react";
import { useForm } from "react-hook-form";
import { Modal } from "./ui/modal";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Folder } from "./icons/folder";

export const CreateLink = () => {
  const form = useForm();
  const modalTrigger = (
    <Button variant="secondary" className="bg-black-50 flex gap-2 text-sm my-5 w-[180px]">
      <img src="/icons/plus.png" width={20}/>
      NEW LINK
    </Button>
  );
  const ModalContent = () => (
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => console.log(data))}
            className="flex flex-col gap-3 mb-8">
          <FormField
            control={form.control}
            name="linkName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Name for Link (optional)"
                    {...field}
                    icon={<Folder />}
                    onClear={() => form.setValue("linkName", "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Link Address"
                    {...field}
                    onClear={() => form.setValue("link", "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
      title="New Link"
      trigger={modalTrigger}
      content={<ModalContent />}
    />
  );
};
