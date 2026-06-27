'use client'

import React from 'react'
import { TechCategory } from './tech-category'

export const TechStackSection = () => {
    return (
        <section className="py-32 bg-muted/20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-600/5 rounded-full blur-[128px]" />
            </div>

            <div className="container mx-auto max-w-[1440px] px-6 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-primary font-bold text-lg mb-4 block tracking-wide uppercase">
                        Design Arsenal
                    </span>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] opacity-90 mb-8 uppercase">
                        Creative Toolkit
                    </h2>
                    <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                        We leverage industry-leading tools to craft exceptional digital experiences from concept to handoff.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <TechCategory
                        title="DESIGN & LAYOUT"
                        items={["Figma", "Sketch", "Adobe XD", "Photoshop", "Illustrator"]}
                    />
                    <TechCategory
                        title="PROTOTYPING"
                        items={["Framer", "Protopie", "InVision", "Principle", "Marvel"]}
                    />
                    <TechCategory
                        title="COLLABORATION"
                        items={["Zeplin", "Storybook", "Slack", "Miro", "Loom"]}
                    />
                    <TechCategory
                        title="USABILITY"
                        items={["Hotjar", "Maze", "Optimal Workshop", "Lookback", "Google Analytics"]}
                    />
                </div>
            </div>
        </section>
    )
}
