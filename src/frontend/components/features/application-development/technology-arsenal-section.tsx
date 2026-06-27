'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TiltCard, Parallax, Magnetic, StaggerContainer, StaggerItem } from '@/frontend/animations'

const techCategories = [
    {
        category: "Frontend",
        color: "from-blue-500 to-cyan-500",
        technologies: ["React", "Next.js", "Vue.js", "Angular", "Svelte", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
        category: "Backend",
        color: "from-green-500 to-emerald-500",
        technologies: ["Node.js", "Python", "Java", "Go", "Ruby", "PHP", "Express", "NestJS"]
    },
    {
        category: "Mobile",
        color: "from-purple-500 to-pink-500",
        technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic", "Xamarin"]
    },
    {
        category: "Database",
        color: "from-orange-500 to-red-500",
        technologies: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch", "DynamoDB", "Firebase"]
    },
    {
        category: "Cloud & DevOps",
        color: "from-indigo-500 to-purple-500",
        technologies: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions"]
    },
    {
        category: "AI & ML",
        color: "from-pink-500 to-rose-500",
        technologies: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "Scikit-learn", "Pandas"]
    }
]

export const TechnologyArsenalSection = () => {
    const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

    return (
        <section className="py-32 bg-background relative overflow-hidden">
            {/* Background decoration */}
            <Parallax offset={30} className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
            </Parallax>

            <div className="container mx-auto max-w-[1440px] px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wider mb-6">
                        TECHNOLOGY STACK
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6">
                        Technology <span className="text-primary">Arsenal</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Hover to explore our cutting-edge tech stack
                    </p>
                </motion.div>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {techCategories.map((tech, index) => {
                        const isHovered = hoveredCategory === index

                        return (
                            <StaggerItem key={index}>
                                <TiltCard className="h-full">
                                    <div
                                        onMouseEnter={() => setHoveredCategory(index)}
                                        onMouseLeave={() => setHoveredCategory(null)}
                                        className="group relative bg-muted/50 border border-border rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 cursor-pointer overflow-hidden h-full"
                                    >
                                        {/* Animated gradient background */}
                                        <motion.div
                                            animate={{
                                                opacity: isHovered ? 0.1 : 0,
                                                scale: isHovered ? 1 : 0.8
                                            }}
                                            transition={{ duration: 0.5 }}
                                            className={`absolute inset-0 bg-gradient-to-br ${tech.color} blur-2xl`}
                                        />

                                        <div className="relative z-10">
                                            {/* Category header */}
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-2xl font-black uppercase group-hover:text-primary transition-colors">
                                                    {tech.category}
                                                </h3>
                                                <Magnetic>
                                                    <motion.div
                                                        animate={{ rotate: isHovered ? 180 : 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${tech.color} flex items-center justify-center`}
                                                    >
                                                        <span className="text-white font-bold text-lg">
                                                            {tech.technologies.length}
                                                        </span>
                                                    </motion.div>
                                                </Magnetic>
                                            </div>

                                            {/* Technology badges - revealed on hover */}
                                            <motion.div
                                                initial={{ height: 60, opacity: 0.5 }}
                                                animate={{
                                                    height: isHovered ? 'auto' : 60,
                                                    opacity: isHovered ? 1 : 0.5
                                                }}
                                                transition={{ duration: 0.4 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="flex flex-wrap gap-2">
                                                    {tech.technologies.map((technology, techIndex) => (
                                                        <motion.span
                                                            key={techIndex}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{
                                                                opacity: isHovered ? 1 : 0.6,
                                                                scale: isHovered ? 1 : 0.9
                                                            }}
                                                            transition={{ delay: techIndex * 0.05 }}
                                                            className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all"
                                                        >
                                                            {technology}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </motion.div>

                                            {/* Hover hint */}
                                            {!isHovered && (
                                                <motion.p
                                                    initial={{ opacity: 1 }}
                                                    animate={{ opacity: isHovered ? 0 : 1 }}
                                                    className="text-xs text-muted-foreground mt-4 text-center"
                                                >
                                                    Hover to see all technologies
                                                </motion.p>
                                            )}
                                        </div>
                                    </div>
                                </TiltCard>
                            </StaggerItem>
                        )
                    })}
                </StaggerContainer>

            </div>
        </section>
    )
}
