'use client'

import { motion } from 'framer-motion'

const DesignIcon = () => (
    <svg viewBox="0 0 40 40" className="w-12 h-12 text-[#00df89]">
        <circle cx="16" cy="24" r="6" fill="currentColor" opacity="0.3" />
        <rect x="20" y="10" width="10" height="10" rx="2" fill="currentColor" />
        <line x1="12" y1="12" x2="28" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="24" r="2" fill="currentColor" />
    </svg>
)

const UniqueIcon = () => (
    <svg viewBox="0 0 40 40" className="w-12 h-12 text-white">
        <circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="20" r="4" fill="currentColor" />
        <path d="M20 5 L20 10 M20 30 L20 35 M5 20 L10 20 M30 20 L35 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

const StyleIcon = () => (
    <svg viewBox="0 0 40 40" className="w-12 h-12 text-[#00df89]">
        <rect x="12" y="12" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 8 L16 16 M32 32 L24 24 M32 8 L24 16 M8 32 L16 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

export default function SolutionsSection() {
    const cards = [
        {
            title: "DESIGN PRINCIPALES",
            description: "Need A Project Completed By An Expert? Let's Go! Access A Human Resources Consultant To Answer Questions",
            icon: DesignIcon,
            highlight: false,
        },
        {
            title: "UNIQUE VALUES",
            description: "Need A Project Completed By An Expert? Let's Go! Access A Human Resources Consultant To Answer Questions",
            icon: UniqueIcon,
            highlight: true,
        },
        {
            title: "STYLE COMPONENTS",
            description: "Need A Project Completed By An Expert? Let's Go! Access A Human Resources Consultant To Answer Questions",
            icon: StyleIcon,
            highlight: false,
        }
    ]

    return (
        <section className="py-24 bg-[#0a0a0a] text-white overflow-hidden relative">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
                    <div className="max-w-xl">
                        <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#00df89] mb-3 block">
                            WHAT WE DO
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.9] text-white">
                            SERVICES AND SOLUTIONS
                        </h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                            Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit. Sint Ratione Reprehenderit, Error Qui Enim Sit Ex Provident
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, idx) => {
                        const Icon = card.icon
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.15 }}
                                viewport={{ once: true }}
                                className={`rounded-2xl p-8 flex flex-col justify-between min-h-[340px] border transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${
                                    card.highlight 
                                        ? "bg-[#00df89] text-black border-transparent shadow-[#00df89]/20" 
                                        : "bg-[#121212] text-white border-white/5 hover:border-white/15 hover:bg-[#161616]"
                                }`}
                            >
                                {/* Icon Area */}
                                <div className="mb-8">
                                    <Icon />
                                </div>

                                {/* Body */}
                                <div>
                                    <h3 className={`text-lg font-black tracking-wider mb-4 uppercase ${
                                        card.highlight ? "text-black" : "text-[#00df89]"
                                    }`}>
                                        {card.title}
                                    </h3>
                                    <p className={`text-sm leading-relaxed ${
                                        card.highlight ? "text-black/80 font-medium" : "text-neutral-400"
                                    }`}>
                                        {card.description}
                                    </p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}
