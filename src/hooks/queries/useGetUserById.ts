import { createClient } from "@/lib/supabase/client";
import { getUserProfile } from "@/lib/supabase/db";
import { useQuery } from "@tanstack/react-query";

export const useGetUserById = (id: string) => {
  const supabase = createClient();
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserProfile(supabase, id),
  });
};
