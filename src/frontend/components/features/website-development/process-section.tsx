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
                            THE DEVELOPMENT <br />
                            <span className="text-primary">PROCESS</span>
                        </h2>
                        <p className="text-xl text-muted-foreground mb-12">
                            Our comprehensive development lifecycle ensures high-performance, secure, and scalable web solutions.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <ProcessStep
                            number="01"
                            title="Discovery & Research"
                            description="Understanding your brand, audience, and goals to create a strategic foundation."
                            index={0}
                        />
                        <ProcessStep
                            number="02"
                            title="Design & Prototyping"
                            description="Creating stunning visual designs and interactive prototypes for your approval."
                            index={1}
                        />
                        <ProcessStep
                            number="03"
                            title="Development"
                            description="Building your website with clean code, optimized performance, and SEO best practices."
                            index={2}
                        />
                        <ProcessStep
                            number="04"
                            title="Testing & QA"
                            description="Rigorous testing across devices and browsers to ensure flawless functionality."
                            index={3}
                        />
                        <ProcessStep
                            number="05"
                            title="Launch & Optimize"
                            description="Deploying your website and continuously optimizing for better performance and conversions."
                            index={4}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
