'use client'

import { useEffect, useState } from 'react'

/**
 * Custom hook to detect media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    return typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

