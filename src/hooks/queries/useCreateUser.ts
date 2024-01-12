import { createClient } from "@/lib/supabase/client";
import { createUser, CreateUser } from "@/lib/supabase/db";
import { useMutation } from "@tanstack/react-query";

export const useCreateUser = () => {
  const supabase = createClient();
  return useMutation({
    mutationFn: (user: CreateUser) => createUser(supabase, user),
  });
};
