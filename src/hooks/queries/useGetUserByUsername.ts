import { createClient } from "@/lib/supabase/client";
import { getUserByUsername } from "@/lib/supabase/db";
import { useQuery } from "@tanstack/react-query";

export const useGetUserByUsername = (username: string) => {
  const supabase = createClient();
  return useQuery({
    queryKey: ["getUserByUsername"],
    queryFn: async () => getUserByUsername(supabase, username),
  });
};
