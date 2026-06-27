'use client'

import React from 'react'
import { ServiceVertical } from './service-vertical'

export const ServicesSection = () => {
    return (
        <section className="bg-background">
            <ServiceVertical
                title="On-Page SEO"
                description="Optimize every element of your website for maximum search engine visibility. From meta tags to content structure, we ensure your pages are perfectly optimized."
                features={[
                    "Keyword Research & Optimization",
                    "Content Structure & Schema Markup",
                    "Meta Tags & Header Optimization",
                    "Internal Linking Strategy"
                ]}
                image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
                align="left"
            />

            <ServiceVertical
                title="Off-Page SEO"
                description="Build authority and trust through strategic link building and brand mentions. We create a powerful backlink profile that boosts your domain authority."
                features={[
                    "High-Quality Backlink Acquisition",
                    "Guest Posting & Outreach",
                    "Brand Mention Monitoring",
                    "Competitor Analysis"
                ]}
                image="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80"
                align="right"
            />

            <ServiceVertical
                title="Technical SEO"
                description="Ensure your website is crawlable, indexable, and lightning-fast. We fix technical issues that prevent search engines from ranking your site."
                features={[
                    "Site Speed Optimization",
                    "Mobile-First Indexing",
                    "XML Sitemaps & Robots.txt",
                    "Core Web Vitals Optimization"
                ]}
                image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
                align="left"
            />
        </section>
    )
}
