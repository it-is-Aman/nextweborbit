'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const CTASection = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-black rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 overflow-hidden relative"
                >
                    {/* Left Content */}
                    <div className="flex-1 text-left relative z-10">
                        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] opacity-90 mb-8 uppercase text-white">
                            Ready to Build Something Extraordinary?
                        </h2>

                        <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed text-gray-400 mb-10 max-w-xl">
                            We have financed technology-based start-ups and assisted entrepreneurs in building market-leading companies since 2024.
                        </p>

                        <div className="flex items-center gap-6">
                            <span className="text-white font-bold text-lg mb-4 block tracking-wide uppercase">
                                Connect with us
                            </span>
                            <Link href="/contact">
                                <button className="w-14 h-14 bg-[#2A3335] hover:bg-[#1a1f20] rounded-2xl flex items-center justify-center transition-all duration-300 group">
                                    <ArrowRight className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Visual - Perfect Responsive Square */}
                    <div className="flex-1 w-full max-w-[500px] lg:max-w-none aspect-square relative group">
                        <div className="absolute inset-0 bg-black rounded-[2rem] overflow-hidden">
                            {/* GIF Image */}
                            <Link href="/contact" className="block w-full h-full relative">
                                <Image
                                    src="/uploads/images/connect.gif"
                                    alt="CTA Visual"
                                    fill
                                    className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
                            </Link>

                            {/* Decorative Technical Elements */}
                            <div className="absolute top-1/2 left-0 w-full h-px bg-white/10" />
                            <div className="absolute top-1/3 left-0 w-full h-px bg-white/5" />
                            <div className="absolute left-1/2 top-0 w-px h-full bg-white/10" />
                            <div className="absolute left-1/3 top-0 w-px h-full bg-white/5" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default CTASection
