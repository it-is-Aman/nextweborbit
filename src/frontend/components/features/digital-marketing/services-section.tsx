'use client'

import React from 'react'
import { ServiceVertical } from './service-vertical'

export const ServicesSection = () => {
    return (
        <section className="bg-background">
            <ServiceVertical
                title="Paid Advertising"
                description="High-ROI ad campaigns across Google, Facebook, Instagram, and LinkedIn. We optimize every dollar for maximum conversions and qualified leads."
                features={[
                    "Google Ads & PPC Management",
                    "Social Media Advertising",
                    "Retargeting & Remarketing",
                    "Conversion Rate Optimization"
                ]}
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
                align="left"
            />

            <ServiceVertical
                title="Social Media Marketing"
                description="Build engaged communities and drive brand awareness across all major platforms. From content creation to community management, we handle it all."
                features={[
                    "Content Strategy & Creation",
                    "Community Management",
                    "Influencer Partnerships",
                    "Social Analytics & Reporting"
                ]}
                image="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80"
                align="right"
            />

            <ServiceVertical
                title="Email Marketing"
                description="Automated email campaigns that nurture leads and drive conversions. Personalized messaging that resonates with your audience at every stage."
                features={[
                    "Email Campaign Strategy",
                    "Marketing Automation",
                    "List Segmentation & Personalization",
                    "A/B Testing & Optimization"
                ]}
                image="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80"
                align="left"
            />
        </section>
    )
}
