'use client'

import { motion } from 'framer-motion'
import { BottomToCenter } from '@/frontend/animations'

export default function CareerHeroSection() {
    return (
        <BottomToCenter>
            <div className="mb-12">
                {/* We're hiring tag */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="inline-block mb-6"
                >
                    <span className="px-4 py-2 bg-foreground text-background rounded-full text-sm font-medium">
                        We&apos;re hiring!
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] opacity-90 mb-8 uppercase text-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Be part of our mission
                </motion.h1>

                {/* Mission Statement */}
                <motion.p
                    className="text-lg md:text-xl font-light opacity-80 leading-relaxed text-muted-foreground max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    We&apos;re looking for passionate people to join us on our mission. We value flat hierarchies, clear communication, and full ownership and responsibility.
                </motion.p>
            </div>
        </BottomToCenter>
    )
}
