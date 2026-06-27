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
                            THE MARKETING <br />
                            <span className="text-primary">PLAYBOOK</span>
                        </h2>
                        <p className="text-xl text-muted-foreground mb-12">
                            Our proven framework for creating campaigns that drive real business results and sustainable growth.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <ProcessStep
                            number="01"
                            title="Market Research"
                            description="Deep analysis of your audience, competitors, and market opportunities to inform strategy."
                            index={0}
                        />
                        <ProcessStep
                            number="02"
                            title="Strategy Development"
                            description="Creating a comprehensive marketing plan with clear goals, KPIs, and channel mix."
                            index={1}
                        />
                        <ProcessStep
                            number="03"
                            title="Campaign Launch"
                            description="Executing multi-channel campaigns with compelling creative and targeted messaging."
                            index={2}
                        />
                        <ProcessStep
                            number="04"
                            title="Optimization"
                            description="Continuous A/B testing and data analysis to improve performance and ROI."
                            index={3}
                        />
                        <ProcessStep
                            number="05"
                            title="Scale & Grow"
                            description="Scaling successful campaigns and expanding into new channels for maximum impact."
                            index={4}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
