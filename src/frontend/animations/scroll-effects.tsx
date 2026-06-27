'use client'

import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame, useVelocity } from 'framer-motion'
import React, { ReactNode, useRef } from 'react'
import { wrap } from '@motionone/utils'
import { staggerContainer, staggerItem } from './variants'

interface AnimatedSectionProps {
    children: ReactNode
    delay?: number
    className?: string
    amount?: number
}

export const StaggerContainer = ({ children, className = '' }: AnimatedSectionProps) => {
    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const StaggerItem = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
    return (
        <motion.div
            variants={staggerItem}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const Parallax = ({ children, className = '', offset = 50 }: { children: ReactNode; className?: string; offset?: number }) => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })
    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset])

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div style={{ y }}>{children}</motion.div>
        </div>
    )
}

export const BottomToCenter = ({
    children,
    className = '',
}: AnimatedSectionProps) => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center']
    })

    const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 0.7, 1])
    const y = useTransform(scrollYProgress, [0, 0.5, 1], [200, 50, 0])
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.6, 0.8, 1, 1])

    return (
        <motion.div
            ref={ref}
            style={{ opacity, y, scale }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const ExpandOnScroll = ({
    children,
    className = '',
}: AnimatedSectionProps) => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center']
    })

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.3, 0.8, 1])
    const y = useTransform(scrollYProgress, [0, 0.5, 1], [150, 0, 0])
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 0.8, 1, 1.05])

    return (
        <motion.div
            ref={ref}
            style={{ opacity, y, scale }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const VelocityText = ({ children, baseVelocity = 100, className = "" }: { children: string; baseVelocity: number; className?: string }) => {
    const baseX = useMotionValue(0)
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    })
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    })

    const x = useTransform(baseX, (v: number) => `${wrap(-20, -45, v)}%`)

    const directionFactor = useRef<number>(1)
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get()

        baseX.set(baseX.get() + moveBy)
    })

    return (
        <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
            <motion.div className={`font-black uppercase text-6xl md:text-9xl flex whitespace-nowrap flex-nowrap ${className}`} style={{ x }}>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
            </motion.div>
        </div>
    )
}

export const SkewScrollText = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const skewVelocity = useSpring(scrollVelocity, {
        stiffness: 100,
        damping: 30
    })
    const skewX = useTransform(skewVelocity, [-1000, 1000], [10, -10])

    return (
        <motion.div style={{ skewX }} className={className}>
            {children}
        </motion.div>
    )
}
