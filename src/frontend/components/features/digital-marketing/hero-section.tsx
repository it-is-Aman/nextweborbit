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

                {/* Aurora Blurred Blobs - Marketing Teal/Primary Mix */}
                <motion.div
                    animate={{
                        x: [0, -60, 40, 0],
                        y: [0, 80, -30, 0],
                        scale: [1, 1.3, 0.9, 1]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -right-[10%] w-[55%] h-[55%] bg-primary/15 blur-[130px] rounded-full mix-blend-screen opacity-40"
                />
                <motion.div
                    animate={{
                        x: [0, 90, -70, 0],
                        y: [0, -50, 60, 0],
                        scale: [1, 0.8, 1.2, 1]
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[15%] -left-[10%] w-[45%] h-[45%] bg-teal-500/10 blur-[130px] rounded-full mix-blend-screen opacity-30"
                />
            </div>

            {/* UI Metadata & Breadcrumbs */}
            <div className="absolute top-40 left-6 lg:left-12 z-20 hidden md:block">
                <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] opacity-30 uppercase">
                    <span className="text-primary">02</span>
                    <span className="w-8 h-[1px] bg-foreground/20" />
                    <span>Services</span>
                    <span className="text-foreground/40">/</span>
                    <span>Digital Marketing</span>
                </div>
            </div>

            <div className="absolute bottom-12 right-12 z-20 hidden lg:block">
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-20 uppercase text-right leading-loose">
                    [ ROI_ENGINE: v2.4 ]<br />
                    TRACKING_ACTIVE: TRUE<br />
                    GEO_TARGET: GLOBAL
                </div>
            </div>

            <div className="container mx-auto max-w-[1440px] px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="relative inline-block">
                            <span className="text-primary font-bold text-sm mb-6 block tracking-[0.3em] uppercase opacity-80">
                                Growth Accelerator
                            </span>
                            <div className="absolute -left-4 top-0 w-[1px] h-full bg-primary/30" />
                        </div>

                        <h1 className="font-bold text-foreground tracking-tight uppercase leading-[0.85] text-[clamp(2.5rem,7vw,6rem)] mb-10">
                            <SlotTextReveal text="DIGITAL MARKETING THAT DELIVERS" className="block" />
                        </h1>

                        <p className="text-lg md:text-xl max-w-xl font-light opacity-60 leading-relaxed text-muted-foreground mb-12 border-l border-white/5 pl-8">
                            We don&apos;t just buy traffic; we engineer conversion engines.
                            Our data-first approach ensures every dollar spent is an
                            investment in your brand&apos;s scalability.
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
                        {/* Decorative Chart Fragments */}
                        <motion.div
                            animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-16 right-0 z-20 px-4 py-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 font-mono text-[9px] opacity-40 shadow-xl"
                        >
                            <div className="text-primary mb-1 uppercase tracking-widest">Conversion_Rate</div>
                            <div className="text-xl font-bold text-foreground">12.4% <span className="text-[10px] text-green-500">+2.1</span></div>
                        </motion.div>

                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-0 -left-16 z-20 w-32 h-32 p-3 bg-primary/5 backdrop-blur-3xl rounded-3xl border border-primary/20 opacity-50 overflow-hidden"
                        >
                            <div className="w-full h-full border border-dashed border-primary/20 rounded-2xl flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                            </div>
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
                                    {/* Abstract ROI Bars */}
                                    <div className="absolute inset-0 p-12 flex flex-col justify-end gap-8 opacity-40 group-hover:opacity-70 transition-opacity duration-1000">
                                        <div className="flex items-end gap-3 h-48">
                                            {[50, 85, 60, 100, 75, 90, 65].map((h, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${h}%` }}
                                                    transition={{
                                                        duration: 1.5,
                                                        delay: i * 0.1,
                                                        repeat: Infinity,
                                                        repeatType: 'reverse',
                                                        ease: "easeInOut"
                                                    }}
                                                    className="flex-1 bg-gradient-to-t from-primary/40 to-primary/5 rounded-t-lg border-t border-primary/20"
                                                />
                                            ))}
                                        </div>

                                        <div className="space-y-3">
                                            <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                                                <motion.div
                                                    animate={{ x: ['-100%', '100%'] }}
                                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                    className="h-full w-1/4 bg-primary/40"
                                                />
                                            </div>
                                            <div className="flex justify-between font-mono text-[8px] tracking-[0.2em]">
                                                <span>Q1_METRICS</span>
                                                <span>DATA_STABLE</span>
                                                <span>LIVE_SYNC</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Central Floating Node */}
                                    <div className="absolute inset-x-0 top-1/4 flex items-center justify-center pointer-events-none">
                                        <div className="w-32 h-32 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5 backdrop-blur-sm shadow-[0_0_40px_rgba(var(--primary),0.1)]">
                                            <div className="w-16 h-16 rounded-full border border-primary/40 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                                                <div className="w-2 h-2 rounded-full bg-primary" />
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
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase">Analyze_Success</span>
                <motion.div
                    animate={{ height: [0, 40, 0], y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1px] h-10 bg-primary"
                />
            </div>
        </section>
    )
}
