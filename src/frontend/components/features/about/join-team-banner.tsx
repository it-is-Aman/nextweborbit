'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function JoinTeamBanner() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const x1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
    const x2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"])

    return (
        <section ref={containerRef} className="w-full py-40 bg-background overflow-hidden flex flex-col items-center justify-center relative border-t border-foreground/10">

            {/* Moving Text Background */}
            <div className="w-full flex flex-col gap-0 opacity-5 pointer-events-none select-none absolute inset-0 justify-center">
                <motion.h2 style={{ x: x1 }} className="text-[15vw] font-black whitespace-nowrap leading-[0.8] text-foreground">
                    Join The Team
                </motion.h2>
                <motion.h2 style={{ x: x2 }} className="text-[15vw] font-black whitespace-nowrap leading-[0.8] text-foreground text-right">
                    Make Impact
                </motion.h2>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                <h2 className="text-4xl md:text-6xl font-black text-foreground max-w-4xl leading-tight mb-8">
                    <span className="text-muted-foreground block text-xl md:text-2xl mb-4 tracking-wide font-medium">Careers</span>
                    Join the <span className="text-gray-500 px-2 italic">Dynamic</span><br />NextWebOrbit Team
                </h2>

                <p className="text-gray text-lg max-w-xl mx-auto mb-12">
                    Our hard work keeps paying off. Be part of a culture that celebrates innovation and creativity.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold tracking-wide flex items-center gap-3 mx-auto transition-colors hover:bg-primary/90"
                >
                    See Open Roles
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </div>

        </section>
    )
}
