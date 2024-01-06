import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { FirebaseUser } from "@/lib/firebase/firebase";

export function useUserSession(initialUser?: FirebaseUser | null) {
  const [user, setUser] = useState(initialUser);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    onAuthStateChanged((u) => {
      if (!user) return;
      if (user?.email !== u?.email) {
        router.refresh();
      }
    });
  }, [user]);
  return user;
}
