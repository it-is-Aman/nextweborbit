'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SlotTextReveal, SpotlightButton, TiltCard, Magnetic } from '@/frontend/animations'
import { StatsBar } from './stats-bar'

export const HeroSection = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center bg-background text-foreground pt-32 pb-16 overflow-hidden">
            {/* Advanced Pro Background: Grid, Aurora, and Grain */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Custom Grid with Plus Markers */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

                {/* Aurora Blurred Blobs */}
                <motion.div
                    animate={{
                        x: [0, 100, -50, 0],
                        y: [0, -50, 50, 0],
                        scale: [1, 1.2, 0.8, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full mix-blend-screen opacity-40"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 120, 0],
                        y: [0, 60, -40, 0],
                        scale: [1, 0.9, 1.1, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full mix-blend-screen opacity-30"
                />
            </div>

            {/* UI Metadata & Breadcrumbs */}
            <div className="absolute top-40 left-6 lg:left-12 z-20 hidden md:block">
                <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] opacity-30 uppercase">
                    <span className="text-primary">01</span>
                    <span className="w-8 h-[1px] bg-foreground/20" />
                    <span>Services</span>
                    <span className="text-foreground/40">/</span>
                    <span>App Development</span>
                </div>
            </div>

            <div className="absolute bottom-12 right-12 z-20 hidden lg:block">
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-20 uppercase text-right leading-loose">
                    [ SYS_META: 0x882 ]<br />
                    V: 4.1.0_LATEST<br />
                    CORE_RES: 1440PX
                </div>
            </div>

            <div className="container mx-auto max-w-[1440px] px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="relative inline-block">
                            <span className="text-primary font-bold text-sm mb-6 block tracking-[0.3em] uppercase opacity-80">
                                Engineering Hub
                            </span>
                            <div className="absolute -left-4 top-0 w-[1px] h-full bg-primary/30" />
                        </div>

                        <h1 className="font-bold text-foreground tracking-tight uppercase leading-[0.85] text-[clamp(2.5rem,7vw,6rem)] mb-10">
                            <SlotTextReveal text="ENGINEERING DIGITAL DOMINANCE" className="block" />
                        </h1>

                        <p className="text-lg md:text-xl max-w-xl font-light opacity-60 leading-relaxed text-muted-foreground mb-12 border-l border-white/5 pl-8">
                            We architect high-performance digital ecosystems.
                            From microservices to massive scale, we build the foundations
                            of modern enterprise software.
                        </p>

                        <div className="flex flex-wrap gap-8 items-center">
                            <Magnetic>
                                <SpotlightButton asChild className="h-14 px-10 text-sm tracking-[0.1em] uppercase">
                                    <Link href="/portfolio">Initialize Project</Link>
                                </SpotlightButton>
                            </Magnetic>
                            <Magnetic>
                                <Link href="/portfolio" className="group flex items-center gap-4 text-xs font-mono tracking-[0.2em] uppercase opacity-60 hover:opacity-100 transition-opacity">
                                    <span className="w-10 h-[1px] bg-foreground/30 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
                                    Explore Specs
                                </Link>
                            </Magnetic>
                        </div>
                    </motion.div>

                    {/* Right: Abstract Composition */}
                    <div className="relative hidden lg:block">
                        {/* Decorative UI Fragments */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-12 -left-12 z-20 w-32 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 font-mono text-[8px] opacity-40"
                        >
                            <div className="text-primary mb-2">{'// INIT_CORE'}</div>
                            <div className="space-y-1">
                                <div className="h-1 w-full bg-white/10 rounded" />
                                <div className="h-1 w-[80%] bg-white/10 rounded" />
                                <div className="h-1 w-[60%] bg-white/10 rounded" />
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-8 -right-8 z-20 px-4 py-2 bg-primary/10 backdrop-blur-xl rounded-full border border-primary/20 flex gap-3 items-center opacity-60"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="font-mono text-[9px] tracking-widest uppercase text-primary">Live_Status: 200 OK</span>
                        </motion.div>

                        {/* Main Focal Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotateY: 30 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="perspective-2000"
                        >
                            <TiltCard className="relative aspect-[4/5] max-w-[450px] mx-auto group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white/5 to-transparent rounded-[2.5rem] border border-white/10 backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_-20px_rgba(var(--primary),0.3)]">
                                    {/* Advanced Visual Logic */}
                                    <div className="absolute inset-0 p-10 flex flex-col gap-8 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                                        <div className="flex justify-between items-start">
                                            <div className="w-20 h-2 bg-primary/30 rounded-full" />
                                            <div className="w-3 h-3 rounded-full border border-primary/40" />
                                        </div>

                                        <div className="flex-1 space-y-6">
                                            {[...Array(4)].map((_, i) => (
                                                <div key={i} className="flex gap-4 items-center">
                                                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5" />
                                                    <div className="flex-1 space-y-2">
                                                        <div className="h-2 w-full bg-white/5 rounded-full" />
                                                        <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="h-32 w-full bg-primary/5 rounded-2xl relative overflow-hidden border border-white/5">
                                            <svg className="absolute inset-0 w-full h-full opacity-30">
                                                <motion.path
                                                    d="M10 80 Q 150 20 300 80 T 500 80"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1"
                                                    className="text-primary"
                                                    animate={{
                                                        d: [
                                                            "M10 80 Q 150 20 300 80 T 500 80",
                                                            "M10 80 Q 150 140 300 80 T 500 80",
                                                            "M10 80 Q 150 20 300 80 T 500 80"
                                                        ]
                                                    }}
                                                    transition={{ duration: 6, repeat: Infinity }}
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Central "Glass" Element */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
                                        <div className="w-32 h-32 rounded-3xl border border-white/10 rotate-12 backdrop-blur-md flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full border-2 border-primary/20 flex items-center justify-center">
                                                <div className="w-8 h-8 rounded-full bg-primary/20 blur-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    </div>
                </div>

                <div className="mt-20 border-t border-white/5 pt-12 relative">
                    <div className="absolute top-0 right-0 w-32 h-[1px] bg-primary/40 translate-y-[-1px]" />
                    <StatsBar />
                </div>
            </div>

            {/* Bottom Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20 hover:opacity-50 transition-opacity cursor-pointer">
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase">Scroll_To_Explore</span>
                <motion.div
                    animate={{ height: [0, 40, 0], y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1px] h-10 bg-primary"
                />
            </div>
        </section>
    )
}
