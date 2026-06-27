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
        title: "Modern E-com",
        category: "E-commerce",
        description: "Headless Shopify store with Next.js frontend, featuring sub-second page loads and 3D product previews.",
        details: "We leveraged Next.js static site generation to achieve instant page loads. The 3D product previews used WebGL for smooth interaction, resulting in users spending 200% more time on product pages.",
        image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&q=80",
        stats: ["99/100 Speed", "3D Views", "+45% Conv."]
    },
    {
        id: 2,
        title: "Corp. Identity",
        category: "Corporate Site",
        description: "Minimalist corporate website for a VC firm, emphasizing typography and micro-interactions.",
        details: "The site utilizes a custom headless CMS for easy content management. Subtle scroll-triggered animations and a refined typographic hierarchy guide visitors through the firm's portfolio, enhancing brand credibility.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
        stats: ["Clean Design", "Storytelling", "SEO Optimized"]
    },
    {
        id: 3,
        title: "News Portal",
        category: "Content Platform",
        description: "High-traffic news aggregation platform handling 1M+ daily visitors with personalized feeds.",
        details: "Engineered for high concurrency, this platform caches content at the edge to serve global users instantly. The recommendation engine analyzes reading habits to serve personalized content streams.",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
        stats: ["1M+ Daily", "Personalized", "Ad Tech"]
    },
    {
        id: 4,
        title: "Creative Folio",
        category: "Portfolio Site",
        description: "Award-winning portfolio for a digital artist, utilizing WebGL for immersive background effects.",
        details: "This portfolio pushes the boundaries of web design with canvas-based visual effects. Despite the heavy visuals, we optimized asset loading to maintain a 99 Performance score on Lighthouse.",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
        stats: ["Awwwards", "WebGL", "Interactive"]
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
                            Featured Projects
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6">
                            Web <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Masterpieces</span>
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Websites that look stunning and perform perfectly.
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
                                            {expandedId === project.id ? 'Close Details' : 'Visit Website'}
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
