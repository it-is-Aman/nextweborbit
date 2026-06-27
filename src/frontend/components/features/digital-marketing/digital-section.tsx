'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { HeroSection } from './hero-section'
import { ServicesSection } from './services-section'
import { ProcessSection } from './process-section'
import { IndustriesSection } from './industries-section'
import { TechnologyArsenalSection } from './technology-arsenal-section'
import { ProjectsShowcaseSection } from './projects-showcase-section'

gsap.registerPlugin(ScrollTrigger)

export default function DigitalSection() {
    const containerRef = useRef(null)

    return (
        <div ref={containerRef} className="w-full bg-background text-foreground font-sans selection:bg-primary/30">
            <HeroSection />
            <ServicesSection />
            <TechnologyArsenalSection />
            <ProjectsShowcaseSection />
            <ProcessSection />
            <IndustriesSection />

        </div>
    )
}
