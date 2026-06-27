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

                {/* Aurora Blurred Blobs - Creative Studio Violet/Primary */}
                <motion.div
                    animate={{
                        x: [0, 60, -80, 0],
                        y: [0, -40, 50, 0],
                        scale: [1, 1.1, 0.9, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -left-[10%] w-[55%] h-[55%] bg-primary/10 blur-[130px] rounded-full mix-blend-screen opacity-30"
                />
                <motion.div
                    animate={{
                        x: [0, -70, 90, 0],
                        y: [0, 60, -30, 0],
                        scale: [1, 0.9, 1.2, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[5%] -right-[5%] w-[45%] h-[45%] bg-indigo-500/5 blur-[130px] rounded-full mix-blend-screen opacity-20"
                />
            </div>

            {/* UI Metadata & Breadcrumbs */}
            <div className="absolute top-40 left-6 lg:left-12 z-20 hidden md:block">
                <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] opacity-30 uppercase">
                    <span className="text-primary">05</span>
                    <span className="w-8 h-[1px] bg-foreground/20" />
                    <span>Services</span>
                    <span className="text-foreground/40">/</span>
                    <span>Experience Architecture</span>
                </div>
            </div>

            <div className="absolute bottom-12 right-12 z-20 hidden lg:block">
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-20 uppercase text-right leading-loose">
                    [ PX_RATIO: 2.0 ]<br />
                    VIEW_PORT: 393x852<br />
                    FPS_TARGET: 120
                </div>
            </div>

            <div className="container mx-auto max-w-[1440px] px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="relative inline-block">
                            <span className="text-primary font-bold text-sm mb-6 block tracking-[0.3em] uppercase opacity-80">
                                Creative Foundry
                            </span>
                            <div className="absolute -left-4 top-0 w-[1px] h-full bg-primary/30" />
                        </div>

                        <h1 className="font-bold text-foreground tracking-tight uppercase leading-[0.85] text-[clamp(2.5rem,7vw,6rem)] mb-10">
                            <SlotTextReveal text="INTUITIVE DESIGN EXCEPTIONAL UX" className="block" />
                        </h1>

                        <p className="text-lg md:text-xl max-w-xl font-light opacity-60 leading-relaxed text-muted-foreground mb-12 border-l border-white/5 pl-8">
                            We don&apos;t just paint interfaces; we architect human-centric flows.
                            Our design language is rooted in psychology and
                            crafted with obsessive attention to detail.
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
                        {/* Decorative Design System Fragments */}
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-16 -left-8 z-20 flex gap-2 p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 opacity-40 shadow-xl"
                        >
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className={`w-4 h-4 rounded-full ${['bg-primary', 'bg-indigo-400', 'bg-blue-400', 'bg-white/20'][i]}`} />
                            ))}
                        </motion.div>

                        <motion.div
                            animate={{ rotate: [0, -5, 0] }}
                            transition={{ duration: 8, repeat: Infinity }}
                            className="absolute bottom-4 -right-12 z-20 p-4 bg-primary/5 backdrop-blur-3xl rounded-3xl border border-primary/20 font-mono text-[8px] opacity-30 shadow-2xl"
                        >
                            <div className="text-primary mb-1 uppercase tracking-widest">Type_Scale</div>
                            <div className="space-y-1">
                                <div className="text-lg font-bold">Aa</div>
                                <div className="h-[2px] w-full bg-white/10 rounded-full" />
                                <div className="h-[2px] w-2/3 bg-white/10 rounded-full" />
                            </div>
                        </motion.div>

                        {/* Main Focal Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotateZ: -5 }}
                            animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
                            transition={{ duration: 1.5 }}
                            className="perspective-2000"
                        >
                            <TiltCard className="relative aspect-square max-w-[450px] mx-auto group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white/5 to-transparent rounded-[4rem] border border-white/10 backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_-20px_rgba(var(--primary),0.2)]">
                                    {/* Abstract Wireframe Logic */}
                                    <div className="absolute inset-0 p-12 flex flex-col gap-10 opacity-40 group-hover:opacity-75 transition-opacity duration-1000">
                                        <div className="flex justify-between">
                                            <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/20" />
                                            <div className="flex-1 ml-6 space-y-3">
                                                <div className="h-2 w-full bg-white/5 rounded-full" />
                                                <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                                            </div>
                                        </div>

                                        <div className="flex-1 flex gap-6">
                                            <div className="flex-1 rounded-3xl border border-white/5 bg-white/5 p-4 flex flex-col justify-between">
                                                <div className="w-8 h-8 rounded-full bg-primary/10" />
                                                <div className="space-y-2">
                                                    <div className="h-2 w-full bg-white/5 rounded-full" />
                                                    <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                                                </div>
                                            </div>
                                            <div className="w-1/3 space-y-4">
                                                {[...Array(3)].map((_, i) => (
                                                    <div key={i} className="h-10 w-full rounded-2xl bg-white/5 border border-white/5" />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Focal Point Indicator */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                            <motion.div
                                                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                                className="w-20 h-20 rounded-full border border-primary/30"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-1 h-1 rounded-full bg-primary" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Glass Morph Overlay Fragment */}
                                    <div className="absolute top-1/4 right-0 w-32 h-32 bg-white/5 backdrop-blur-3xl border-l border-t border-white/10 rounded-tl-[3rem] shadow-2xl" />
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
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase">View_Experience</span>
                <motion.div
                    animate={{ height: [0, 40, 0], y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1px] h-10 bg-primary"
                />
            </div>
        </section>
    )
}
