'use client'

import React from 'react'
import { Zap, Award, Globe, Users, TrendingUp, BarChart, Target, LineChart } from 'lucide-react'
import { IndustryCard } from './industry-card'
import { StaggerContainer, StaggerItem } from '@/frontend/animations'

export const IndustriesSection = () => {
    return (
        <section className="py-32">
            <div className="container mx-auto max-w-[1440px] px-6">
                <div className="text-center max-w-5xl mx-auto mb-20">
                    <span className="text-primary font-bold text-lg mb-4 block tracking-wide uppercase">Global Reach</span>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] opacity-90 mb-8 uppercase">INDUSTRIES WE RANK</h2>
                    <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed text-muted-foreground">Specialized SEO strategies for diverse business sectors.</p>
                </div>

                <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <StaggerItem><IndustryCard icon={Zap} title="E-Commerce" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Award} title="SaaS" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Globe} title="Local Business" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Users} title="B2B Services" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={TrendingUp} title="Healthcare" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={BarChart} title="Finance" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Target} title="Real Estate" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={LineChart} title="Technology" /></StaggerItem>
                </StaggerContainer>
            </div>
        </section>
    )
}
