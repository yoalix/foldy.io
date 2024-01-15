import { createClient } from "@/lib/supabase/client";
import { getFolders } from "@/lib/supabase/db";
import { useQuery } from "@tanstack/react-query";

export const useGetFolders = (uid: string) => {
  const supabase = createClient();
  return useQuery({
    queryKey: ["getFolders", uid],
    queryFn: () => getFolders(supabase, uid),
  });
};
