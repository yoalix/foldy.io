import { supabase } from "@/lib/supabase/auth/client";
import { getUserSocials } from "@/lib/supabase/db";
import { useQuery } from "@tanstack/react-query";

export const useGetUserSocials = (userId?: string) => {
  return useQuery({
    queryKey: ["userSocials", userId],
    queryFn: () => getUserSocials(supabase, userId),
  });
};
