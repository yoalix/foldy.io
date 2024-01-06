import { createUser, CreateUser } from "@/lib/firebase/firestore";
import { useMutation } from "@tanstack/react-query";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (user: CreateUser) => createUser(user),
  });
};
