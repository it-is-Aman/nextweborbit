import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { SpotlightButton, BottomToCenter, TiltCard, Magnetic } from '@/frontend/animations'
import { motion } from 'framer-motion'

interface ServiceVerticalProps {
    title: string;
    description: string;
    features: string[];
    image: string;
    align?: 'left' | 'right';
}

export const ServiceVertical = ({ title, description, features, image, align = 'left' }: ServiceVerticalProps) => {
    return (
        <BottomToCenter className="py-24 border-b border-border">
            <div className="container mx-auto max-w-[1440px] px-6">
                <div className={`flex flex-col lg:flex-row gap-16 items-center ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="flex-1 space-y-8">
                        <span className="text-primary font-bold text-lg mb-4 block tracking-wide uppercase">
                            Marketing Solution
                        </span>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] opacity-90 uppercase">{title}</h2>
                        <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed text-muted-foreground max-w-xl">{description}</p>

                        <ul className="space-y-4">
                            {features.map((feature: string, i: number) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ x: 10, color: "hsl(var(--primary))" }}
                                    className="flex items-center gap-4 text-lg font-medium cursor-default transition-colors"
                                >
                                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                                    {feature}
                                </motion.li>
                            ))}
                        </ul>

                        <Magnetic>
                            <SpotlightButton className="mt-8" asChild>
                                <Link href="/portfolio">Build Solution <ArrowRight className="ml-2" /></Link>
                            </SpotlightButton>
                        </Magnetic>
                    </div>
                    <div className="flex-1 w-full">
                        <TiltCard className="w-full">
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-muted shadow-2xl">
                                <Image src={image} alt={title} fill className="object-cover hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </TiltCard>
                    </div>
                </div>
            </div>
        </BottomToCenter>
    )
}
