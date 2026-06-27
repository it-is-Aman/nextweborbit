'use client'

import React from 'react'
import { ServiceVertical } from './service-vertical'

export const ServicesSection = () => {
    return (
        <section className="bg-background">
            <ServiceVertical
                title="Mobile Engineering"
                description="Native and cross-platform solutions that dominate app stores. We build high-performance iOS and Android applications with fluid animations, offline capabilities, and robust security."
                features={[
                    "Native iOS (Swift) & Android (Kotlin)",
                    "Cross-Platform (React Native, Flutter)",
                    "App Store Optimization & Deployment",
                    "Offline-First Architecture"
                ]}
                image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80"
                align="left"
            />

            <ServiceVertical
                title="Web Platforms"
                description="Scalable, SEO-optimized web applications built on modern stacks. From complex SaaS dashboards to high-conversion e-commerce platforms."
                features={[
                    "Next.js & React Enterprise Apps",
                    "Progressive Web Apps (PWA)",
                    "High-Performance API Integration",
                    "Real-time Data Visualization"
                ]}
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
                align="right"
            />

            <ServiceVertical
                title="Enterprise Solutions"
                description="Digital transformation for large-scale organizations. We modernize legacy systems, automate workflows, and build secure internal tools."
                features={[
                    "Legacy System Modernization",
                    "Cloud Migration (AWS/Azure)",
                    "Microservices Architecture",
                    "Enterprise Security & Compliance"
                ]}
                image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80"
                align="left"
            />
        </section>
    )
}
