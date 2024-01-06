import { getUser } from "@/lib/firebase/firestore";
import { useUserSession } from "@/hooks/firebase/useUserSession";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
  const userSession = useUserSession(null);
  return useQuery({
    queryKey: ["currentUser", userSession?.uid],
    queryFn: () => getUser(userSession?.uid),
  });
};
