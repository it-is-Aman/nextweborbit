'use client'

import { motion } from 'framer-motion'
import { Lightbulb, PencilRuler, Code2, Rocket } from 'lucide-react'

const steps = [
    {
        id: 1,
        title: 'Discovery & Strategy',
        description: 'We dive deep into your business goals, user needs, and market landscape to build a solid roadmap for success.',
        icon: Lightbulb
    },
    {
        id: 2,
        title: 'Design & Prototyping',
        description: 'Our designers craft intuitive, high-fidelity UI/UX that aligns with your brand identity and engages users.',
        icon: PencilRuler
    },
    {
        id: 3,
        title: 'Development & Testing',
        description: 'We write clean, scalable code and rigorously test every feature to ensure a bug-free, high-performance product.',
        icon: Code2
    },
    {
        id: 4,
        title: 'Launch & Optimization',
        description: 'We handle the deployment process smoothly and provide ongoing support to optimize performance post-launch.',
        icon: Rocket
    }
]

const WorkflowSection = () => {
    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center max-w-5xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] opacity-90 mb-8 uppercase">
                        Our Proven Workflow
                    </h2>
                    <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed text-muted-foreground">
                        From the initial spark of an idea to the final polished product, we follow a systematic approach
                        that guarantees quality, transparency, and timely delivery at every milestone.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">

                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-border to-transparent z-0" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative z-10"
                        >
                            <div className="flex flex-col items-center text-center">
                                {/* Icon Bubble */}
                                <div className="w-20 h-20 rounded-full bg-background border-2 border-border shadow-md flex items-center justify-center mb-5 relative group transition-transform hover:scale-105 duration-300">
                                    <step.icon className="w-10 h-10 text-blue-600" />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                                        {step.id}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-foreground leading-none mb-4 text-center">{step.title}</h3>
                                <p className="text-lg font-light opacity-80 leading-relaxed text-muted-foreground text-center">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default WorkflowSection
