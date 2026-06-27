'use client'

import { motion } from 'framer-motion'
import { Code, Smartphone, Palette, TrendingUp, Cloud, Brain } from 'lucide-react'

export default function ExpertiseSection() {
    const services = [
        {
            title: 'Web Development',
            description: 'Custom websites, e-commerce platforms, and web applications built with modern technologies.',
            tech: 'React, Next.js, Node.js',
            icon: Code,
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            title: 'Mobile Apps',
            description: 'Native and cross-platform mobile applications for iOS and Android with seamless user experiences.',
            tech: 'React Native, Flutter, Swift',
            icon: Smartphone,
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            title: 'UI/UX Design',
            description: 'User-centered design that combines aesthetics with functionality for optimal user engagement.',
            tech: 'Figma, Adobe XD, Prototyping',
            icon: Palette,
            gradient: 'from-orange-500 to-red-500'
        },
        {
            title: 'Digital Marketing',
            description: 'Data-driven strategies to enhance your online presence and drive measurable growth.',
            tech: 'SEO, SEM, Social Media',
            icon: TrendingUp,
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            title: 'Cloud Solutions',
            description: 'Scalable cloud infrastructure and migration services for business agility and growth.',
            tech: 'AWS, Azure, Google Cloud',
            icon: Cloud,
            gradient: 'from-indigo-500 to-blue-500'
        },
        {
            title: 'AI & Machine Learning',
            description: 'Intelligent solutions that automate processes and provide valuable business insights.',
            tech: 'Python, TensorFlow, AI Models',
            icon: Brain,
            gradient: 'from-violet-500 to-purple-500'
        },
    ]

    return (
        <section className="py-20 px-6 bg-black reveal-section relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-4"
                    >
                        <span className="px-4 py-2 bg-blue-900/30 text-blue-400 rounded-full text-sm font-semibold border border-blue-800/50">
                            What We Do
                        </span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-blue-100 to-gray-400 bg-clip-text text-transparent">
                        Our Expertise
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        Comprehensive digital solutions tailored to drive your business forward in the digital age
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => {
                        const Icon = service.icon
                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className="group relative"
                            >
                                {/* Card */}
                                <div className="relative h-full bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/10 overflow-hidden group-hover:border-white/20">
                                    {/* Gradient background on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                                    {/* Icon */}
                                    <motion.div
                                        className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-3 mb-6 shadow-lg`}
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <Icon className="w-full h-full text-white" />
                                    </motion.div>

                                    {/* Content */}
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-400 mb-4 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* Tech stack */}
                                    <div className="flex items-center gap-2">
                                        <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${service.gradient}`}></div>
                                        <p className="text-sm font-medium text-gray-500">
                                            {service.tech}
                                        </p>
                                    </div>

                                    {/* Hover effect corner */}
                                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-300`}></div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <p className="text-gray-400 text-lg">
                        Can&apos;t find what you&apos;re looking for?{' '}
                        <a href="/contact" className="text-blue-400 font-semibold hover:text-blue-300 underline underline-offset-4">
                            Let&apos;s talk about your project
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
