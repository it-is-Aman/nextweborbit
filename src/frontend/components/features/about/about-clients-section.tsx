'use client'

import { useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import NextImage from 'next/image'

const CLIENT_LOGOS = [
    { name: 'ACF', logo: '/uploads/clints/acf.png' },
    { name: 'AIM', logo: '/uploads/clints/aim.png' },
    { name: 'AKV', logo: '/uploads/clints/akv.png' },
    { name: 'AR', logo: '/uploads/clints/ar.png' },
    { name: 'AWG', logo: '/uploads/clints/awg.webp' },
    { name: 'BMS', logo: '/uploads/clints/bms.png' },
    { name: 'CC', logo: '/uploads/clints/cc.png' },
    { name: 'Clean Tree', logo: '/uploads/clints/cleantree.png' },
    { name: 'Colour', logo: '/uploads/clints/colour.png' },
    { name: 'CY', logo: '/uploads/clints/cy.png' },
    { name: 'ONOG Insurance', logo: '/uploads/clints/onog-insurance-logo.png' },
    { name: 'Optimyz', logo: '/uploads/clints/optimyz.png' },
    { name: 'Physics', logo: '/uploads/clints/physics.png' },
    { name: 'QC', logo: '/uploads/clints/qc.png' },
    { name: 'Railways', logo: '/uploads/clints/railways.png' },
    { name: 'SMCS', logo: '/uploads/clints/smcs.png' },
    { name: 'Soulheart', logo: '/uploads/clints/soulheart.png' },
    { name: 'Spacenterio', logo: '/uploads/clints/spacenterio.png' },
    { name: 'TJ', logo: '/uploads/clints/tj.png' },
    { name: 'Wiz', logo: '/uploads/clints/wiz.png' },
    { name: 'Yog', logo: '/uploads/clints/yog.png' },
]

function MagneticLogo({ logo, index }: { logo: typeof CLIENT_LOGOS[0], index: number }) {
    const ref = useRef<HTMLDivElement>(null)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 20, stiffness: 150 }
    const x = useSpring(mouseX, springConfig)
    const y = useSpring(mouseY, springConfig)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const { left, top, width, height } = ref.current.getBoundingClientRect()
        const centerX = left + width / 2
        const centerY = top + height / 2

        mouseX.set((e.clientX - centerX) / 4)
        mouseY.set((e.clientY - centerY) / 4)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02, duration: 0.5 }}
            className="group relative aspect-[3/2] flex items-center justify-center p-6 bg-background border border-border/50 rounded-xl hover:border-primary/30 transition-colors duration-300"
        >
            <div className="relative w-full h-full transition-all duration-500">
                <NextImage
                    src={logo.logo}
                    alt={logo.name}
                    fill
                    className="object-contain p-4"
                />
            </div>
        </motion.div>
    )
}

export default function AboutClientsSection() {
    return (
        <section className="w-full py-40 bg-background text-foreground overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-primary font-bold text-lg mb-4 block tracking-wide">Elite Partners</span>
                        <h2 className="text-5xl md:text-8xl font-black leading-[0.8] tracking-tighter">
                            Trusted by <span className="text-muted-foreground/30 italic font-light">Global</span> Industry Leaders
                        </h2>
                    </div>
                    <p className="text-muted-foreground max-w-sm font-light text-lg mb-2">
                        We believe in long-term relationships that foster innovation and mutual success across every vertical.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                    {CLIENT_LOGOS.map((logo, i) => (
                        <MagneticLogo key={i} logo={logo} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
