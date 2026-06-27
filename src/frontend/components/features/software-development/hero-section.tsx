'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { SlotTextReveal, SpotlightButton, TiltCard, Magnetic } from '@/frontend/animations'
import { StatsBar } from './stats-bar'

export const HeroSection = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center bg-background text-foreground pt-32 pb-16 overflow-hidden">
            {/* Advanced Pro Background: Grid, Aurora, and Grain */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

                {/* Aurora Blurred Blobs - Tech Blue/Deep Primary */}
                <motion.div
                    animate={{
                        x: [0, 80, -40, 0],
                        y: [0, -30, 70, 0],
                        scale: [1, 1.1, 0.9, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[15%] -left-[10%] w-[65%] h-[65%] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen opacity-30"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 60, 0],
                        y: [0, 50, -40, 0],
                        scale: [1, 0.9, 1.2, 1]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[10%] -right-[15%] w-[55%] h-[55%] bg-primary/15 blur-[150px] rounded-full mix-blend-screen opacity-40"
                />
            </div>

            {/* UI Metadata & Breadcrumbs */}
            <div className="absolute top-40 left-6 lg:left-12 z-20 hidden md:block">
                <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] opacity-30 uppercase">
                    <span className="text-primary">03</span>
                    <span className="w-8 h-[1px] bg-foreground/20" />
                    <span>Services</span>
                    <span className="text-foreground/40">/</span>
                    <span>Software Engineering</span>
                </div>
            </div>

            <div className="absolute bottom-12 right-12 z-20 hidden lg:block">
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-20 uppercase text-right leading-loose">
                    [ KRNL_MOD: 0x2A ]<br />
                    BUILD: 8.4.12_STABLE<br />
                    DEPLOY: EDGE_NODE_01
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
                                Enterprise Forge
                            </span>
                            <div className="absolute -left-4 top-0 w-[1px] h-full bg-primary/30" />
                        </div>

                        <h1 className="font-bold text-foreground tracking-tight uppercase leading-[0.85] text-[clamp(2.5rem,7vw,6rem)] mb-10">
                            <SlotTextReveal text="CUSTOM SOFTWARE BUILT TO SCALE" className="block" />
                        </h1>

                        <p className="text-lg md:text-xl max-w-xl font-light opacity-60 leading-relaxed text-muted-foreground mb-12 border-l border-white/5 pl-8">
                            We develop robust, enterprise-grade software that powers
                            critical business logic. Our architecture is built
                            for resilience, security, and extreme performance.
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
                        {/* Decorative Terminal Fragments */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-12 -right-4 z-20 w-48 p-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 font-mono text-[9px] opacity-40 shadow-2xl overflow-hidden"
                        >
                            <div className="flex gap-1.5 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                            </div>
                            <div className="text-primary/70">$ git push origin main</div>
                            <div className="text-white/30">Compressing objects: 100%...</div>
                            <div className="text-green-500/40">Total 42 (delta 21)</div>
                        </motion.div>

                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-4 -left-12 z-20 px-5 py-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col gap-2 opacity-40 shadow-xl"
                        >
                            <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/50">CPU_LOAD</span>
                            <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ width: ['20%', '90%', '40%', '70%'] }}
                                    transition={{ duration: 8, repeat: Infinity }}
                                    className="h-full bg-primary/60"
                                />
                            </div>
                        </motion.div>

                        {/* Main Focal Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                            transition={{ duration: 1.5 }}
                            className="perspective-2000"
                        >
                            <TiltCard className="relative aspect-video max-w-[550px] mx-auto group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white/5 to-transparent rounded-[1.5rem] border border-white/10 backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_-20px_rgba(var(--primary),0.25)]">
                                    {/* Terminal Interface */}
                                    <div className="absolute inset-0 p-8 flex flex-col gap-6 font-mono text-[11px] opacity-40 group-hover:opacity-70 transition-opacity duration-1000">
                                        <div className="flex justify-between border-b border-white/5 pb-4">
                                            <div className="flex gap-6">
                                                <span className="text-primary">main.rs</span>
                                                <span className="text-white/20">auth.ts</span>
                                                <span className="text-white/20">db.sql</span>
                                            </div>
                                            <div className="text-white/10">UTF-8</div>
                                        </div>

                                        <div className="flex-1 space-y-4">
                                            <div className="flex gap-4">
                                                <span className="text-white/20">01</span>
                                                <span className="text-purple-400/60">fn</span>
                                                <span className="text-blue-400/60">initialize_core_engine</span>
                                                <span className="text-white/40">() {"{"}</span>
                                            </div>
                                            <div className="flex gap-4 pl-8">
                                                <span className="text-white/20">02</span>
                                                <span className="text-white/60">let</span>
                                                <span className="text-white/40">status =</span>
                                                <span className="text-green-400/60">System::audit</span>
                                                <span className="text-white/40">();</span>
                                            </div>
                                            <div className="flex gap-4 pl-8">
                                                <span className="text-white/20">03</span>
                                                <span className="text-orange-400/60">if</span>
                                                <span className="text-white/40">status.is_ok() {"{"}</span>
                                            </div>
                                            <div className="flex gap-4 pl-12">
                                                <span className="text-white/20">04</span>
                                                <span className="text-white/40">Logger::log(</span>
                                                <span className="text-yellow-400/60">&quot;Ready&quot;</span>
                                                <span className="text-white/40">);</span>
                                            </div>
                                            <div className="flex gap-4 pl-8">
                                                <span className="text-white/20">05</span>
                                                <span className="text-white/40">{"}"}</span>
                                            </div>
                                            <div className="flex gap-4">
                                                <span className="text-white/20">06</span>
                                                <span className="text-white/40">{"}"}</span>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center opacity-50">
                                            <div className="flex gap-4">
                                                <span className="bg-primary/20 px-2 py-0.5 rounded text-primary text-[9px]">STABLE</span>
                                                <span className="text-white/40">Ln 42, Col 8</span>
                                            </div>
                                            <div className="w-4 h-4 rounded-full border border-primary/40 animate-pulse" />
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
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase">Boot_Sequence</span>
                <motion.div
                    animate={{ height: [0, 40, 0], y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1px] h-10 bg-primary"
                />
            </div>
        </section>
    )
}
