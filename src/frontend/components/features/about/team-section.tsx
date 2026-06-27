'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { api } from '@/frontend/lib/api-client'
import type { ApiResponse, TeamResponse, TeamMember } from '@/types/api'

export default function TeamSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const imageContainerRef = useRef<HTMLDivElement>(null)
    const [activeMember, setActiveMember] = useState(0)
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Fetch team members from API
    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await api.get<ApiResponse<TeamResponse>>('/api/team')

                if (response.success && response.data) {
                    setTeamMembers(response.data.members)
                }
            } catch (error) {
                console.error('Failed to fetch team members:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchTeamMembers()
    }, [])

    useEffect(() => {
        // Only run animation if we have loaded the members
        if (isLoading || teamMembers.length === 0) return;

        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            gsap.registerPlugin(ScrollTrigger)
            // Refresh ScrollTrigger to account for new DOM height
            ScrollTrigger.refresh();

            const ctx = gsap.context(() => {
                const mm = gsap.matchMedia()

                mm.add("(min-width: 768px)", () => {
                    // Pin the image container
                    ScrollTrigger.create({
                        trigger: containerRef.current,
                        start: 'top top',
                        end: 'bottom bottom',
                        pin: imageContainerRef.current,
                        scrub: true,
                        invalidateOnRefresh: true, // Important for dynamic content
                    })

                    // Animate text items and update active member
                    const items = document.querySelectorAll('.team-item')
                    items.forEach((item, index) => {
                        ScrollTrigger.create({
                            trigger: item,
                            start: 'top center',
                            end: 'bottom center',
                            onEnter: () => setActiveMember(index),
                            onEnterBack: () => setActiveMember(index),
                            toggleClass: { targets: item, className: 'active' },
                        })
                    })
                })
            }, containerRef)

            return () => ctx.revert()
        }, 100);

        return () => clearTimeout(timer);
    }, [teamMembers, isLoading])

    return (
        <section ref={containerRef} className="bg-black text-white min-h-screen relative">

            {/* Mobile View */}
            <div className="md:hidden pt-24 pb-20 px-4">
                <div className="mb-12 text-center">
                    <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                        The Squad
                    </h2>
                    <p className="text-gray-400">Meet the visionaries.</p>
                </div>
                <div className="flex flex-col gap-6">
                    {teamMembers.map((member) => (
                        <div key={member.id} className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <h3 className="text-5xl font-bold text-white mb-2 tracking-tighter leading-tight">
                                    {member.name}
                                </h3>
                                <p className="text-xl text-blue-400 font-medium uppercase tracking-wider">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex flex-col md:flex-row relative">

                {/* Left: Text List */}
                <div className="w-full md:w-1/2 z-10 relative">
                    <div className="pt-[50vh] pb-[50vh] px-8 md:px-20">
                        <div className="mb-32">
                            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                                The Squad
                            </h2>
                            <p className="text-xl text-gray-400">
                                Meet the visionaries behind the code.
                            </p>
                        </div>

                        <div className="flex flex-col gap-32">
                            {teamMembers.map((member, index) => (
                                <div
                                    key={member.id}
                                    className={`team-item group transition-opacity duration-500 ${index === activeMember ? 'opacity-100' : 'opacity-30'}`}
                                >
                                    <h3 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 transition-transform duration-500 group-hover:translate-x-4 cursor-pointer">
                                        {member.name}
                                    </h3>
                                    <p className="text-2xl text-blue-400 font-medium mb-2">{member.role}</p>
                                    <p className="text-lg text-gray-400 max-w-md">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Sticky Image (Pinned via GSAP) */}
                <div
                    ref={imageContainerRef}
                    className="hidden md:flex items-center justify-center w-1/2 h-screen absolute top-0 right-0 overflow-hidden"
                >
                    <div className="relative w-[70%] h-[70%] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                        {teamMembers.map((member, index) => (
                            <div
                                key={member.id}
                                className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === activeMember
                                    ? 'opacity-100 scale-100 z-10 clip-path-full'
                                    : 'opacity-0 scale-110 z-0 clip-path-inset'
                                    }`}
                                style={{
                                    clipPath: index === activeMember ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)'
                                }}
                            >
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                    sizes="50vw"
                                    priority={index === 0}
                                />
                                <div className="absolute inset-0 bg-black/20" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
