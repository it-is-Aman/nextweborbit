'use client'

import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'
import { fadeInUp, scaleIn, slideInLeft, slideInRight } from './variants'

interface AnimatedSectionProps {
    children: ReactNode
    delay?: number
    className?: string
    amount?: number
}

export const AnimatedSection = ({ children, delay = 0, className = '' }: AnimatedSectionProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const FadeInUp = ({ children, delay = 0, className = '' }: AnimatedSectionProps) => {
    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const ScaleIn = ({ children, delay = 0, className = '' }: AnimatedSectionProps) => {
    return (
        <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const SlideInLeft = ({ children, delay = 0, className = '' }: AnimatedSectionProps) => {
    return (
        <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const SlideInRight = ({ children, delay = 0, className = '' }: AnimatedSectionProps) => {
    return (
        <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const BlurReveal = ({ children, delay = 0, className = '' }: AnimatedSectionProps & { children: string }) => {
    const words = children.split(' ')
    return (
        <motion.div className={`flex flex-wrap gap-[0.25em] ${className}`}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                    whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                        duration: 0.8,
                        delay: delay + i * 0.1,
                        ease: [0.2, 0.65, 0.3, 0.9]
                    }}
                    className="inline-block"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    )
}
