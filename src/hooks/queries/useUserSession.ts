import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function useUserSession() {
  const supabase = createClient();
  return useQuery({
    queryKey: ["session"],
    queryFn: () =>
      supabase.auth.getUser().then((res) => {
        if (res.error) {
          throw res.error;
        }
        return res.data;
      }),
  });
}
