import Image from 'next/image'
import { Profile } from '@/components/Profile'
import { Suspense } from 'react'

export default function Home() {
    return (<main>
        <Suspense fallback={<div>Loading...</div>}>
        <Profile />
        </Suspense>
    </main>
    )
}
