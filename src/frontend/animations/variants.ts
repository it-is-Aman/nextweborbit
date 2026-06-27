/**
 * Reusable Framer Motion Animation Variants
 * Import and use these variants in your components
 * 
 * Example:
 * import { fadeInUp } from '@/frontend/animations/variants'
 * <motion.div variants={fadeInUp} initial="hidden" animate="visible" />
 */

import { Variants } from 'framer-motion'
import { DURATION, EASING } from './config'

// ============================================
// FADE ANIMATIONS
// ============================================

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: DURATION.normal, ease: EASING.easeOut }
    }
}

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: DURATION.normal, ease: EASING.easeOut }
    }
}

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: DURATION.normal, ease: EASING.easeOut }
    }
}

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: DURATION.slow, ease: EASING.easeOut }
    }
}

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: DURATION.slow, ease: EASING.easeOut }
    }
}

// ============================================
// SCALE ANIMATIONS
// ============================================

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: DURATION.normal, ease: EASING.easeOut }
    }
}

export const scaleUp: Variants = {
    hidden: { scale: 0 },
    visible: {
        scale: 1,
        transition: { duration: DURATION.slow, ease: EASING.bounce }
    }
}

export const scaleInBounce: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: DURATION.slow, ease: EASING.elastic }
    }
}

// ============================================
// SLIDE ANIMATIONS
// ============================================

export const slideInLeft: Variants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: DURATION.slow, ease: EASING.easeOut }
    }
}

export const slideInRight: Variants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: DURATION.slow, ease: EASING.easeOut }
    }
}

export const slideInUp: Variants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: DURATION.slow, ease: EASING.easeOut }
    }
}

export const slideInDown: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: DURATION.slow, ease: EASING.easeOut }
    }
}

// ============================================
// BLUR ANIMATIONS
// ============================================

export const blurIn: Variants = {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration: DURATION.slow, ease: EASING.smooth }
    }
}

export const blurInUp: Variants = {
    hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: { duration: DURATION.slow, ease: EASING.smooth }
    }
}

// ============================================
// ROTATE ANIMATIONS
// ============================================

export const rotateIn: Variants = {
    hidden: { opacity: 0, rotate: -180 },
    visible: {
        opacity: 1,
        rotate: 0,
        transition: { duration: DURATION.slow, ease: EASING.easeOut }
    }
}

export const flipIn: Variants = {
    hidden: { opacity: 0, rotateY: 90 },
    visible: {
        opacity: 1,
        rotateY: 0,
        transition: { duration: DURATION.slow, ease: EASING.easeOut }
    }
}

// ============================================
// STAGGER CONTAINER
// ============================================

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        }
    }
}

export const staggerContainerFast: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0,
        }
    }
}

export const staggerContainerSlow: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2,
        }
    }
}

// ============================================
// STAGGER ITEMS (use with stagger containers)
// ============================================

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: DURATION.normal, ease: EASING.easeOut }
    }
}

export const staggerItemScale: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: DURATION.normal, ease: EASING.easeOut }
    }
}

// ============================================
// HOVER ANIMATIONS
// ============================================

export const hoverScale = {
    scale: 1.05,
    transition: { duration: DURATION.fast }
}

export const hoverScaleLarge = {
    scale: 1.1,
    transition: { duration: DURATION.fast }
}

export const hoverLift = {
    y: -5,
    transition: { duration: DURATION.fast }
}

export const hoverGlow = {
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
    transition: { duration: DURATION.fast }
}

// ============================================
// TAP ANIMATIONS
// ============================================

export const tapScale = {
    scale: 0.95,
    transition: { duration: DURATION.instant }
}

export const tapScaleSmall = {
    scale: 0.98,
    transition: { duration: DURATION.instant }
}

// ============================================
// COMPLEX ANIMATIONS
// ============================================

export const expandOnScroll: Variants = {
    hidden: {
        opacity: 0,
        y: 150,
        scale: 0.5
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: DURATION.slower,
            ease: EASING.smooth
        }
    }
}

export const bottomToCenter: Variants = {
    hidden: {
        opacity: 0,
        y: 200,
        scale: 0.6
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: DURATION.slower,
            ease: EASING.smooth
        }
    }
}
