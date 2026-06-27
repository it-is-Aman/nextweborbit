'use client'

import React from 'react'
import { Megaphone, Share2, Mail, MessageCircle, TrendingUp, Target, Users, BarChart } from 'lucide-react'
import { IndustryCard } from './industry-card'
import { StaggerContainer, StaggerItem } from '@/frontend/animations'

export const IndustriesSection = () => {
    return (
        <section className="py-32">
            <div className="container mx-auto max-w-[1440px] px-6">
                <div className="text-center max-w-5xl mx-auto mb-20">
                    <span className="text-primary font-bold text-lg mb-4 block tracking-wide uppercase">Marketing Mastery</span>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] opacity-90 mb-8">MARKETING CHANNELS WE MASTER</h2>
                    <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed text-muted-foreground">Comprehensive digital marketing across all major platforms.</p>
                </div>

                <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <StaggerItem><IndustryCard icon={Megaphone} title="Google Ads" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Share2} title="Social Media" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Mail} title="Email Marketing" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={MessageCircle} title="Content Marketing" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={TrendingUp} title="SEO" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Target} title="PPC" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={Users} title="Influencer" /></StaggerItem>
                    <StaggerItem><IndustryCard icon={BarChart} title="Analytics" /></StaggerItem>
                </StaggerContainer>
            </div>
        </section>
    )
}
