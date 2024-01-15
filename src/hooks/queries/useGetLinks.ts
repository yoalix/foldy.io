import { createClient } from "@/lib/supabase/client";
import { getLinks } from "@/lib/supabase/db";
import { useQuery } from "@tanstack/react-query";

export const useGetLinks = (uid: string) => {
  const supabase = createClient();
  return useQuery({
    queryKey: ["getLinks", uid],
    queryFn: () => getLinks(supabase, uid),
  });
};
