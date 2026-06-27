/**
 * GSAP Animation Effects
 * Import these for GSAP-specific animations
 * 
 * Example:
 * import { createScrollTrigger } from '@/frontend/animations/gsap-effects'
 * createScrollTrigger('.my-element', { from: { opacity: 0 }, to: { opacity: 1 } })
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GSAP_CONFIG } from './config'

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

// ============================================
// SCROLL TRIGGER UTILITIES
// ============================================

/**
 * Create a scroll-triggered animation
 */
export function createScrollTrigger(
    target: string | Element,
    config: {
        from?: gsap.TweenVars
        to: gsap.TweenVars
        trigger?: string | Element
        start?: string
        end?: string
        scrub?: boolean | number
        markers?: boolean
    }
) {
    const { from, to, trigger, start = 'top 80%', end, scrub = false, markers = false } = config

    if (from) {
        return gsap.fromTo(target, from, {
            ...to,
            scrollTrigger: {
                trigger: trigger || target,
                start,
                end,
                scrub,
                markers,
            }
        })
    }

    return gsap.to(target, {
        ...to,
        scrollTrigger: {
            trigger: trigger || target,
            start,
            end,
            scrub,
            markers,
        }
    })
}

/**
 * Create stagger scroll animation
 */
export function createStaggerScrollTrigger(
    target: string,
    config: {
        from?: gsap.TweenVars
        to: gsap.TweenVars
        stagger?: number
        start?: string
        markers?: boolean
    }
) {
    const { from, to, stagger = 0.1, start = 'top 80%', markers = false } = config

    if (from) {
        return gsap.fromTo(target, from, {
            ...to,
            stagger,
            scrollTrigger: {
                trigger: target,
                start,
                markers,
            }
        })
    }

    return gsap.to(target, {
        ...to,
        stagger,
        scrollTrigger: {
            trigger: target,
            start,
            markers,
        }
    })
}

// ============================================
// MOUSE EFFECTS
// ============================================

/**
 * Setup mouse follow effect
 */
export function setupMouseFollow(
    circleElement: HTMLElement,
    followElement: HTMLElement,
    scope?: React.RefObject<Element | null>
) {
    const xTo = gsap.quickTo(circleElement, "x", {
        duration: GSAP_CONFIG.mouseFollowDuration.circle,
        ease: GSAP_CONFIG.mouseFollowEase
    })
    const yTo = gsap.quickTo(circleElement, "y", {
        duration: GSAP_CONFIG.mouseFollowDuration.circle,
        ease: GSAP_CONFIG.mouseFollowEase
    })

    const xFollow = gsap.quickTo(followElement, "x", {
        duration: GSAP_CONFIG.mouseFollowDuration.follow,
        ease: GSAP_CONFIG.mouseFollowEase
    })
    const yFollow = gsap.quickTo(followElement, "y", {
        duration: GSAP_CONFIG.mouseFollowDuration.follow,
        ease: GSAP_CONFIG.mouseFollowEase
    })

    const ctx = gsap.context(() => {
        gsap.set(circleElement, { xPercent: -50, yPercent: -50 })
        gsap.set(followElement, { xPercent: -50, yPercent: -50 })
    }, scope)

    return {
        update: (x: number, y: number) => {
            xTo(x)
            yTo(y)
            xFollow(x)
            yFollow(y)
        },
        kill: () => ctx.revert()
    }
}

/**
 * Setup magnetic effect on element
 */
export function setupMagneticEffect(
    element: HTMLElement,
    strength = 0.35
) {
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
}

// ============================================
// CIRCULAR TEXT ANIMATION
// ============================================

/**
 * Setup circular text animation
 */
export function setupCircularText(
    svg: SVGSVGElement,
    text: string,
    duration = 21
) {
    const ctx = gsap.context(() => {
        const pathId = `path-${Math.random().toString(36).substr(2, 9)}`
        const path = svg.querySelector("path")

        if (path) {
            gsap.set(path, {
                attr: { id: pathId, fill: "none", stroke: "none" }
            })
        }

        const textPath1 = svg.querySelector(".text-path-1")
        const textPath2 = svg.querySelector(".text-path-2")

        if (textPath1 && textPath2) {
            textPath1.setAttribute("href", `#${pathId}`)
            textPath2.setAttribute("href", `#${pathId}`)

            const props = { duration, ease: "none", repeat: -1 }

            gsap.fromTo(
                textPath1,
                { attr: { startOffset: "0%" } },
                { attr: { startOffset: "-100%" }, ...props }
            )

            gsap.fromTo(
                textPath2,
                { attr: { startOffset: "100%" } },
                { attr: { startOffset: "0%" }, ...props }
            )
        }
    }, svg)

    return () => ctx.revert()
}

// ============================================
// COMMON GSAP ANIMATIONS
// ============================================

/**
 * Fade in animation
 */
export function fadeIn(target: string | Element, duration = 0.5, delay = 0) {
    return gsap.fromTo(target,
        { opacity: 0 },
        { opacity: 1, duration, delay }
    )
}

/**
 * Slide in from left
 */
export function slideInLeft(target: string | Element, duration = 0.8, delay = 0) {
    return gsap.fromTo(target,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration, delay, ease: 'power2.out' }
    )
}

/**
 * Slide in from right
 */
export function slideInRight(target: string | Element, duration = 0.8, delay = 0) {
    return gsap.fromTo(target,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration, delay, ease: 'power2.out' }
    )
}

/**
 * Scale in animation
 */
export function scaleIn(target: string | Element, duration = 0.6, delay = 0) {
    return gsap.fromTo(target,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration, delay, ease: 'back.out(1.7)' }
    )
}
