'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Eye } from 'lucide-react'
import Link from 'next/link'

export default function BlogSection() {
    const posts = [
        {
            id: 1,
            date: "October 19, 2023",
            title: "Brand Design That Helps The Company Grow",
            href: "/blog/brand-design-helps-company-grow"
        },
        {
            id: 2,
            date: "October 19, 2023",
            title: "Fresh Design Ideas & Inspiration For 2023",
            href: "/blog/fresh-design-ideas-inspiration"
        }
    ]

    return (
        <section className="py-24 bg-[#050505] text-white relative overflow-hidden font-sans border-t border-b border-white/5">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* Left Column - Header and Large Action Badge */}
                    <div className="lg:col-span-5 flex flex-col space-y-8">
                        <div>
                            {/* Slanted/cursive-looking neon subtitle */}
                            <span className="text-xl font-bold italic tracking-wide text-[#b2ff2e] block mb-2 font-serif">
                                My Blogs
                            </span>
                            <div className="w-16 h-[2px] bg-[#b2ff2e] mb-4" />
                            
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-white">
                                Recent Posts
                            </h2>
                        </div>

                        {/* Large Yellow-Green Circle "Click More Work" Badge */}
                        <div className="pt-6">
                            <Link href="/portfolio" className="group inline-flex flex-col items-center justify-center w-40 h-40 rounded-full bg-[#b2ff2e] text-black font-bold uppercase tracking-wider text-center p-4 transition-all duration-500 transform hover:scale-105 hover:rotate-3 shadow-xl shadow-[#b2ff2e]/10">
                                <span className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mb-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                                    <ArrowRight className="w-6 h-6 text-black stroke-[2.5]" />
                                </span>
                                <span className="text-xs font-black tracking-widest leading-tight">
                                    Click <br /> More Work
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Blog Posts List */}
                    <div className="lg:col-span-7 flex flex-col divide-y divide-white/10">
                        {posts.map((post, idx) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.15 }}
                                viewport={{ once: true }}
                                className="py-8 first:pt-0 last:pb-0"
                            >
                                <Link href="/portfolio" className="group flex items-start sm:items-center justify-between gap-6">
                                    <div className="flex flex-col space-y-3 max-w-xl">
                                        {/* Date Tag */}
                                        <div className="inline-block">
                                            <span className="px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-neutral-400 bg-white/5 border border-white/10 rounded-full">
                                                {post.date}
                                            </span>
                                        </div>
                                        {/* Post Title */}
                                        <h3 className="text-xl sm:text-2xl font-black uppercase text-white leading-tight tracking-tight group-hover:text-[#b2ff2e] transition-colors duration-300">
                                            {post.title}
                                        </h3>
                                    </div>

                                    {/* Action Eye Icon */}
                                    <div className="w-12 h-12 rounded-full border border-white/20 group-hover:border-[#b2ff2e] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                                        <Eye className="w-5 h-5 text-neutral-400 group-hover:text-[#b2ff2e] transition-colors duration-300" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
