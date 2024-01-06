import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './button'
import { LeftArrow } from '@/components/icons/left-arrow'

export const BackButton = () => {
    const router = useRouter();
    return (
        <Button
            className="self-start mb-3 p-0 gap-1"
            variant="ghost"
            onClick={() => router.back()}
        >
            <LeftArrow />
            Back
        </Button>

    )
}
