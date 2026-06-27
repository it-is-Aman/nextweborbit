'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { SpotlightButton } from '@/frontend/animations'
import { BlurReveal } from '@/frontend/animations'

export default function HeroSection() {
    const heroRef = useRef(null)

    useEffect(() => {
        gsap.fromTo(
            '.hero-line',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.12,
                duration: 1,
                ease: 'power3.out',
            }
        )

        gsap.to('.floating-element', {
            y: 20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        })
    }, [])

    return (
        <section
            ref={heroRef}
            className="relative pt-10 pb-7 px-6 flex flex-col items-center text-center bg-gradient-to-br from-white via-blue-50 to-white"
        >
            <div className="absolute inset-0 overflow-hidden">
                <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
                <div className="floating-element absolute bottom-20 right-10 w-32 h-32 bg-black rounded-full opacity-5 blur-xl"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-10 blur-lg"></div>
            </div>

            <p className="text-sm text-blue-600 font-semibold mb-3 tracking-wider">
                ABOUT NextWebOrbit
            </p>

            <div className="flex flex-col items-center">
                <BlurReveal className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-black leading-tight text-center justify-center">
                    WE BUILD EXPERIENCES
                </BlurReveal>
            </div>

            <p className="hero-line mt-8 max-w-4xl text-center text-gray-600 text-xl leading-relaxed">
                We are a premier digital agency dedicated to crafting exceptional websites,
                mobile applications, and digital experiences that drive business growth and
                establish market leadership across global markets.
            </p>
            <motion.div className="hero-line mt-12" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <SpotlightButton className="px-8 py-3 text-base bg-black text-white rounded-full shadow-lg">
                    Explore Our Work
                </SpotlightButton>
            </motion.div>
        </section>
    )
}
