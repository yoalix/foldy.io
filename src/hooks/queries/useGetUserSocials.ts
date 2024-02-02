import { createClient } from "@/lib/supabase/client";
import { getUserSocials } from "@/lib/supabase/db";
import { useQuery } from "@tanstack/react-query";

export const useGetUserSocials = (userId?: string) => {
  const supabase = createClient();
  return useQuery({
    queryKey: ["userSocials", userId],
    queryFn: () => getUserSocials(supabase, userId),
  });
};
