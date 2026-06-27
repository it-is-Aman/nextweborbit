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
        title: "Traffic Surge",
        category: "E-commerce SEO",
        description: "Helped a niche retailer rank #1 for high-volume keywords, driving a 500% increase in organic traffic.",
        details: "We identified underutilized long-tail keywords and optimized the site architecture for better crawlability. This resulted in a 500% traffic increase and a sustainable top-ranking position for high-value commercial terms.",
        image: "https://images.unsplash.com/photo-1572521165329-b197f9ea3da6?w=800&q=80",
        stats: ["500% Traffic", "#1 Rankings", "250% Rev"]
    },
    {
        id: 2,
        title: "Local Dominance",
        category: "Local SEO",
        description: "Optimized GMB and local citations for a multi-location dental practice, resulting in 4x more appointments.",
        details: "Our team optimized Google My Business profiles for 15 locations, ensuring NAP consistency across all directories. This led to a 4x increase in map pack visibility and a significant boost in local appointment bookings.",
        image: "https://images.unsplash.com/photo-1576091160550-21733699136f?w=800&q=80",
        stats: ["4x Leads", "Top 3 Pack", "High CTR"]
    },
    {
        id: 3,
        title: "Tech Audit Fix",
        category: "Technical SEO",
        description: "Resolved critical indexing issues for a massive news portal, recovering from a major algorithm penalty.",
        details: "A deep technical audit revealed 1.5 million orphan pages and severe canonicalization issues. By restructuring the URL hierarchy and fixing the sitemap, we recovered 40% of the indexed pages within 3 months.",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
        stats: ["Full Recovery", "Site Speed", "+40% Indices"]
    },
    {
        id: 4,
        title: "Link Velocity",
        category: "Off-Page SEO",
        description: "Executed a high-authority backlink campaign that boosted domain authority by 20 points.",
        details: "We executed a white-hat link-building campaign, securing placements on high-authority industry publications. This boosted the site's Domain Authority by 20 points, correlating directly with improved organic rankings.",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
        stats: ["+20 DA", "High Trust", "Organic Growth"]
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
                            Success Stories
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6">
                            SEO <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Wins</span>
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
                                            {expandedId === project.id ? 'Close Analysis' : 'View Analysis'}
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
