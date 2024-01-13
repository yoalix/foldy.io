import { createClient } from "@/lib/supabase/client";
import { getUserByUsername, getUserProfile } from "@/lib/supabase/db";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = (initialUsername?: string) => {
  const supabase = createClient();

  return useQuery({
    queryKey: ["getProfile", initialUsername],
    queryFn: initialUsername
      ? async () => getUserByUsername(supabase, initialUsername)
      : async () => {
          const { data, error } = await supabase.auth.getUser();
          if (error) throw error;
          return getUserProfile(supabase, data?.user?.id);
        },
  });
};
