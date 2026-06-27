'use client'

import React from 'react'
import { Layout, Smartphone, ShoppingBag, PieChart, Globe, Zap } from 'lucide-react'
import { IndustryCard } from './industry-card'

const INDUSTRIES = [
    { title: 'SaaS & Enterprise', icon: PieChart },
    { title: 'Mobile Applications', icon: Smartphone },
    { title: 'E-commerce Solutions', icon: ShoppingBag },
    { title: 'Marketing Portals', icon: Globe },
    { title: 'Product Strategy', icon: Zap },
    { title: 'Web Platforms', icon: Layout },
]

export const IndustriesSection = () => {
    return (
        <section className="py-32 bg-background">
            <div className="container mx-auto max-w-[1440px] px-6">
                <div className="mb-20">
                    <span className="text-primary font-bold text-lg mb-4 block tracking-wide uppercase">
                        Design Specializations
                    </span>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] opacity-90 mb-8 uppercase">
                        What We <br /> <span className="text-primary">Design</span>
                    </h2>
                    <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed text-muted-foreground max-w-2xl">
                        We specialize in creating user-centered designs for a wide range of digital products and industries, ensuring every pixel serves a purpose.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {INDUSTRIES.map((industry, index) => (
                        <IndustryCard key={index} {...industry} />
                    ))}
                </div>
            </div>
        </section>
    )
}
