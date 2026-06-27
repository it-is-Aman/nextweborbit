'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

// const ThreeBackground = dynamic(() => import('./three-background'), { ssr: false })
const FloatingReviews = dynamic(() => import('./floating-reviews'), { ssr: false })
const SpotlightButton = dynamic(() => import('@/frontend/animations').then(mod => mod.SpotlightButton), { ssr: false })

import { ArrowRight, ArrowDown } from 'lucide-react'

const Hero = () => {
    return (
        <section className="relative bg-[#050505] text-white min-h-[90vh] flex items-center overflow-hidden py-16 md:py-24">
            {/* Background High-Tech Wireframe Polyhedron (Mockup Style) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-[600px] h-[600px] opacity-20 pointer-events-none hidden lg:block z-0">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white/40 stroke-[0.3]" fill="none" stroke="currentColor">
                    {/* Polyhedron outer lines */}
                    <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" />
                    <line x1="50" y1="5" x2="50" y2="95" />
                    <line x1="10" y1="30" x2="90" y2="70" />
                    <line x1="10" y1="70" x2="90" y2="30" />
                    {/* Inner connections */}
                    <polygon points="50,20 78,38 78,62 50,80 22,62 22,38" />
                    <line x1="50" y1="20" x2="50" y2="80" />
                    <line x1="22" y1="38" x2="78" y2="62" />
                    <line x1="22" y1="62" x2="78" y2="38" />
                    {/* Cross bridges */}
                    <line x1="50" y1="5" x2="50" y2="20" />
                    <line x1="90" y1="30" x2="78" y2="38" />
                    <line x1="90" y1="70" x2="78" y2="62" />
                    <line x1="50" y1="95" x2="50" y2="80" />
                    <line x1="10" y1="70" x2="22" y2="62" />
                    <line x1="10" y1="30" x2="22" y2="38" />
                </svg>
            </div>

            {/* Floating Reviews background accent */}
            <FloatingReviews />

            {/* Left Vertical Text "HOMEPAGE" */}
            <div className="absolute left-4 bottom-12 hidden xl:flex flex-col items-center gap-4 z-10 pointer-events-none select-none">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 [writing-mode:vertical-lr] rotate-180">
                    HOMEPAGE
                </span>
                <div className="w-[1px] h-12 bg-white/20" />
            </div>

            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column Content */}
                    <div className="lg:col-span-8 flex flex-col space-y-8 text-left">
                        {/* Title Heading */}
                        <motion.h1 
                            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-white"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            We Build <br className="hidden sm:inline" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
                                High-Performance
                            </span> <br />
                            Digital Systems That <br className="hidden sm:inline" />
                            Drive Real Business Growth
                        </motion.h1>

                        {/* Subheadline Paragraph */}
                        <motion.p 
                            className="text-base sm:text-lg md:text-xl font-light text-neutral-400 leading-relaxed max-w-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        >
                            Web Development, UI/UX, Apps, SEO, and Digital Marketing — everything you need to scale your business with modern technology.
                        </motion.p>

                        {/* Interactive Buttons */}
                        <motion.div 
                            className="flex flex-wrap items-center gap-6 pt-4"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {/* Orange Pill Button "WHAT WE DO" */}
                            <Link href="/#services" className="group flex items-center bg-[#FF9F00] hover:bg-[#e08c00] text-black font-bold uppercase tracking-wider text-xs sm:text-sm px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98]">
                                What We Do
                                <span className="ml-3 w-7 h-7 rounded-full bg-black text-[#FF9F00] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                                </span>
                            </Link>

                            {/* View Works Outlined Button */}
                            <Link href="/portfolio" className="group flex items-center text-white hover:text-[#FF9F00] font-bold uppercase tracking-wider text-xs sm:text-sm transition-colors duration-300">
                                View Works
                                <span className="ml-3 w-8 h-8 rounded-full border border-white/30 group-hover:border-[#FF9F00] flex items-center justify-center transition-all group-hover:translate-x-1">
                                    <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom-Right Rotating Scroll Down Badge */}
            <div className="absolute right-8 bottom-8 z-20 pointer-events-auto hidden md:block">
                <div className="relative w-28 h-28 flex items-center justify-center">
                    {/* Rotating text svg */}
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_12s_linear_infinite] select-none pointer-events-none">
                        <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                        <text className="text-[7.2px] font-mono uppercase fill-neutral-400 tracking-[0.25em] font-semibold">
                            <textPath href="#circlePath">SCROLL DOWN • SCROLL DOWN • </textPath>
                        </text>
                    </svg>
                    
                    {/* Centered Orange Circle with down arrow */}
                    <div className="absolute w-11 h-11 rounded-full bg-[#FF9F00] flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-110 active:scale-95 transition-transform"
                         onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                        <ArrowDown className="w-5 h-5 text-black stroke-[2.5]" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
