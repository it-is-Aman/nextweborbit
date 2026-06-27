'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
    {
        question: "How do you ensure the quality of your code?",
        answer: "We follow strict coding standards and best practices, including regular code reviews, automated testing (unit and integration tests), and continuous integration pipelines. Our developers act as craftsmen, ensuring every line of code is clean, maintainable, and efficient."
    },
    {
        question: "What is your typical project timeline?",
        answer: "Timelines vary depending on project scope and complexity. A simple website might take 2-4 weeks, while a complex mobile app or custom software platform could take 3-6 months. During our discovery phase, we provide a detailed roadmap with clear milestones so you always know what to expect."
    },
    {
        question: "Do you offer post-launch support and maintenance?",
        answer: "Absolutely. We believe that launch is just the beginning. We offer various support and maintenance packages to ensure your product remains secure, up-to-date, and optimized. From bug fixes to server monitoring and feature enhancements, we've got you covered."
    },
    {
        question: "Can you help update or fix an existing application?",
        answer: "Yes, we specialize in legacy modernization. We can audit your existing codebase, identify performance bottlenecks or security vulnerabilities, and implement improvements. Whether it's a complete refactor or adding new features to an existing build, we can help."
    },
    {
        question: "What technologies do you specialize in?",
        answer: "We are proficient in a modern tech stack including React, Next.js, Node.js, and TypeScript for web development. For mobile, we use React Native and Flutter. Our backend expertise spans standard SQL databases, NoSQL, and cloud infrastructure like AWS and Vercel."
    }
]

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0)

    return (
        <section className="py-24 bg-surface-50">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 max-w-4xl">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] opacity-90 mb-8 uppercase">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed text-muted-foreground">
                        Everything you need to know about our process and services.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border rounded-2xl transition-all duration-300 ${activeIndex === index ? 'bg-background border-blue-200 shadow-md' : 'bg-background hover:bg-white/50 border-border'}`}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`text-xl font-black transition-colors ${activeIndex === index ? 'text-primary' : 'text-foreground'}`}>
                                    {faq.question}
                                </span>
                                <div className={`p-2 rounded-full transition-colors ${activeIndex === index ? 'bg-primary/10 text-primary' : 'bg-surface-100 text-muted-foreground'}`}>
                                    {activeIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pt-0">
                                            <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed text-muted-foreground">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default FAQSection
