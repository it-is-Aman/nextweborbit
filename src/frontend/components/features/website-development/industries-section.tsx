'use client'

import React from 'react'
import { Rocket, Globe, Sparkles, TrendingUp, Palette, Monitor, Layout, Zap } from 'lucide-react'
import { IndustryCard } from './industry-card'
import { StaggerContainer, StaggerItem } from '@/frontend/animations'

export const IndustriesSection = () => {
    return (
        <section className="py-32">
            <div className="container mx-auto max-w-[1440px] px-6">
                <div className="text-center max-w-5xl mx-auto mb-20">
                    <span className="text-primary font-bold text-lg mb-4 block tracking-wide uppercase">Web Success</span>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] opacity-90 mb-8">WEBSITES FOR EVERY BUSINESS</h2>
                    <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed text-muted-foreground">Custom web solutions tailored to your industry and audience.</p>
                </div>

                <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <StaggerItem><IndustryCard icon={Rocket} title="Startups" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Globe} title="E-Commerce" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Sparkles} title="Agencies" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={TrendingUp} title="SaaS" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Palette} title="Portfolios" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Monitor} title="Corporate" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Layout} title="Blogs" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Zap} title="Non-Profit" /></StaggerItem>
                </StaggerContainer>
            </div>
        </section>
    )
}
