'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SMOOTH_SCROLL_CONFIG } from './config'

export default function SmoothScroll() {
    useEffect(() => {
        // Disable on mobile to prevent touch conflicts and save resources
        if (window.innerWidth < 768) return

        // Initialize Lenis
        const lenis = new Lenis({
            ...SMOOTH_SCROLL_CONFIG,
        })

        // 1. Sync ScrollTrigger with Lenis scroll events
        lenis.on('scroll', ScrollTrigger.update)

        // 2. Essential RAF loop to drive the scroll engine
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        const rafId = requestAnimationFrame(raf)

        // 3. Initial refresh to ensure ScrollTrigger positions are correct
        const timer = setTimeout(() => {
            ScrollTrigger.refresh()
        }, 1000)

        return () => {
            cancelAnimationFrame(rafId)
            lenis.destroy()
            clearTimeout(timer)
        }
    }, [])

    return null
}
