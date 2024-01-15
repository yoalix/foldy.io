import { createClient } from "@/lib/supabase/client";
import { getFolder } from "@/lib/supabase/db";
import { useQuery } from "@tanstack/react-query";

export const useGetFolder = (folderId: string) => {
  const supabase = createClient();
  return useQuery({
    queryKey: ["getFolder", folderId],
    queryFn: () => getFolder(supabase, folderId),
  });
};
