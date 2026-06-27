/**
 * Central Animation Configuration
 * Import this file to use standardized animation settings across the app
 */

// Animation Durations (in seconds)
export const DURATION = {
    instant: 0.1,
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
    slower: 1.2,
    slowest: 1.5,
} as const

// Easing Functions
export const EASING = {
    // Standard easings
    linear: [0, 0, 1, 1],
    easeIn: [0.4, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
    easeInOut: [0.4, 0, 0.2, 1],

    // Custom easings
    smooth: [0.2, 0.65, 0.3, 0.9],
    bounce: [0.68, -0.55, 0.265, 1.55],
    elastic: [0.68, -0.6, 0.32, 1.6],

    // Spring-like
    spring: { type: "spring", stiffness: 500, damping: 30 },
    springBouncy: { type: "spring", stiffness: 400, damping: 20 },
    springSmooth: { type: "spring", stiffness: 300, damping: 40 },
} as const

// Common Transition Presets
export const TRANSITION = {
    default: {
        duration: DURATION.normal,
        ease: EASING.easeOut,
    },
    fast: {
        duration: DURATION.fast,
        ease: EASING.easeOut,
    },
    slow: {
        duration: DURATION.slow,
        ease: EASING.smooth,
    },
    spring: EASING.spring,
    springBouncy: EASING.springBouncy,
    springSmooth: EASING.springSmooth,
} as const

// Viewport Settings for scroll animations
export const VIEWPORT = {
    once: { once: true, margin: '-50px' },
    repeat: { once: false, margin: '-50px' },
    onceDeep: { once: true, margin: '-100px' },
    amount: (amount: number) => ({ once: true, amount }),
} as const

// Stagger Settings
export const STAGGER = {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
    slower: 0.2,
} as const

// GSAP Settings
export const GSAP_CONFIG = {
    magneticDuration: 1,
    magneticEase: "elastic.out(1, 0.3)",
    scrollTriggerMargin: "top 80%",
    mouseFollowDuration: { circle: 0.2, follow: 0.6 },
    mouseFollowEase: "power3",
} as const

// Smooth Scroll Settings (Lenis)
export const SMOOTH_SCROLL_CONFIG = {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical' as const,
    gestureOrientation: 'vertical' as const,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
} as const
