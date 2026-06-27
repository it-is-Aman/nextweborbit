'use client'

import React from 'react'
import Link from 'next/link'
import { SpotlightButton } from '@/frontend/animations'

export const CTASection = () => {
    return (
        <section className="py-40 bg-primary text-primary-foreground text-center">
            <div className="container mx-auto px-6">
                <h2 className="text-[clamp(3rem,8vw,6rem)] font-black leading-none mb-8">
                    CRAFT YOUR VISION
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl opacity-90 mb-12 max-w-2xl mx-auto">
                    Let&apos;s build an experience that resonates with your users and elevates your brand.
                </p>
                <SpotlightButton asChild>
                    <Link href="/portfolio">Explore Projects</Link>
                </SpotlightButton>
            </div>
        </section>
    )
}
