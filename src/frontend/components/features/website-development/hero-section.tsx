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
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

                {/* Aurora Blurred Blobs - Modern Web Lime/Primary */}
                <motion.div
                    animate={{
                        x: [0, -40, 60, 0],
                        y: [0, 60, -20, 0],
                        scale: [1, 1.2, 0.9, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[5%] -right-[5%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full mix-blend-screen opacity-30"
                />
                <motion.div
                    animate={{
                        x: [0, 70, -50, 0],
                        y: [0, -40, 30, 0],
                        scale: [1, 0.8, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-green-400/5 blur-[120px] rounded-full mix-blend-screen opacity-20"
                />
            </div>

            {/* UI Metadata & Breadcrumbs */}
            <div className="absolute top-40 left-6 lg:left-12 z-20 hidden md:block">
                <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] opacity-30 uppercase">
                    <span className="text-primary">04</span>
                    <span className="w-8 h-[1px] bg-foreground/20" />
                    <span>Services</span>
                    <span className="text-foreground/40">/</span>
                    <span>Website Development</span>
                </div>
            </div>

            <div className="absolute bottom-12 right-12 z-20 hidden lg:block">
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-20 uppercase text-right leading-loose">
                    [ HTTP_PROTO: v3 ]<br />
                    DOM_READY: 12ms<br />
                    PERF_SCORE: 100
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
                                Digital Canvas
                            </span>
                            <div className="absolute -left-4 top-0 w-[1px] h-full bg-primary/30" />
                        </div>

                        <h1 className="font-bold text-foreground tracking-tight uppercase leading-[0.85] text-[clamp(2.5rem,7vw,6rem)] mb-10">
                            <SlotTextReveal text="STUNNING WEBSITES THAT CONVERT" className="block" />
                        </h1>

                        <p className="text-lg md:text-xl max-w-xl font-light opacity-60 leading-relaxed text-muted-foreground mb-12 border-l border-white/5 pl-8">
                            We build immersive web experiences that fuse high-end design
                            with technical excellence. Fast, responsive, and
                            engineered to turn visitors into loyal customers.
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
                            animate={{ rotate: [0, 5, 0] }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="absolute -top-12 left-0 z-20 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 font-mono text-[9px] opacity-40 shadow-xl"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="text-white/60 uppercase tracking-widest">Optimized</span>
                            </div>
                            <div className="text-xl font-bold">99<span className="text-[10px] text-primary">/100</span></div>
                        </motion.div>

                        <motion.div
                            animate={{ x: [0, 15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-12 -right-8 z-20 w-32 h-40 border border-primary/20 bg-primary/5 backdrop-blur-3xl rounded-3xl opacity-30 flex items-center justify-center"
                        >
                            <div className="w-[80%] h-[80%] border-2 border-dashed border-primary/10 rounded-2xl" />
                        </motion.div>

                        {/* Main Focal Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5 }}
                            className="perspective-2000"
                        >
                            <TiltCard className="relative aspect-square max-w-[450px] mx-auto group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white/5 to-transparent rounded-[2.5rem] border border-white/10 backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_-20px_rgba(var(--primary),0.2)]">
                                    {/* Abstract Browser Window */}
                                    <div className="absolute inset-0 p-8 flex flex-col gap-6 opacity-40 group-hover:opacity-75 transition-opacity duration-1000">
                                        <div className="w-full h-8 bg-white/5 rounded-full flex items-center px-6 gap-2 border border-white/5">
                                            <div className="flex gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500/30" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/30" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500/30" />
                                            </div>
                                            <div className="flex-1 h-3 bg-white/5 rounded-full mx-4" />
                                        </div>

                                        <div className="flex-1 space-y-4">
                                            <div className="w-full h-32 bg-primary/10 rounded-2xl relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] animate-[shimmer_3s_infinite]" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="h-20 bg-white/5 rounded-xl border border-white/5" />
                                                <div className="h-20 bg-white/5 rounded-xl border border-white/5" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                                                <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                                            </div>
                                        </div>

                                        {/* Animated Cursor */}
                                        <motion.div
                                            animate={{
                                                x: [100, 250, 150, 100],
                                                y: [100, 180, 80, 100]
                                            }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                            className="absolute w-5 h-5 text-primary pointer-events-none drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                                        >
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M7 2l12 11.2l-5.8 0.5l3.3 5.3l-2.2 1.4l-3.4-5.4L7 19V2z" />
                                            </svg>
                                        </motion.div>
                                    </div>

                                    {/* Component Tagging */}
                                    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="flex items-center gap-2 px-2 py-1 bg-primary text-white text-[8px] font-mono rounded">
                                            <span>Component_A</span>
                                            <span className="opacity-50">#0x12</span>
                                        </div>
                                        <div className="w-[1px] h-12 bg-primary mx-auto" />
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
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase">Render_Experience</span>
                <motion.div
                    animate={{ height: [0, 40, 0], y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1px] h-10 bg-primary"
                />
            </div>
        </section>
    )
}
