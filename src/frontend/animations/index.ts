/**
 * Central Animation Exports
 * Import everything you need from this single file
 * 
 * Example:
 * import { fadeInUp, useParallax, DURATION, FadeInUp } from '@/frontend/animations'
 */

// Configuration
export * from './config'

// Variants
export * from './variants'

// GSAP Effects (selective export to avoid conflicts)
export {
    createScrollTrigger,
    createStaggerScrollTrigger,
    setupMouseFollow,
    setupMagneticEffect,
    setupCircularText,
} from './gsap-effects'

// Animation Components
export {
    AnimatedSection,
    FadeInUp,
    ScaleIn,
    SlideInLeft,
    SlideInRight,
    BlurReveal,
    StaggerContainer,
    StaggerItem,
    Parallax,
    BottomToCenter,
    ExpandOnScroll,
    Magnetic,
    ShuffleText,
    SlotTextReveal,
    SpotlightButton,
    TiltCard,
    VelocityText,
    SkewScrollText,
    MouseEffect,
    CircularText,
} from './components'

// Providers
export { default as SmoothScroll } from './smooth-scroll'
