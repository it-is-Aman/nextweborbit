'use client'

import React from 'react'
import { ServiceVertical } from './service-vertical'

export const ServicesSection = () => {
    return (
        <section className="bg-background">
            <ServiceVertical
                title="SaaS & Product Design"
                description="Specialized UI/UX for complex web applications and SaaS platforms. We prioritize utility, efficiency, and clarity for your power users."
                features={[
                    "Complex Dashboard Design",
                    "Data Visualization",
                    "User Flow Optimization",
                    "Scalable Design Systems"
                ]}
                image="https://images.unsplash.com/photo-1551288049-bbbda5366991?w=1200&q=80"
                align="left"
            />

            <ServiceVertical
                title="Mobile App Experiences"
                description="Fast, fluid, and intuitive mobile app designs for iOS and Android. Specialized for touch interactions and high-performance native feels."
                features={[
                    "Native Mobile Guidelines (HIG/MD)",
                    "Gesture-Based Interaction",
                    "Micro-Animations",
                    "Cross-Platform Consistency"
                ]}
                image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80"
                align="right"
            />

            <ServiceVertical
                title="Design Systems"
                description="Creating a single source of truth for your brand. Consistent, reusable components that speed up development and ensure brand integrity."
                features={[
                    "Atomic Design Methodology",
                    "Component Libraries",
                    "Accessibility Compliance",
                    "Documentation & Handoff"
                ]}
                image="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&q=80"
                align="left"
            />
        </section>
    )
}
