'use client'

import { useEffect, useRef } from 'react'
import NextImage from 'next/image'
import { gsap } from 'gsap'
import { BlurReveal } from '@/frontend/animations'
import { RotateCw } from 'lucide-react'

const TECHS = [
    { name: 'React', color: '#61DAFB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js', color: '#000000', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Vue.js', color: '#4FC08D', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
    { name: 'Angular', color: '#DD0031', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
    { name: 'Typescript', color: '#3178C6', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Tailwind', color: '#06B6D4', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Flutter', color: '#02569B', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
    { name: 'Node.js', color: '#339933', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Python', color: '#3776AB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Java', color: '#007396', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'PHP', color: '#777BB4', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    { name: 'Go', color: '#00ADD8', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
    { name: 'Spring', color: '#6DB33F', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { name: 'Swift', color: '#F05138', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
    { name: 'Kotlin', color: '#7F52FF', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
    { name: 'Android', color: '#3DDC84', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
    { name: 'MongoDB', color: '#47A248', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'PostgreSQL', color: '#4169E1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'MySQL', color: '#4479A1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Docker', color: '#2496ED', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'AWS', color: '#FF9900', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    { name: 'Vercel', color: '#000000', icon: 'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png' }
]

const RADIUS_LOGOS = 600
const RADIUS_NAMES = 420
const ANGLE_STEP_DEG = 18
const ANGLE_STEP_RAD = ANGLE_STEP_DEG * (Math.PI / 180)
const TOTAL = TECHS.length

export default function TechnologiesSection() {
    const itemsRef = useRef<(HTMLDivElement | null)[]>([])
    const namesRef = useRef<(HTMLDivElement | null)[]>([])
    const containerRef = useRef<HTMLDivElement>(null)

    // Refs for performance-critical values
    const proxy = useRef({ rotation: 0 })
    const timeline = useRef<gsap.core.Timeline | null>(null)

    // Quicksetters for extreme performance (bypassing GSAP internal overhead)
    type QuickSetter = (value: number | string) => void
    const setters = useRef<{
        items: ({ x: QuickSetter, y: QuickSetter, opacity: QuickSetter, zIndex: QuickSetter } | null)[],
        names: ({ x: QuickSetter, y: QuickSetter, opacity: QuickSetter, scale: QuickSetter, zIndex: QuickSetter } | null)[]
    }>({ items: [], names: [] })

    useEffect(() => {
        // Initialize quicksetters
        setters.current.items = itemsRef.current.map(el => {
            if (!el) return null
            return {
                x: gsap.quickSetter(el, "x", "px") as unknown as QuickSetter,
                y: gsap.quickSetter(el, "y", "px") as unknown as QuickSetter,
                opacity: gsap.quickSetter(el, "opacity") as unknown as QuickSetter,
                zIndex: gsap.quickSetter(el, "zIndex") as unknown as QuickSetter
            }
        })

        setters.current.names = namesRef.current.map(el => {
            if (!el) return null
            return {
                x: gsap.quickSetter(el, "x", "px") as unknown as QuickSetter,
                y: gsap.quickSetter(el, "y", "px") as unknown as QuickSetter,
                opacity: gsap.quickSetter(el, "opacity") as unknown as QuickSetter,
                scale: gsap.quickSetter(el, "scale") as unknown as QuickSetter,
                zIndex: gsap.quickSetter(el, "zIndex") as unknown as QuickSetter
            }
        })

        // Optimized update function
        const update = () => {
            const rot = proxy.current.rotation

            for (let i = 0; i < TOTAL; i++) {
                let diff = (i + rot) % TOTAL
                if (diff > TOTAL / 2) diff -= TOTAL
                if (diff < -TOTAL / 2) diff += TOTAL

                const absDiff = Math.abs(diff)
                const isVisible = absDiff <= 3.6 // 7 items approx

                // Update Items (Cards)
                const itemSetter = setters.current.items[i]
                if (itemSetter) {
                    if (isVisible) {
                        const angle = (diff * ANGLE_STEP_RAD) - (Math.PI / 2)
                        const x = Math.cos(angle) * RADIUS_LOGOS
                        const y = Math.sin(angle) * RADIUS_LOGOS + 450

                        itemSetter.x(x)
                        itemSetter.y(y)
                        itemSetter.opacity(1)
                        itemSetter.zIndex(100 - Math.floor(absDiff * 10))
                    } else {
                        itemSetter.opacity(0)
                        itemSetter.zIndex(0)
                    }
                }

                // Update Names (Inner Arc - Opposite)
                const nameSetter = setters.current.names[i]
                if (nameSetter) {
                    if (isVisible) {
                        const diffName = -diff
                        const angleName = (diffName * ANGLE_STEP_RAD) - (Math.PI / 2)
                        const nx = Math.cos(angleName) * RADIUS_NAMES
                        const ny = Math.sin(angleName) * RADIUS_NAMES + 450

                        const opacity = absDiff < 0.5 ? 1 : 0.6
                        const scale = absDiff < 0.5 ? 1.8 : 0.8

                        nameSetter.x(nx)
                        nameSetter.y(ny)
                        nameSetter.opacity(opacity)
                        nameSetter.scale(scale)
                        nameSetter.zIndex(80 - Math.floor(absDiff * 10))
                    } else {
                        nameSetter.opacity(0)
                        nameSetter.zIndex(0)
                    }
                }
            }
        }

        // Infinite marquee timeline
        const tl = gsap.timeline({
            repeat: -1,
            onUpdate: update
        })

        tl.to(proxy.current, {
            rotation: TOTAL,
            duration: TOTAL * 4,
            ease: "none"
        })

        timeline.current = tl

        return () => {
            tl.kill()
        }
    }, [])

    const nudge = (dir: 'next' | 'prev') => {
        const target = dir === 'next' ? proxy.current.rotation + 1 : proxy.current.rotation - 1
        gsap.to(proxy.current, {
            rotation: target,
            duration: 0.8,
            ease: "power2.out"
        })
    }

    const handleMouseEnter = () => {
        timeline.current?.pause()
    }

    const handleMouseLeave = () => {
        timeline.current?.play()
    }

    return (
        <section className="py-16 bg-background overflow-hidden">
            <div className="text-center mb-12">
                <h2 className="flex justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-tight text-foreground">
                    <BlurReveal>Our Technologies</BlurReveal>
                </h2>
                <p className="mt-4 text-base md:text-lg text-muted-foreground font-light max-w-2xl mx-auto">
                    Powering your digital transformation with cutting-edge tools.
                </p>
            </div>

            {/* Mobile/Tablet Grid Layout (< md) */}
            <div className="container mx-auto px-4 md:hidden">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {TECHS.map((tech, i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                            <div className="relative w-12 h-12 mb-4">
                                <NextImage src={tech.icon} alt={tech.name} fill className="object-contain" />
                            </div>
                            <span className="font-bold text-sm" style={{ color: tech.color }}>{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop GSAP Animation (>= md) */}
            <div className="hidden md:flex flex-col items-center justify-center min-h-[600px] relative w-full max-w-[1500px] mx-auto" ref={containerRef}>
                <div className="relative w-full min-h-[600px] overflow-visible">
                    <div className="relative w-full min-h-[600px] flex items-center justify-center">
                        {/* Hardware accelerated containers */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform">
                            {TECHS.map((tech, i) => (
                                <div
                                    key={`card-${tech.name} ${i}`}
                                    ref={el => { itemsRef.current[i] = el }}
                                    className="absolute flex items-center justify-center rounded-2xl cursor-pointer shadow-md border-2 bg-white transition-shadow duration-300 hover:shadow-lg hover:z-50 w-[140px] h-[100px] pointer-events-auto will-change-transform"
                                    onClick={() => nudge('next')}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    style={{ borderColor: tech.color }}
                                >
                                    <div className="relative w-3/5 h-3/5">
                                        <NextImage src={tech.icon} alt={tech.name} fill className="object-contain" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform">
                            {TECHS.map((tech, i) => (
                                <div
                                    key={`name-${tech.name} ${i}`}
                                    ref={el => { namesRef.current[i] = el }}
                                    className="absolute font-black text-xl tracking-tighter uppercase transition-colors duration-700 italic drop-shadow-md px-6 py-2 rounded-xl bg-white shadow-xl will-change-transform border-none"
                                    style={{ color: tech.color }}
                                >
                                    {tech.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="absolute top-[480px] left-1/2 -translate-x-1/2 flex flex-col items-center z-50">
                    <div className="relative w-[400px] h-[120px] flex flex-col items-center">
                        {/* Curved Text "TECHNOLOGY" - Enhanced Prominence & Styling */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[360px] h-[90px] pointer-events-none z-40">
                            <svg
                                viewBox="0 0 360 90"
                                className="w-full h-full"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <path
                                        id="bottom-curve-v2"
                                        d="M 30,70 A 150,100 0 0,1 330,70"
                                        fill="transparent"
                                    />
                                    <linearGradient id="tech-text-gradient-v2" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{ stopColor: '#111', stopOpacity: 0 }} />
                                        <stop offset="20%" style={{ stopColor: '#111', stopOpacity: 0.5 }} />
                                        <stop offset="50%" style={{ stopColor: '#000', stopOpacity: 1 }} />
                                        <stop offset="80%" style={{ stopColor: '#111', stopOpacity: 0.5 }} />
                                        <stop offset="100%" style={{ stopColor: '#111', stopOpacity: 0 }} />
                                    </linearGradient>
                                </defs>
                                <text
                                    fontSize="20"
                                    fontWeight="900"
                                    fill="url(#tech-text-gradient-v2)"
                                    className="tracking-[0.5em] uppercase"
                                    style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.2))' }}
                                >
                                    <textPath href="#bottom-curve-v2" startOffset="50%" textAnchor="middle">
                                        TECHNOLOGY
                                    </textPath>
                                </text>
                            </svg>
                        </div>

                        {/* Semi-circle decorative line - Smoother & Subtle */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[280px] h-[70px] border-t border-l border-r border-foreground/10 rounded-t-full pointer-events-none" />

                        {/* Rotate button - centered */}
                        <div className="flex items-center justify-center mt-6 z-30">
                            <div
                                className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 group"
                                onClick={() => nudge('next')}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <RotateCw className="w-8 h-8 group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}