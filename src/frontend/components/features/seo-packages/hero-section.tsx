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

                {/* Aurora Blurred Blobs - Growth Emerald/Primary */}
                <motion.div
                    animate={{
                        x: [0, -50, 40, 0],
                        y: [0, 80, -30, 0],
                        scale: [1, 1.2, 0.9, 1]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[5%] -right-[5%] w-[55%] h-[55%] bg-primary/10 blur-[140px] rounded-full mix-blend-screen opacity-30"
                />
                <motion.div
                    animate={{
                        x: [0, 80, -60, 0],
                        y: [0, -50, 40, 0],
                        scale: [1, 0.8, 1.1, 1]
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[12%] -left-[10%] w-[45%] h-[45%] bg-emerald-500/5 blur-[140px] rounded-full mix-blend-screen opacity-20"
                />
            </div>

            {/* UI Metadata & Breadcrumbs */}
            <div className="absolute top-40 left-6 lg:left-12 z-20 hidden md:block">
                <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] opacity-30 uppercase">
                    <span className="text-primary">06</span>
                    <span className="w-8 h-[1px] bg-foreground/20" />
                    <span>Services</span>
                    <span className="text-foreground/40">/</span>
                    <span>Search Dominance</span>
                </div>
            </div>

            <div className="absolute bottom-12 right-12 z-20 hidden lg:block">
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-20 uppercase text-right leading-loose">
                    [ INDEX_STAT: 100% ]<br />
                    DOMAIN_AUTH: 82<br />
                    ORG_TRAFFIC: +240%
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
                                Authority Engine
                            </span>
                            <div className="absolute -left-4 top-0 w-[1px] h-full bg-primary/30" />
                        </div>

                        <h1 className="font-bold text-foreground tracking-tight uppercase leading-[0.85] text-[clamp(2.5rem,7vw,6rem)] mb-10">
                            <SlotTextReveal text="DOMINATE SEARCH RANKINGS" className="block" />
                        </h1>

                        <p className="text-lg md:text-xl max-w-xl font-light opacity-60 leading-relaxed text-muted-foreground mb-12 border-l border-white/5 pl-8">
                            We don&apos;t just chase algorithms; we master them.
                            Claim your authority in search engines and drive high-intent
                            organic growth that compounds over time.
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
                        {/* Decorative Analytics Fragments */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-12 right-0 z-20 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 font-mono text-[9px] opacity-40 shadow-xl"
                        >
                            <div className="text-emerald-400 mb-1">RANK_UP ↑</div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-bold">#1</span>
                                <span className="text-white/30 text-[8px]">FOR KEYWORD_ELITE</span>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ x: [-10, 10, -10] }}
                            transition={{ duration: 7, repeat: Infinity }}
                            className="absolute bottom-4 -left-8 z-20 p-4 bg-primary/5 backdrop-blur-3xl rounded-3xl border border-primary/20 opacity-30 shadow-2xl"
                        >
                            <div className="flex gap-1 h-12 items-end">
                                {[30, 60, 45, 90, 70, 100].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="w-2 bg-primary/40 rounded-t-sm"
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Main Focal Visual */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5 }}
                            className="perspective-2000"
                        >
                            <TiltCard className="relative aspect-video max-w-[550px] mx-auto group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white/5 to-transparent rounded-[2rem] border border-white/10 backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_-20px_rgba(var(--primary),0.2)]">
                                    {/* Abstract SERP Logic */}
                                    <div className="absolute inset-0 p-10 flex flex-col gap-8 opacity-40 group-hover:opacity-75 transition-opacity duration-1000">
                                        <div className="w-full h-10 bg-white/5 rounded-full flex items-center px-6 gap-4 border border-white/5">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            <div className="text-[10px] text-white/40 font-mono tracking-widest italic animate-pulse">Scanning keywords...</div>
                                        </div>

                                        <div className="space-y-6">
                                            {[...Array(3)].map((_, i) => (
                                                <div key={i} className={`p-4 rounded-xl border border-white/5 bg-white/5 flex gap-6 items-center ${i === 0 ? 'border-primary/20 bg-primary/5' : ''}`}>
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${i === 0 ? 'bg-primary text-white' : 'bg-white/5 text-white/40'}`}>
                                                        {i + 1}
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                        <div className={`h-2 rounded-full ${i === 0 ? 'bg-primary/40 w-3/4' : 'bg-white/10 w-2/3'}`} />
                                                        <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                                                    </div>
                                                    {i === 0 && (
                                                        <div className="text-emerald-400 text-[8px] font-mono">+12.4%</div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Decorative Overlay Node */}
                                    <div className="absolute bottom-4 right-4 p-3 bg-white/5 backdrop-blur-3xl rounded-xl border border-white/10 opacity-60">
                                        <div className="font-mono text-[7px] text-white/40 mb-1 uppercase tracking-widest">Visibility_Index</div>
                                        <div className="text-xs font-bold text-primary">0.982_OPTIMAL</div>
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
