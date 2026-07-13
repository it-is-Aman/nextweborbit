'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

// const ThreeBackground = dynamic(() => import('./three-background'), { ssr: false })
const FloatingReviews = dynamic(() => import('./floating-reviews'), { ssr: false })
const SpotlightButton = dynamic(() => import('@/frontend/animations').then(mod => mod.SpotlightButton), { ssr: false })

import { ArrowRight, ArrowDown, ArrowUpRight } from 'lucide-react'

interface HeroData {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    backgroundImage?: { url: string };
}

const Hero = () => {
    const [heroData, setHeroData] = useState<HeroData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/hero')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.heroes && data.heroes.length > 0) {
                    setHeroData(data.heroes[0])
                }
                setLoading(false)
            })
            .catch(err => {
                console.error('Failed to load hero data:', err)
                setLoading(false)
            })
    }, [])

    const parseTitle = (text: string) => {
        if (!text) return null;
        const parts = text.split(/(\[gradient\].*?\[\/gradient\])/g);
        return parts.map((part, index) => {
            if (part.startsWith('[gradient]') && part.endsWith('[/gradient]')) {
                const innerText = part.replace('[gradient]', '').replace('[/gradient]', '');
                return (
                    <span key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B1E77] to-[#0072F5]">
                        {innerText}
                    </span>
                );
            }
            return part.split('\n').map((line, i) => (
                <span key={`${index}-${i}`}>
                    {line}
                    {i < part.split('\n').length - 1 && <br className="hidden sm:inline" />}
                </span>
            ));
        });
    };

    // Default static fallback copy
    const title = heroData?.title ? parseTitle(heroData.title) : (
        <>
            We Build <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B1E77] to-[#0072F5]">
                High-Performance
            </span> <br className="hidden sm:inline" />
            Digital Systems That <br className="hidden sm:inline" />
            Drive Real Business Growth
        </>
    );

    const subtitle = heroData?.subtitle || "Web Development, UI/UX, Apps, SEO, and Digital Marketing — everything you need to scale your business with modern technology.";
    const ctaText = heroData?.ctaText || "Get a Free Consultation";
    const ctaLink = heroData?.ctaLink || "/contact";

    return (
        <section className="relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-[#FAF9F6] to-neutral-100/60 text-neutral-900 min-h-[90vh] flex items-center overflow-hidden py-16 md:py-24">
            
            {/* Ambient Background Glows using Logo Colors */}
            <div className="absolute top-1/4 left-1/10 w-[400px] h-[400px] rounded-full bg-violet-200/40 blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] rounded-full bg-blue-200/30 blur-[150px] pointer-events-none z-0" />

            {/* Background High-Tech Wireframe Polyhedron (Mockup Style) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-[600px] h-[600px] opacity-15 pointer-events-none hidden lg:block z-0">
                <svg viewBox="0 0 100 100" className="w-full h-full text-neutral-400/30 stroke-[0.3]" fill="none" stroke="currentColor">
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
            {/* <FloatingReviews /> */}

            {/* Left Vertical Text "HOMEPAGE" */}
            <div className="absolute left-4 bottom-12 hidden xl:flex flex-col items-center gap-4 z-10 pointer-events-none select-none">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 [writing-mode:vertical-lr] rotate-180">
                    HOMEPAGE
                </span>
                <div className="w-[1px] h-12 bg-neutral-200" />
            </div>

            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    
                    {/* Left Column Content */}
                    <div className="lg:col-span-7 flex flex-col space-y-8 text-left">
                        {/* Title Heading */}
                        <motion.h1 
                            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-neutral-900"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            {title}
                        </motion.h1>

                        {/* Subheadline Paragraph */}
                        <motion.p 
                            className="text-base sm:text-lg md:text-xl font-light text-neutral-600 leading-relaxed max-w-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        >
                            {subtitle}
                        </motion.p>

                        {/* Interactive Buttons */}
                        <motion.div 
                            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 pt-4"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {/* Blue/Indigo Gradient Button */}
                            <Link href={ctaLink} className="group flex items-center justify-center bg-gradient-to-r from-[#2B1E77] to-[#0072F5] hover:opacity-95 text-white font-bold uppercase tracking-wider text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all duration-300 transform scale-[1.0] active:scale-[0.98] shadow-md hover:shadow-lg w-full sm:w-auto">
                                {ctaText}
                                <span className="ml-3 w-7 h-7 rounded-full bg-white text-[#2B1E77] flex items-center justify-center group-hover:translate-x-1 transition-transform shrink-0">
                                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                                </span>
                            </Link>

                            {/* View Our Portfolio Outlined Button */}
                            <Link href="/portfolio" className="group flex items-center justify-center text-neutral-900 hover:text-[#0072F5] font-bold uppercase tracking-wider text-xs sm:text-sm transition-colors duration-300 w-full sm:w-auto py-3.5 sm:py-0 border border-neutral-200 sm:border-0 rounded-full sm:rounded-none">
                                Explore Our Work
                                <span className="ml-3 w-8 h-8 rounded-full border border-neutral-300 group-hover:border-[#0072F5] flex items-center justify-center transition-all group-hover:translate-x-1 shrink-0">
                                    <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                                </span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Column Content - Interactive Widget */}
                    <div className="hidden lg:flex lg:col-span-5 relative z-10 justify-end">
                        <motion.div 
                            className="relative flex flex-col items-center justify-center w-full max-w-[340px] sm:max-w-[380px] h-[360px] sm:h-[420px]"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            {/* Ambient light glow behind the widget */}
                            <div className="absolute w-[240px] sm:w-[280px] h-[240px] sm:h-[280px] rounded-full bg-gradient-to-tr from-violet-200/20 to-blue-300/10 blur-[50px] sm:blur-[60px] pointer-events-none -z-10" />

                            {/* Main Performance Card */}
                            <motion.div 
                                className="w-[280px] sm:w-[300px] bg-white/90 backdrop-blur-md border border-neutral-200/80 p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 z-10"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-400">Core Web Vitals</span>
                                    <span className="flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] sm:text-[10px] font-semibold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Live
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-xs font-semibold text-neutral-700">Page Speed Index</span>
                                            <span className="text-lg sm:text-xl font-black text-neutral-900">99<span className="text-[9px] sm:text-[10px] font-normal text-neutral-400">/100</span></span>
                                        </div>
                                        <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                                            <motion.div 
                                                className="bg-emerald-500 h-full rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: "99%" }}
                                                transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-xs font-semibold text-neutral-700">SEO Visibility</span>
                                            <span className="text-lg sm:text-xl font-black text-neutral-900">100%</span>
                                        </div>
                                        <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                                            <motion.div 
                                                className="bg-blue-500 h-full rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Widget 2: Business Growth / Conversion */}
                            <motion.div 
                                className="absolute -right-2 sm:right-0 top-12 sm:top-10 w-[130px] sm:w-[160px] bg-white/95 backdrop-blur-md border border-neutral-200/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 z-20"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-[8px] sm:text-[9px] font-mono text-neutral-400 uppercase tracking-widest block mb-0.5">Conversion Rate</span>
                                <span className="text-base sm:text-lg font-bold text-neutral-900">+14.8%</span>
                                <span className="text-[8px] sm:text-[9px] text-neutral-400 block mt-0.5">v.s. last month</span>
                            </motion.div>

                            {/* Floating Widget 3: Tech Stack / Tags */}
                            <motion.div 
                                className="absolute -left-2 sm:left-0 bottom-12 sm:bottom-8 bg-white/95 backdrop-blur-md border border-neutral-200/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg z-20"
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-[8px] sm:text-[9px] font-mono text-neutral-400 uppercase tracking-widest block mb-2">Our Stack</span>
                                <div className="flex flex-wrap gap-1 max-w-[110px] sm:max-w-[130px]">
                                    {['Next.js', 'UI/UX', 'SEO', 'React'].map((tag) => (
                                        <span key={tag} className="text-[7px] sm:text-[8px] font-medium bg-neutral-50 border border-neutral-200 text-neutral-600 px-1 sm:px-1.5 py-0.5 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
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
                        <text className="text-[7.2px] font-mono uppercase fill-neutral-500 tracking-[0.25em] font-semibold">
                            <textPath href="#circlePath">SCROLL DOWN • SCROLL DOWN • </textPath>
                        </text>
                    </svg>
                    
                    {/* Centered Blue/Indigo Circle with down arrow */}
                    <div className="absolute w-11 h-11 rounded-full bg-gradient-to-r from-[#2B1E77] to-[#0072F5] flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-110 active:scale-95 transition-transform"
                         onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                        <ArrowDown className="w-5 h-5 text-white stroke-[2.5]" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero

