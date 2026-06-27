'use client'

import React from 'react'
import { Shield, Zap, Server, Cloud, Cpu, Database, Layers, GitBranch } from 'lucide-react'
import { IndustryCard } from './industry-card'
import { StaggerContainer, StaggerItem } from '@/frontend/animations'

export const IndustriesSection = () => {
    return (
        <section className="py-32">
            <div className="container mx-auto max-w-[1440px] px-6">
                <div className="text-center max-w-5xl mx-auto mb-20">
                    <span className="text-primary font-bold text-lg mb-4 block tracking-wide uppercase">Industry Focus</span>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] opacity-90 mb-8 uppercase">Software For Every Industry</h2>
                    <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed text-muted-foreground">Custom solutions tailored to your industry&apos;s unique challenges.</p>
                </div>

                <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <StaggerItem><IndustryCard icon={Shield} title="Healthcare" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Zap} title="Fintech" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Server} title="Logistics" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Cloud} title="Manufacturing" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Cpu} title="Retail" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Database} title="Education" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Layers} title="Real Estate" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={GitBranch} title="Government" /></StaggerItem>
                </StaggerContainer>
            </div>
        </section>
    )
}
