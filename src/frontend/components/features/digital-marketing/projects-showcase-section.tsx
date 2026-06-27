import React, { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SpotlightButton, Parallax, Magnetic } from '@/frontend/animations'

const projects = [
    {
        id: 1,
        title: "ScaleUp SaaS",
        category: "Growth Strategy",
        description: "Achieved 300% ARR growth in 12 months through targeted PPC and content marketing strategies.",
        details: "We implemented a full-funnel tracking system that attributed every lead to its source. Our targeted LinkedIn and Google Ads campaigns focused on high-intent keywords, reducing wasted ad spend by 40% while quadrupling qualified leads.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        stats: ["300% ARR", "10x ROAS", "Automated"]
    },
    {
        id: 2,
        title: "Brand Renewal",
        category: "Social Media",
        description: "Complete social media overhaul for a legacy fashion brand, resulting in 1M+ organic reach.",
        details: "By revitalizing the brand's visual identity and tone of voice, we connected with a younger demographic on TikTok and Instagram. Our influencer partnership program generated 500k+ user-generated content pieces.",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
        stats: ["1M+ Reach", "15% Eng. Rate", "Viral Campaign"]
    },
    {
        id: 3,
        title: "Global Reach",
        category: "SEO & Content",
        description: "Dominated search results for competitive keywords across 5 international markets.",
        details: "We conducted a comprehensive international SEO audit and localized content for 5 key regions. Our technical SEO improvements fixed over 2,000 crawl errors, leading to a 500% surge in organic traffic from non-English markets.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        stats: ["#1 Rankings", "500% Traffic", "Global SEO"]
    },
    {
        id: 4,
        title: "Conversion King",
        category: "CRO & Analytics",
        description: "Data-driven CRO program that doubled e-commerce conversion rates within one quarter.",
        details: "Through heatmapping and A/B testing, we identified friction points in the checkout process. We redesigned the product pages and simplified the checkout flow, resulting in a 15% reduction in cart abandonment and a 2x conversion rate increase.",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        stats: ["2x Conv. Rate", "-40% CPA", "Record Sales"]
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
                            Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Results</span>
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Real results for ambitious brands. We do not just build software; we build success stories.form businesses.
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
                                            {expandedId === project.id ? 'Close Details' : 'See Improvements'}
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
