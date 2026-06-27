'use client'

import React from 'react'
import { ServiceVertical } from './service-vertical'

export const ServicesSection = () => {
    return (
        <section className="bg-background">
            <ServiceVertical
                title="Enterprise Software"
                description="Mission-critical software for large organizations. We build scalable, secure, and compliant solutions that handle millions of transactions."
                features={[
                    "ERP & CRM Systems",
                    "Business Intelligence Dashboards",
                    "Workflow Automation Tools",
                    "Legacy System Modernization"
                ]}
                image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80"
                align="left"
            />

            <ServiceVertical
                title="SaaS Platforms"
                description="Multi-tenant cloud platforms with subscription billing, user management, and analytics. Built for rapid scaling and global reach."
                features={[
                    "Multi-Tenant Architecture",
                    "Subscription & Billing Integration",
                    "API-First Development",
                    "Real-Time Analytics"
                ]}
                image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
                align="right"
            />

            <ServiceVertical
                title="Custom APIs"
                description="RESTful and GraphQL APIs that power your applications. Secure, documented, and built for performance and scalability."
                features={[
                    "RESTful & GraphQL APIs",
                    "Microservices Architecture",
                    "API Gateway & Rate Limiting",
                    "Comprehensive Documentation"
                ]}
                image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80"
                align="left"
            />
        </section>
    )
}
