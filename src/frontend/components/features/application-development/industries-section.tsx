'use client'

import React from 'react'
import { Zap, Shield, Globe, Layers, Cpu, Database, Cloud, Smartphone } from 'lucide-react'
import { IndustryCard } from './industry-card'
import { StaggerContainer, StaggerItem } from '@/frontend/animations'

export const IndustriesSection = () => {
    return (
        <section className="py-32">
            <div className="container mx-auto max-w-[1440px] px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] opacity-90 uppercase mb-6">INDUSTRIES WE REVOLUTIONIZE</h2>
                    <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed text-muted-foreground">Deep domain expertise across key sectors allows us to solve specific challenges effectively.</p>
                </div>

                <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <StaggerItem><IndustryCard icon={Zap} title="Fintech" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Shield} title="Healthcare" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Globe} title="E-Commerce" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Layers} title="Real Estate" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Cpu} title="EdTech" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Database} title="Logistics" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Cloud} title="SaaS" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Smartphone} title="Social" /></StaggerItem>
                </StaggerContainer>
            </div>
        </section>
    )
}
