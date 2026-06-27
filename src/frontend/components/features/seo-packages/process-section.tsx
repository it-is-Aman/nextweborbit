'use client'

import React from 'react'
import { ProcessStep } from './process-step'

export const ProcessSection = () => {
    return (
        <section className="py-32 bg-muted/30">
            <div className="container mx-auto max-w-[1440px] px-6">
                <div className="grid lg:grid-cols-2 gap-20">
                    <div className="lg:sticky lg:top-32 h-fit">
                        <h2 className="text-5xl font-black mb-8">
                            THE SEO <br />
                            <span className="text-primary">ROADMAP</span>
                        </h2>
                        <p className="text-xl text-muted-foreground mb-12">
                            Our proven methodology to take your website from invisible to page one, driving sustainable organic growth.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <ProcessStep
                            number="01"
                            title="SEO Audit & Analysis"
                            description="Comprehensive analysis of your current SEO performance, identifying opportunities and technical issues."
                            index={0}
                        />
                        <ProcessStep
                            number="02"
                            title="Keyword Strategy"
                            description="Research and target high-value keywords that your audience is actually searching for."
                            index={1}
                        />
                        <ProcessStep
                            number="03"
                            title="On-Page Optimization"
                            description="Optimize content, meta tags, and site structure for maximum search visibility."
                            index={2}
                        />
                        <ProcessStep
                            number="04"
                            title="Link Building"
                            description="Build high-quality backlinks that boost your domain authority and rankings."
                            index={3}
                        />
                        <ProcessStep
                            number="05"
                            title="Monitor & Refine"
                            description="Continuous tracking, reporting, and optimization to maintain and improve rankings."
                            index={4}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
