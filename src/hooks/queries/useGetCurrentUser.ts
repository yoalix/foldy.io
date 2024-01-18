import { getUserProfile } from "@/lib/supabase/db";
import { useUserSession } from "@/hooks/queries/useUserSession";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export const useGetCurrentUser = () => {
  const { data: user } = useUserSession();
  const supabase = createClient();
  return useQuery({
    queryKey: ["currentUser", user?.id],
    queryFn: () => getUserProfile(supabase, user?.id),
  });
};
