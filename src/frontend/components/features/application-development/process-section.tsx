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
                            THE ENGINEERING <br />
                            <span className="text-primary">BLUEPRINT</span>
                        </h2>
                        <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed text-muted-foreground mb-12">
                            Our proven methodology ensures transparency, velocity, and quality at every stage of the development lifecycle.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <ProcessStep
                            number="01"
                            title="Discovery & Strategy"
                            description="We dive deep into your business goals, user needs, and market landscape to define a winning product strategy."
                            index={0}
                        />
                        <ProcessStep
                            number="02"
                            title="Architecture & Design"
                            description="Crafting scalable system architectures and intuitive UI/UX designs that delight users and support growth."
                            index={1}
                        />
                        <ProcessStep
                            number="03"
                            title="Agile Development"
                            description="Iterative development sprints with regular demos, ensuring we build the right product, faster."
                            index={2}
                        />
                        <ProcessStep
                            number="04"
                            title="Quality Assurance"
                            description="Rigorous automated and manual testing to ensure bug-free, secure, and performant releases."
                            index={3}
                        />
                        <ProcessStep
                            number="05"
                            title="Deployment & Scale"
                            description="Seamless CI/CD pipelines and cloud infrastructure setup for high availability and auto-scaling."
                            index={4}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
