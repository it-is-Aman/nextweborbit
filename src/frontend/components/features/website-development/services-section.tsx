'use client'

import React from 'react'
import { ServiceVertical } from './service-vertical'

export const ServicesSection = () => {
    return (
        <section className="bg-background">
            <ServiceVertical
                title="Corporate Websites"
                description="Professional websites that establish credibility and showcase your brand. Built with modern design principles and optimized for conversions."
                features={[
                    "Custom Design & Branding",
                    "Responsive & Mobile-First",
                    "SEO-Optimized Structure",
                    "CMS Integration (WordPress/Webflow)"
                ]}
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
                align="left"
            />

            <ServiceVertical
                title="E-Commerce Platforms"
                description="High-converting online stores with seamless checkout experiences. Integrated with payment gateways, inventory management, and analytics."
                features={[
                    "Shopify & WooCommerce Development",
                    "Payment Gateway Integration",
                    "Product Management Systems",
                    "Conversion Rate Optimization"
                ]}
                image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80"
                align="right"
            />

            <ServiceVertical
                title="Landing Pages"
                description="High-impact landing pages designed for maximum conversions. A/B tested designs with compelling copy and clear calls-to-action."
                features={[
                    "Conversion-Focused Design",
                    "A/B Testing & Analytics",
                    "Lead Capture Forms",
                    "Fast Loading Speed"
                ]}
                image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80"
                align="left"
            />
        </section>
    )
}
