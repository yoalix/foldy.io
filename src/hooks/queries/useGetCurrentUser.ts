import { getCurrentUserProfile, getUserProfile } from "@/lib/supabase/db";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export const useGetCurrentUser = () => {
  const supabase = createClient();
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUserProfile(supabase),
  });
};
