'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Plus, X, MoveHorizontal } from 'lucide-react'

const MILESTONES = [
    {
        year: "2020",
        title: "Foundation & Vision",
        desc: "Launched with focus on website design and development. Assembled experienced team of designers, developers, and analysts across India. Highlights: Core team formation, First client projects, Service foundation."
    },
    {
        year: "2021",
        title: "Service Expansion",
        desc: "Added digital marketing services. Established team leader structure with specialized groups for each service vertical. Highlights: Digital marketing launch, Team structure optimization, Client base growth."
    },
    {
        year: "2022",
        title: "Business Software & Ecommerce",
        desc: "Expanded into web applications and ecommerce development. Trusted by universities and leading brands nationwide. Highlights: Ecommerce expertise, Business software solutions, University partnerships."
    },
    {
        year: "2023",
        title: "Market Leadership",
        desc: "Recognized for personalized service and innovative solutions. Thousands of businesses trust our expertise. Highlights: Brand recognition, Customer satisfaction, Innovation awards."
    },
    {
        year: "2024",
        title: "Optimization & Growth",
        desc: "Focus on website optimization and competitive edge strategies. Helping businesses thrive with data-driven marketing. Highlights: SEO excellence, Performance optimization, ROI-focused campaigns."
    },
    {
        year: "2025",
        title: "Digital Empowerment",
        desc: "Leading India's digital transformation. Empowering businesses with cutting-edge web solutions and marketing strategies. Highlights: Market dominance, AI integration, Future-ready solutions."
    }
]

export default function JourneySection() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const constraintsRef = useRef<HTMLDivElement>(null)

    // Manual navigation logic
    const scrollContainer = (direction: 'left' | 'right') => {
        if (containerRef.current) {
            const scrollAmount = 400
            containerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <section className="relative w-full py-24 md:py-40 bg-white overflow-hidden select-none">
            {/* Background Decorative Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-20 pointer-events-none" />

            {/* Section Header */}
            <div className="container mx-auto px-6 md:px-20 mb-20 relative z-10">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-primary font-bold text-xs md:text-sm tracking-[0.4em] uppercase block mb-4">Historical Roadmap</span>
                        <h2 className="text-6xl md:text-9xl font-black text-zinc-900 leading-[0.85] tracking-tighter">
                            The Next Web Orbit<br />
                            <span className="text-zinc-100 italic font-light drop-shadow-sm">Journey</span>
                        </h2>
                    </motion.div>
                </div>
            </div>

            {/* Manual Scroll Controls (Desktop Only) */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full px-4 md:px-10 flex justify-between pointer-events-none z-50 hidden md:flex">
                <button
                    onClick={() => scrollContainer('left')}
                    className="p-4 rounded-full bg-black text-white shadow-2xl hover:bg-blue-600 transition-all pointer-events-auto border-none"
                    aria-label="Previous"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={() => scrollContainer('right')}
                    className="p-4 rounded-full bg-black text-white shadow-2xl hover:bg-blue-600 transition-all pointer-events-auto border-none"
                    aria-label="Next"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Horizontal Draggable Timeline Container */}
            <div ref={constraintsRef} className="relative w-full cursor-grab active:cursor-grabbing">
                <div
                    ref={containerRef}
                    className="flex items-center gap-12 md:gap-32 overflow-x-auto scrollbar-hide px-6 md:px-20 py-20 snap-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {/* Continuous Timeline Line */}
                    <div className="absolute top-1/2 left-0 w-[200vw] md:w-[5000px] h-[2px] bg-zinc-100 -translate-y-1/2 pointer-events-none" />

                    {MILESTONES.map((item, i) => (
                        <div
                            key={i}
                            className={`flex-shrink-0 relative flex flex-col items-center snap-center ${i % 2 === 0 ? 'mb-[150px] md:mb-[250px]' : 'mt-[150px] md:mt-[250px]'}`}
                        >
                            {/* Year Background Decoration */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.05]">
                                <span className="text-[12rem] md:text-[22rem] font-black text-zinc-900 leading-none">
                                    {item.year}
                                </span>
                            </div>

                            {/* Timeline Point & Vertical Connector */}
                            <div className={`absolute left-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-white bg-white shadow-xl flex items-center justify-center z-20 
                                ${i % 2 === 0 ? 'top-[calc(100%+60px)] md:top-[calc(100%+100px)]' : 'bottom-[calc(100%+60px)] md:bottom-[calc(100%+100px)]'}`}>
                                <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${expandedIndex === i ? 'bg-primary' : 'bg-zinc-300'}`} />
                                <div className={`absolute left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-zinc-200 to-transparent
                                    ${i % 2 === 0 ? 'bottom-full h-16 md:h-24' : 'top-full h-16 md:h-24 rotate-180'}`} />
                            </div>

                            {/* Milestone Card */}
                            <motion.div
                                layout
                                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                                className={`relative z-30 group rounded-[2.5rem] p-8 md:p-12 transition-all duration-500 cursor-pointer
                                    ${expandedIndex === i
                                        ? 'bg-zinc-900 text-white w-[clamp(300px,80vw,500px)] shadow-2xl'
                                        : 'bg-white text-zinc-900 w-[clamp(260px,60vw,350px)] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-zinc-100 hover:border-primary/20 hover:scale-[1.02]'
                                    }`}
                            >
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-500 ${expandedIndex === i ? 'text-primary' : 'text-zinc-400'}`}>
                                                Milestone
                                            </span>
                                            <span className={`text-4xl md:text-6xl font-black leading-none ${expandedIndex === i ? 'text-white' : 'text-zinc-900'}`}>
                                                {item.year}
                                            </span>
                                        </div>
                                        <div className={`p-4 rounded-2xl transition-all duration-500 ${expandedIndex === i ? 'bg-white/10 text-white rotate-45' : 'bg-zinc-50 text-zinc-400 group-hover:bg-primary group-hover:text-white'}`}>
                                            {expandedIndex === i ? <X size={24} /> : <Plus size={24} />}
                                        </div>
                                    </div>

                                    <h3 className={`text-xl md:text-3xl font-black uppercase tracking-tight leading-tight transition-colors duration-500 ${expandedIndex === i ? 'text-white' : 'text-zinc-800'}`}>
                                        {item.title}
                                    </h3>

                                    <AnimatePresence>
                                        {expandedIndex === i && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-8 border-t border-white/10 mt-2">
                                                    <p className="text-zinc-400 text-sm md:text-xl font-light leading-relaxed whitespace-normal">
                                                        {item.desc}
                                                    </p>
                                                    <div className="mt-8 flex items-center gap-4 text-primary font-black text-[10px] tracking-[0.4em] uppercase">
                                                        <div className="w-12 h-[2px] bg-primary/30" />
                                                        Success Story Verified
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {!expandedIndex && (
                                        <div className="flex items-center gap-3 mt-2 text-primary font-bold text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                            <span>Click to Expand</span>
                                            <ChevronRight size={14} className="animate-pulse" />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    ))}

                    {/* Final Spacer */}
                    <div className="w-[10vw] flex-shrink-0" />
                </div>
            </div>

            {/* Bottom Status & Help */}
            <div className="container mx-auto px-6 md:px-20 mt-12 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <MoveHorizontal size={14} className="text-primary animate-bounce-x" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Drag to Explore</span>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Establishment 2016 — Future 2025</span>
                </div>
            </div>

            <style jsx global>{`
                .animate-bounce-x {
                    animation: bounce-x 2s infinite;
                }
                @keyframes bounce-x {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(5px); }
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    )
}
