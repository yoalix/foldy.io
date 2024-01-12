import { getUserProfile } from "@/lib/supabase/db";
import { useUserSession } from "@/hooks/queries/useUserSession";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export const useGetCurrentUser = () => {
  const { data } = useUserSession();
  const supabase = createClient();
  return useQuery({
    queryKey: ["currentUser", data?.user?.id],
    queryFn: () => getUserProfile(supabase, data?.user?.id),
  });
};
