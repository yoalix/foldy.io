import { ExploreUsersBySearch } from "@/lib/prisma/db";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSearch = (search: string | null) => {
  return useQuery<ExploreUsersBySearch | null>({
    queryKey: ["search", search],
    queryFn: async () =>
      search
        ? axios(`/api/search?search=${search}`).then((data) => data.data)
        : null,
  });
};
