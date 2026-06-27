'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SpotlightButton, Parallax, Magnetic } from '@/frontend/animations'

const projects = [
    {
        id: 1,
        title: "Enterprise ERP",
        category: "Enterprise System",
        description: "A centralized ERP system managing supply chain, HR, and finance for a manufacturing giant.",
        details: "We architected a microservices-based ERP solution that unified 12 disparate legacy systems. This eliminated data silos and provided real-time visibility into inventory and financials, reducing operational costs by 25%.",
        image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80",
        stats: ["40% Effic. Gain", "Unified Data", "Real-time"]
    },
    {
        id: 2,
        title: "Fintech Core",
        category: "Financial Software",
        description: "High-frequency trading engine processing millions of transactions with microsecond latency.",
        details: "Built on C++ and optimized for low-latency networking, this trading engine can handle 100,000 orders per second. We implemented advanced risk management algorithms that execute in sub-millisecond timeframes.",
        image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?w=800&q=80",
        stats: ["Zero Latency", "Secure", "ISO 27001"]
    },
    {
        id: 3,
        title: "HealthTrack Pro",
        category: "Healthcare SaaS",
        description: "HIPAA-compliant patient management system used by 50+ clinics nationwide.",
        details: "Developed closely with clinicians, this platform features an intuitive interface that reduces documentation time by 40%. It includes a secure patient portal and seamless integration with insurance providers for automated billing.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
        stats: ["Data Secure", "Telehealth", "Integrations"]
    },
    {
        id: 4,
        title: "Smart Logistics",
        category: "IoT Platform",
        description: "IoT-enabled fleet management software for real-time tracking and predictive maintenance.",
        details: "Leveraging edge computing and IoT, we processed sensor data locally to reduce bandwidth usage. The predictive maintenance module utilizes machine learning to forecast vehicle breakdowns, preventing costly downtime.",
        image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80",
        stats: ["GPS Tracking", "Predictive AI", "Cost Saving"]
    }
]

export const ProjectsShowcaseSection = () => {
    const containerRef = useRef(null)
    const [expandedId, setExpandedId] = useState<number | null>(null)

    const toggleProject = (id: number) => {
        setExpandedId(expandedId === id ? null : id)
    }

    return (
        <section ref={containerRef} className="py-32 bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto max-w-[1440px] px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <div className="max-w-2xl">
                        <span className="text-primary font-bold text-lg mb-4 block tracking-wide uppercase">
                            Case Studies
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6">
                            Software <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Solutions</span>
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Real results for ambitious brands. We do not just build software; we build success stories.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <Magnetic>
                            <SpotlightButton asChild>
                                <Link href="/portfolio">View All Projects</Link>
                            </SpotlightButton>
                        </Magnetic>
                    </div>
                </div>

                <div className="grid gap-20">
                    {projects.map((project, index) => {
                        const isEven = index % 2 === 0
                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-start group`}
                            >
                                {/* Image Half */}
                                <div className="w-full md:w-1/2 relative">
                                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                                        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all duration-500 z-10 mix-blend-overlay" />
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    {/* Floating Stats Card - Parallax Effect */}
                                    <Parallax offset={20} className={`absolute ${isEven ? '-right-10 -bottom-10' : '-left-10 -bottom-10'} z-20 hidden md:block`}>
                                        <div className="bg-card border border-border p-6 rounded-2xl shadow-xl w-64 backdrop-blur-md bg-opacity-90">
                                            {project.stats.map((stat, i) => (
                                                <div key={i} className="flex items-center gap-2 mb-2 last:mb-0">
                                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                                    <span className="text-sm font-semibold">{stat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Parallax>
                                </div>

                                {/* Content Half */}
                                <div className="w-full md:w-1/2 pt-8">
                                    <div className="inline-block px-3 py-1 bg-muted rounded-full text-xs font-bold tracking-wider mb-6 text-muted-foreground uppercase">
                                        {project.category}
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-bold mb-6 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div>
                                        <button
                                            onClick={() => toggleProject(project.id)}
                                            className="flex items-center gap-2 text-lg font-bold uppercase tracking-wide hover:gap-4 transition-all mb-4"
                                        >
                                            {expandedId === project.id ? 'Close Solution' : 'View Solution'}
                                            <ArrowUpRight className={`w-5 h-5 text-primary transition-transform duration-300 ${expandedId === project.id ? 'rotate-90' : ''}`} />
                                        </button>

                                        <AnimatePresence>
                                            {expandedId === project.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="text-base text-muted-foreground border-l-2 border-primary pl-4 py-2 italic">
                                                        {project.details}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
