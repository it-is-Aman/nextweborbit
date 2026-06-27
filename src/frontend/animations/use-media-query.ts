'use client'

import { useState, useEffect } from 'react'

export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const media = window.matchMedia(query)
        const updateMatches = () => {
            if (media.matches !== matches) {
                setMatches(media.matches)
            }
        }

        // Initial check
        updateMatches()

        media.addEventListener('change', updateMatches)
        return () => media.removeEventListener('change', updateMatches)
    }, [query, matches])

    return matches
}

export function useIsMobile() {
    return useMediaQuery('(max-width: 768px)')
}

export function useIsLowPower() {
    // Basic check for low power/performance
    // Could be expanded with hardwareConcurrency or memory checks
    const isMobile = useIsMobile()
    return isMobile
}
