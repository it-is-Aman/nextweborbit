/**
 * Custom Animation Hooks
 * Import and use these hooks for common animation patterns
 * 
 * Example:
 * import { useScrollAnimation } from '@/frontend/animations/hooks'
 * const { ref, style } = useScrollAnimation('fadeInUp')
 * <div ref={ref} style={style}>Content</div>
 */

import { useRef, useEffect } from 'react'
import { useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import gsap from 'gsap'
import { GSAP_CONFIG } from '../animations/config'

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Hook for parallax scroll effect
 * @param offset - Amount of parallax movement (default: 50)
 */
export function useParallax(offset = 50) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })
    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset])

    return { ref, y }
}

/**
 * Hook for scroll-based opacity and position
 */
export function useScrollFade() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center']
    })

    const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 0.7, 1])
    const y = useTransform(scrollYProgress, [0, 0.5, 1], [200, 50, 0])
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.6, 0.8, 1, 1])

    return { ref, opacity, y, scale }
}

/**
 * Hook for scroll-based expansion effect
 */
export function useScrollExpand() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center']
    })

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.3, 0.8, 1])
    const y = useTransform(scrollYProgress, [0, 0.5, 1], [150, 0, 0])
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 0.8, 1, 1.05])

    return { ref, opacity, y, scale }
}

// ============================================
// GSAP ANIMATIONS
// ============================================

/**
 * Hook for magnetic hover effect (GSAP)
 * @param strength - Magnetic pull strength (default: 0.35)
 */
export function useMagneticEffect(strength = 0.35) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const xTo = gsap.quickTo(element, "x", {
            duration: GSAP_CONFIG.magneticDuration,
            ease: GSAP_CONFIG.magneticEase
        })
        const yTo = gsap.quickTo(element, "y", {
            duration: GSAP_CONFIG.magneticDuration,
            ease: GSAP_CONFIG.magneticEase
        })

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e
            const { height, width, left, top } = element.getBoundingClientRect()
            const x = clientX - (left + width / 2)
            const y = clientY - (top + height / 2)
            xTo(x * strength)
            yTo(y * strength)
        }

        const handleMouseLeave = () => {
            xTo(0)
            yTo(0)
        }

        element.addEventListener("mousemove", handleMouseMove)
        element.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            element.removeEventListener("mousemove", handleMouseMove)
            element.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [strength])

    return ref
}

// ============================================
// VELOCITY & SKEW ANIMATIONS
// ============================================

/**
 * Hook for velocity-based text scrolling
 * @param baseVelocity - Base scroll speed (default: 100)
 */
export function useVelocityScroll() {
    const baseX = useMotionValue(0)
    // const { scrollY } = useScroll()

    // Note: useVelocity and useAnimationFrame need to be imported from framer-motion
    // This is a simplified version
    const x = useTransform(baseX, (v: number) => `${v % 100}%`)

    return { x, baseX }
}

/**
 * Hook for scroll velocity-based skew
 */
export function useScrollSkew() {
    // const { scrollY } = useScroll()

    // Create velocity from scroll
    const scrollVelocity = useMotionValue(0)
    const skewVelocity = useSpring(scrollVelocity, {
        stiffness: 100,
        damping: 30
    })
    const skewX = useTransform(skewVelocity, [-1000, 1000], [10, -10])

    return { skewX }
}

// ============================================
// 3D TILT EFFECT
// ============================================

/**
 * Hook for 3D tilt card effect
 */
export function useTiltEffect() {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseXFromCenter = e.clientX - rect.left - width / 2
        const mouseYFromCenter = e.clientY - rect.top - height / 2

        x.set(mouseXFromCenter / width)
        y.set(mouseYFromCenter / height)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return {
        rotateX,
        rotateY,
        handleMouseMove,
        handleMouseLeave,
    }
}

// ============================================
// SPOTLIGHT EFFECT
// ============================================

/**
 * Hook for spotlight button effect
 */
export function useSpotlightEffect() {
    const elementRef = useRef<HTMLButtonElement>(null)
    const [hoverPos, setHoverPos] = React.useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = React.useState(false)

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        if (!elementRef.current) return
        const rect = elementRef.current.getBoundingClientRect()
        setHoverPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        })
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return {
        elementRef,
        hoverPos,
        isHovered,
        handleMouseEnter,
        handleMouseLeave,
    }
}

// Type fix for React import
import React from 'react'
