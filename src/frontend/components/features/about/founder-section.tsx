'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import img1 from '@/frontend/assets/image/img1.jpg'

gsap.registerPlugin(ScrollTrigger)

export default function FounderSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const imageWrapperRef = useRef<HTMLDivElement>(null)
    const maskRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal mask animation
            gsap.fromTo(maskRef.current,
                { clipPath: 'inset(0% 100% 0% 0%)' },
                {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.5,
                    ease: 'power4.inOut',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 60%',
                    }
                }
            )

            // Parallax image within wrapper
            gsap.to(imageWrapperRef.current, {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative w-full pt-12 md:pt-16 pb-32 bg-background overflow-hidden">
            <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 -mt-6 md:-mt-10">

                {/* Left Side: Image with reveal */}
                <div className="w-full lg:w-1/2 relative aspect-square md:aspect-[4/5] lg:aspect-square rounded-xl overflow-hidden group">
                    <div ref={maskRef} className="w-full h-full">
                        <div ref={imageWrapperRef} className="w-full h-full scale-110">
                            <Image
                                src={img1 || "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=900&h=900&fit=crop"} 
                                alt="Co-founder"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    {/* Minimalistic Tag */}
                    <div className="absolute bottom-10 left-10 z-20">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-background/90 backdrop-blur-md px-6 py-4 rounded-lg border border-border"
                        >
                            <p className="text-secondary-foreground text-xs font-bold tracking-widest leading-none">Founder & Visionary</p>
                            <h3 className="text-foreground text-2xl font-black mt-2 leading-none">Brajendra Singh</h3>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side: Philosophy Content */}
                <div className="w-full lg:w-1/2 space-y-10">
                    <div className="space-y-4">
                        <span className="text-primary font-bold tracking-wide text-lg block">Our Philosophy</span>
                        <h2 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
                            Leading the wave of <span className="text-muted-foreground/40 italic font-light">Digital</span> transformation.
                        </h2>
                    </div>

                    <div className="space-y-6 text-muted-foreground text-lg md:text-xl font-light leading-relaxed max-w-xl">
                        <p>
                            We did not start NextWebOrbit to join the market. We started it to redefine it. Our goal was simple: bridge the gap between complex technology and human-centric design.
                        </p>
                        <p className="opacity-70">
                            Through consistent innovation and a relentless pursuit of excellence, we have built a team that does not just build websites; we build ecosystems for growth.
                        </p>
                    </div>

                    {/* Magnetic Signature-style text */}
                    <motion.div
                        whileHover={{ x: 10 }}
                        className="pt-8 border-t border-border inline-block"
                    >
                        <p className="text-foreground font-script text-4xl mb-2 opacity-80" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                            Brajendra Singh
                        </p>
                        <p className="text-muted-foreground text-sm font-medium tracking-widest">FOUNDER @NextWebOrbit</p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
