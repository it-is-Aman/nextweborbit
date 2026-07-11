'use client'

import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function StatisticsSection() {
    const [animatedNumbers, setAnimatedNumbers] = useState({
        projects: 0,
        team: 0,
        customers: 0,
        partners: 0,
        coffee: 0
    })

    useEffect(() => {
        const duration = 2000
        const steps = 60
        const interval = duration / steps
        let currentStep = 0

        const timer = setInterval(() => {
            currentStep++
            const progress = currentStep / steps
            setAnimatedNumbers({
                projects: Math.min(Math.floor(progress * 235), 235),
                team: Math.min(Math.floor(progress * 25), 25),
                customers: Math.min(Math.floor(progress * 138), 138),
                partners: Math.min(Math.floor(progress * 42), 42),
                coffee: Math.min(Math.floor(progress * 15628), 15628)
            })

            if (currentStep >= steps) {
                clearInterval(timer)
            }
        }, interval)

        return () => clearInterval(timer)
    }, [])

    return (
        <section className="bg-[#FAF9F6] text-neutral-900 relative overflow-hidden border-t border-neutral-200/60 font-sans">
            {/* Background overlay pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            
            <div className="container mx-auto max-w-[1400px] px-4 py-16 md:py-24 relative z-10">
                <div className="border border-neutral-200/80 rounded-3xl overflow-hidden bg-white shadow-[0_10px_45px_-10px_rgba(0,0,0,0.04)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200/80">
                        
                        {/* ROW 1 */}
                        
                        {/* 235+ Finished Projects */}
                        <div className="p-10 flex flex-col justify-center min-h-[220px] relative hover:bg-neutral-50/50 transition-colors duration-300">
                            <div className="flex items-start justify-between">
                                <span className="text-5xl sm:text-6xl font-black font-mono tracking-tighter leading-none text-neutral-900">
                                    {animatedNumbers.projects}+
                                </span>
                                <span className="w-2.5 h-2.5 rounded-full bg-[#0072F5] shadow-[0_0_8px_rgba(0,114,245,0.6)] mt-2" />
                            </div>
                            <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs sm:text-sm mt-6">
                                Finished Projects
                            </span>
                        </div>

                        {/* 25+ Team Members */}
                        <div className="p-10 flex flex-col justify-center min-h-[220px] relative hover:bg-neutral-50/50 transition-colors duration-300">
                            <div className="flex items-start justify-between">
                                <span className="text-5xl sm:text-6xl font-black font-mono tracking-tighter leading-none text-neutral-900">
                                    {animatedNumbers.team}+
                                </span>
                                <span className="w-2.5 h-2.5 rounded-full bg-[#0072F5] shadow-[0_0_8px_rgba(0,114,245,0.6)] mt-2" />
                            </div>
                            <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs sm:text-sm mt-6">
                                Team Members
                            </span>
                        </div>

                        {/* 138+ Happy Customers */}
                        <div className="p-10 flex flex-col justify-center min-h-[220px] relative hover:bg-neutral-50/50 transition-colors duration-300">
                            <div className="flex items-start justify-between">
                                <span className="text-5xl sm:text-6xl font-black font-mono tracking-tighter leading-none text-neutral-900">
                                    {animatedNumbers.customers}+
                                </span>
                                <span className="w-2.5 h-2.5 rounded-full bg-[#0072F5] shadow-[0_0_8px_rgba(0,114,245,0.6)] mt-2" />
                            </div>
                            <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs sm:text-sm mt-6">
                                Happy Customers
                            </span>
                        </div>

                    </div>

                    {/* Horizontal dividing line */}
                    <div className="hidden lg:block w-full h-[1px] bg-neutral-200/80" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200/80">
                        
                        {/* ROW 2 */}

                        {/* 42+ Loyal Partners */}
                        <div className="p-10 flex flex-col justify-center min-h-[220px] relative hover:bg-neutral-50/50 transition-colors duration-300">
                            <div className="flex items-start justify-between">
                                <span className="text-5xl sm:text-6xl font-black font-mono tracking-tighter leading-none text-neutral-900">
                                    {animatedNumbers.partners}+
                                </span>
                                <span className="w-2.5 h-2.5 rounded-full bg-[#0072F5] shadow-[0_0_8px_rgba(0,114,245,0.6)] mt-2" />
                            </div>
                            <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs sm:text-sm mt-6">
                                Loyal Partners
                            </span>
                        </div>

                        {/* 15,628+ Coffee Drinked */}
                        <div className="p-10 flex flex-col justify-center min-h-[220px] relative hover:bg-neutral-50/50 transition-colors duration-300">
                            <div className="flex items-start justify-between">
                                <span className="text-5xl sm:text-6xl font-black font-mono tracking-tighter leading-none text-neutral-900">
                                    {animatedNumbers.coffee.toLocaleString()}+
                                </span>
                                <span className="w-2.5 h-2.5 rounded-full bg-[#0072F5] shadow-[0_0_8px_rgba(0,114,245,0.6)] mt-2" />
                            </div>
                            <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs sm:text-sm mt-6">
                                Coffee Drinked
                            </span>
                        </div>

                        {/* Contact Block (Orange gradient solid block) */}
                        <Link href="/contact" className="group p-10 flex flex-col justify-between min-h-[220px] relative bg-gradient-to-br from-[#2B1E77] via-[#19114d] to-[#0072F5] hover:opacity-95 transition-opacity duration-300 overflow-hidden cursor-pointer select-none">
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <div className="flex items-start justify-between relative z-10">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black uppercase tracking-wider text-white">
                                        CONTACT
                                    </span>
                                    <span className="text-white/80 font-bold tracking-wide text-xs sm:text-sm mt-2">
                                        Get A Quote For Your Project
                                    </span>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20 transform group-hover:scale-105 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                                    <Send className="w-5 h-5 fill-current stroke-0" />
                                </div>
                            </div>
                            {/* Visual highlight circle */}
                            <div className="absolute -bottom-16 -right-16 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
                        </Link>

                    </div>
                </div>
            </div>
        </section>
    )
}