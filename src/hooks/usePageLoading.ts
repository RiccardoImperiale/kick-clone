'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useLoadingStore } from '@/state/loadingStore'

export function usePageLoading() {
    const pathname = usePathname()
    const setIsLoading = useLoadingStore(state => state.setIsLoading)

    useEffect(() => {
        setIsLoading(true)
        requestAnimationFrame(() => setIsLoading(false))
    }, [pathname, setIsLoading])
}
