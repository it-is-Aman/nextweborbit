'use client'

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false)
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 400 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
            setIsVisible(true)
        }

        const hideCursor = () => setIsVisible(false)

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mouseleave', hideCursor)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mouseleave', hideCursor)
        }
    }, [cursorX, cursorY])

    return (
        <>
            {/* Main Cursor Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-cursor mix-blend-difference bg-white"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.15 }}
            />

            {/* Outer Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white pointer-events-none z-cursor mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    opacity: isVisible ? 0.6 : 0,
                    scale: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
            />
        </>
    )
}
