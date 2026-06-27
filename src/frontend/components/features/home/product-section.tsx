'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { PortfolioItem } from '@/shared/types/api'


const ProductSection = () => {
    const [products, setProducts] = useState<PortfolioItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)
    // Fetch Data
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`/api/portfolio?type=Our Product&t=${Date.now()}`)
                const data = await response.json()
                if (data.success) {
                    // Limit to 4 products on home page
                    setProducts(data.data.items.slice(0, 4))
                }
            } catch (error) {
                console.error('Failed to fetch products:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProducts()
    }, [])

    /* 
    // Scroll Sound Logic - Commented out
    const audioCtxRef = useRef<AudioContext | null>(null)
    const lastScrollY = useRef(0)
    const scrollAccumulator = useRef(0)

    const playClickSound = () => {
        try {
            if (!audioCtxRef.current) {
                const AudioContext = window.AudioContext || (window as any).webkitAudioContext
                if (AudioContext) {
                    audioCtxRef.current = new AudioContext()
                }
            }
            const ctx = audioCtxRef.current
            if (!ctx) return

            if (ctx.state === 'suspended') ctx.resume()

            const osc = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.connect(gain)
            gain.connect(ctx.destination)

            // Custom sound
            osc.type = 'triangle'
            osc.frequency.setValueAtTime(1200, ctx.currentTime)
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05)

            gain.gain.setValueAtTime(0.15, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)

            osc.start()
            osc.stop(ctx.currentTime + 0.05)
        } catch (e) {
            // Ignore
        }
    }

    useEffect(() => {
        let ticking = false

        const update = () => {
            if (!containerRef.current) {
                ticking = false
                return
            }

            const currentScrollY = window.scrollY
            const delta = Math.abs(currentScrollY - lastScrollY.current)
            lastScrollY.current = currentScrollY

            const rect = containerRef.current.getBoundingClientRect()
            const isStickyActive = rect.top <= 0 && rect.bottom >= window.innerHeight

            if (isStickyActive) {
                scrollAccumulator.current += delta
                if (scrollAccumulator.current > 50) {
                    playClickSound()
                    scrollAccumulator.current = 0
                }
            }

            ticking = false
        }

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(update)
                ticking = true
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])
    */

    if (isLoading) {
        return (
            <section className="bg-black min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-[#FF3333]" />
            </section>
        )
    }

    if (products.length === 0) return null

    return (
        <section
            ref={containerRef}
            className="relative bg-[#050505] text-white py-[100px] noise-bg" // Static padding is safer
        >
            <div className="flex flex-col lg:flex-row">

                {/* --- Left Sticky Panel --- */}
                {/* Stays fixed while the right side scrolls */}
                <div className="w-full lg:w-1/2 lg:h-screen lg:sticky lg:top-0 px-4 sm:px-6 lg:px-8 lg:pl-16 flex flex-col justify-start pt-24 lg:pt-48 z-10">

                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.85] tracking-tighter text-white mb-6 sm:mb-8 uppercase">
                                PRODUCTS
                            </h2>

                            {/* 3-Line Reveal Text */}
                            <div className="max-w-md mb-8 sm:mb-10 md:mb-12 space-y-2">
                                {[
                                    "Crafting digital excellence with precision,",
                                    "structuring intuitive user experiences,",
                                    "and deploying scalable solutions."
                                ].map((line, i) => (
                                    <div key={i} className="overflow-hidden">
                                        <motion.p
                                            initial={{ y: "100%" }}
                                            whileInView={{ y: 0 }}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                            className="text-gray-400 text-base sm:text-lg font-light leading-snug"
                                        >
                                            {line}
                                        </motion.p>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/portfolio"
                                className="group inline-flex items-center gap-3 sm:gap-4 bg-white hover:bg-gray-200 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all uppercase font-bold tracking-wider text-xs sm:text-sm"
                            >
                                Learn More
                                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Left side decorative elements */}
                    <div className="absolute bottom-12 left-16 hidden lg:block">
                        <div className="flex items-center gap-4 text-xs font-mono text-gray-600 uppercase tracking-widest">
                            <span>Scroll</span>
                            <div className="w-12 h-[1px] bg-gray-600" />
                            <span>To Explore</span>
                        </div>
                    </div>
                </div>

                {/* --- Right Stacking Panel --- */}
                <div className="w-full lg:w-1/2 bg-[#0A0A0A]">
                    {products.map((product, index) => (
                        <Card
                            key={product.id}
                            product={product}
                            index={index}
                            total={products.length}
                        />
                    ))}

                    {/* Extra spacer at bottom to ensure last card can be fully viewed/scrolled past if needed */}
                    <div className="h-[25vh] bg-[#0A0A0A]" />
                </div>

            </div >
        </section >
    )
}

const Card = ({ product, index }: { product: PortfolioItem, index: number, total: number }) => {

    return (
        <div
            className="sticky h-screen flex flex-col justify-center px-4 md:px-8 py-8"
            style={{
                top: 0,
                zIndex: index + 1
            }}
        >
            <motion.div
                className="relative w-full bg-[#111] border border-white/10 rounded-xl md:rounded-2xl lg:rounded-[2rem] p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-10%" }}
            >
                {/* 1. Top Image Area (Framed) */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[2/1] rounded-xl md:rounded-2xl overflow-hidden border border-white/5 mb-6 sm:mb-8 group">
                    <Image
                        src={product.imageUrl || product.preview}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Badge inside image */}
                    <div className="absolute top-4 left-4">
                        <span className="w-8 h-8 flex items-center justify-center bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-white">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </span>
                    </div>
                </div>

                {/* 2. Bottom Content Area */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
                    <div className="max-w-xl">
                        <h3 className="text-[clamp(1.75rem,5vw,3.5rem)] font-black uppercase text-white mb-3 sm:mb-4 leading-[0.9] tracking-tighter truncate">
                            {product.name}
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 sm:mb-8 max-w-sm">
                            {product.description}
                        </p>

                        <Link
                            href={product.projectLink || "#"}
                            className="inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-8 bg-white text-black hover:bg-blue-600 hover:text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded-sm transition-colors"
                        >
                            Discover Service
                            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2" />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <span className="text-[3rem] lg:text-[4rem] leading-none font-black text-[#1A1A1A] font-mono">
                            {(index + 1).toString().padStart(2, '0')}
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default ProductSection
