
import { Profile } from "@/components/profile";
import { Suspense } from "react";

export default function Home() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <Profile />
            </Suspense>
        </main>
    );
}
