'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '@/frontend/lib/api-client'
import type { TeamMember, ApiResponse, TeamResponse } from '@/types/api'
import { Loader2 } from 'lucide-react'

function LeaderCard({ leader, index }: { leader: TeamMember, index: number }) {
    const blobPath = "M43.1,-68.5C56.2,-58.6,67.5,-47.3,72.3,-33.9C77.2,-20.5,75.5,-4.9,74.2,11.3C72.9,27.6,71.9,44.5,63.8,57.2C55.7,69.8,40.6,78.2,25.5,79.2C10.4,80.1,-4.7,73.6,-20.9,69.6C-37.1,65.5,-54.5,63.9,-66,54.8C-77.5,45.8,-83.2,29.3,-85.7,12.3C-88.3,-4.8,-87.7,-22.3,-79.6,-34.8C-71.5,-47.3,-55.8,-54.9,-41.3,-64.2C-26.7,-73.6,-13.4,-84.7,0.8,-86C15,-87.2,29.9,-78.5,43.1,-68.5Z"
    const clipId = `blobClip-${index}`
    const textPathId = `textPath-${index}`

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center group relative w-full"
        >
            <div className="relative w-full aspect-square max-w-[280px] md:max-w-[340px]">
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
                    <defs>
                        <clipPath id={clipId}>
                            <motion.path
                                d={blobPath}
                                transform="translate(100 100) scale(0.98)"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            />
                        </clipPath>
                    </defs>

                    {/* Image with blob clip */}
                    <g clipPath={`url(#${clipId})`}>
                        <image
                            href={leader.image}
                            x="0" y="0"
                            width="200" height="200"
                            preserveAspectRatio="xMidYMid slice"
                            className="transition-transform duration-700"
                        />
                    </g>

                    {/* Rotating Text Path */}
                    <path
                        id={textPathId}
                        d={blobPath}
                        transform="translate(100 100) scale(1.1)"
                        fill="none"
                        stroke="none"
                    />

                    <text className="text-[7px] font-black tracking-[1.2px] fill-foreground group-hover:fill-primary transition-colors duration-300 uppercase">
                        <textPath href={`#${textPathId}`} startOffset="0%">
                            Next Web Orbit Leadership • Visionary Excellence • Digital Innovation • Strategic Growth •
                            <animate attributeName="startOffset" from="0%" to="100%" dur="25s" repeatCount="indefinite" />
                        </textPath>
                        <textPath href={`#${textPathId}`} startOffset="100%">
                            Next Web Orbit Leadership • Visionary Excellence • Digital Innovation • Strategic Growth •
                            <animate attributeName="startOffset" from="-100%" to="0%" dur="25s" repeatCount="indefinite" />
                        </textPath>
                    </text>
                </svg>
            </div>

            <div className="mt-4 text-center">
                <h3 className="text-2xl font-black text-foreground leading-none">{leader.name}</h3>
                <p className="text-primary text-[10px] font-bold tracking-[0.2em] mt-1 uppercase">{leader.role}</p>
            </div>
        </motion.div>
    )
}

export default function LeadershipSection() {
    const [leaders, setLeaders] = useState<TeamMember[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                const response = await api.get<ApiResponse<TeamResponse>>('/api/team')
                if (response.success && response.data) {
                    setLeaders(response.data.members)
                }
            } catch (error) {
                console.error('Failed to fetch leaders:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchLeaders()
    }, [])

    if (isLoading) {
        return (
            <section className="w-full py-40 bg-background flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </section>
        )
    }

    if (leaders.length === 0) return null

    return (
        <section className="w-full py-40 bg-background text-foreground overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="mb-32 text-center">
                    <span className="text-primary font-bold text-lg mb-4 block tracking-wide">Our Visionaries</span>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] opacity-90">
                        Next Web Orbit<br /><span className="text-muted-foreground/30 italic font-light">Leadership</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 max-w-7xl mx-auto">
                    {leaders.map((leader, i) => (
                        <LeaderCard key={leader.id} leader={leader} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
