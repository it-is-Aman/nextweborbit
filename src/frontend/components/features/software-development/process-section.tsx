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
                            <span className="text-primary">LIFECYCLE</span>
                        </h2>
                        <p className="text-xl text-muted-foreground mb-12">
                            Our agile development process ensures quality, speed, and alignment with your business goals.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <ProcessStep
                            number="01"
                            title="Requirements Analysis"
                            description="Deep dive into your business processes, pain points, and objectives to define the perfect solution."
                            index={0}
                        />
                        <ProcessStep
                            number="02"
                            title="System Design"
                            description="Architect scalable, secure systems with detailed technical specifications and wireframes."
                            index={1}
                        />
                        <ProcessStep
                            number="03"
                            title="Agile Development"
                            description="Iterative sprints with regular demos, ensuring we build exactly what you need."
                            index={2}
                        />
                        <ProcessStep
                            number="04"
                            title="Testing & QA"
                            description="Comprehensive testing including unit, integration, and user acceptance testing."
                            index={3}
                        />
                        <ProcessStep
                            number="05"
                            title="Deployment & Support"
                            description="Seamless deployment with ongoing maintenance, monitoring, and feature enhancements."
                            index={4}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
