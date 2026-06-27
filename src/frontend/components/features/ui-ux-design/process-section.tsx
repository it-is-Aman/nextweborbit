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
                            THE USER-CENTRIC <br />
                            <span className="text-primary">PROCESS</span>
                        </h2>
                        <p className="text-xl text-muted-foreground mb-12">
                            Our design process puts the user first, creating intuitive and engaging experiences that drive results.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <ProcessStep
                            number="01"
                            title="Discovery & Research"
                            description="Deep diving into user behavior, market trends, and business goals to build a strategic foundation."
                            index={0}
                        />
                        <ProcessStep
                            number="02"
                            title="Information Architecture"
                            description="Structuring complex data into intuitive sitemaps and wireframes to ensure seamless navigation."
                            index={1}
                        />
                        <ProcessStep
                            number="03"
                            title="Interaction Design"
                            description="Building high-fidelity interactive prototypes to simulate and test the end-to-end product experience."
                            index={2}
                        />
                        <ProcessStep
                            number="04"
                            title="Visual Design Systems"
                            description="Crafting stunning visual identities and scalable design systems that reflect your brand essence."
                            index={3}
                        />
                        <ProcessStep
                            number="05"
                            title="Usability Testing"
                            description="Rigorous testing and audits to identify friction points and optimize for maximum engagement."
                            index={4}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
