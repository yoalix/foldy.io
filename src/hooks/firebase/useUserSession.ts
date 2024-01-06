import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export function useUserSession(initialUser) {
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
