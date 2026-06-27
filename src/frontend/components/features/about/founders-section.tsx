'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Linkedin, Twitter, Mail } from 'lucide-react'
import founder1 from '@/assets/image/img1.jpg'

const founders = [
    {
        name: 'Hitesh Singh',
        role: 'CEO & Founder',
        bio: 'Visionary leader with over 8 years of experience in digital transformation and software architecture.',
        image: founder1,
        social: {
            linkedin: '#',
            twitter: '#',
            email: 'mailto:info@nextweborbit.com'
        }
    },
    {
        name: 'Sarah Johnson',
        role: 'Co-Founder & CTO',
        bio: 'Tech innovator passionate about building scalable solutions and driving technical excellence.',
        image: '',
        social: {
            linkedin: '#',
            twitter: '#',
            email: 'mailto:info@nextweborbit.com'
        }
    }
]

export default function FoundersSection() {
    return (
        <section className="py-24 bg-black overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                    >
                        Meet Our Visionaries
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-400"
                    >
                        The driving force behind NextWebOrbit&apos;s commitment to innovation and excellence.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {founders.map((founder, index) => (
                        <motion.div
                            key={founder.name}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="group relative"
                        >
                            <div className="relative h-[500px] rounded-3xl overflow-hidden mb-6 border border-white/10">
                                <Image
                                    src={founder.image}
                                    alt={founder.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <p className="text-gray-200 mb-6">{founder.bio}</p>
                                        <div className="flex gap-4">
                                            <a href={founder.social.linkedin} className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-black transition-colors">
                                                <Linkedin size={20} />
                                            </a>
                                            <a href={founder.social.twitter} className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-black transition-colors">
                                                <Twitter size={20} />
                                            </a>
                                            <a href={founder.social.email} className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-black transition-colors">
                                                <Mail size={20} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-3xl font-bold text-white mb-1">{founder.name}</h3>
                                <p className="text-blue-400 font-medium">{founder.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
