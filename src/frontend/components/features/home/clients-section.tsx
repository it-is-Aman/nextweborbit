'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const WalmartLogo = () => (
    <svg viewBox="0 0 200 60" className="h-9 w-auto text-neutral-500 hover:text-white transition-colors duration-300 fill-current">
        <path d="M15 15c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 3c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm45 9c0 6.63-5.37 12-12 12s-12-5.37-12-12 5.37-12 12-12 12 5.37 12 12zm-5 0c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7 7-3.13 7-7zm25 0h8v12h-8v-12zm25-12h8v24h-8v-24zm30 12c0 6.63-5.37 12-12 12s-12-5.37-12-12 5.37-12 12-12 12 5.37 12 12zm-5 0c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7 7-3.13 7-7z" opacity="0.15" />
        <text x="10" y="42" className="font-sans font-bold text-3xl tracking-tight">Walmart</text>
        <g transform="translate(145, 12)" className="text-[#FF9F00]">
            <rect x="11" y="2" width="4" height="9" rx="2" transform="rotate(0 13 6.5)" />
            <rect x="11" y="2" width="4" height="9" rx="2" transform="rotate(60 13 6.5)" />
            <rect x="11" y="2" width="4" height="9" rx="2" transform="rotate(120 13 6.5)" />
            <rect x="11" y="2" width="4" height="9" rx="2" transform="rotate(180 13 6.5)" />
            <rect x="11" y="2" width="4" height="9" rx="2" transform="rotate(240 13 6.5)" />
            <rect x="11" y="2" width="4" height="9" rx="2" transform="rotate(300 13 6.5)" />
        </g>
    </svg>
)

const LinkedInLogo = () => (
    <svg viewBox="0 0 200 60" className="h-9 w-auto text-neutral-500 hover:text-white transition-colors duration-300 fill-current">
        <text x="10" y="42" className="font-sans font-black text-3.5xl tracking-tighter">Linked</text>
        <rect x="128" y="12" width="34" height="34" rx="6" />
        <text x="135" y="38" className="font-sans font-bold text-3xl fill-[#050505]">in</text>
    </svg>
)

const GoogleLogo = () => (
    <svg viewBox="0 0 200 60" className="h-9 w-auto text-neutral-500 hover:text-white transition-colors duration-300 fill-current">
        <text x="25" y="42" className="font-sans font-black text-4xl tracking-tight">Google</text>
    </svg>
)

const SlackLogo = () => (
    <svg viewBox="0 0 200 60" className="h-9 w-auto text-neutral-500 hover:text-white transition-colors duration-300 fill-current">
        <g transform="translate(15, 12)">
            {/* Slack bubble grid */}
            <circle cx="10" cy="10" r="5" className="fill-[#e01e5a]" />
            <rect x="8" y="18" width="4" height="12" rx="2" className="fill-[#e01e5a]" />
            <circle cx="30" cy="10" r="5" className="fill-[#36c5f0]" />
            <rect x="18" y="8" width="12" height="4" rx="2" className="fill-[#36c5f0]" />
            <circle cx="30" cy="30" r="5" className="fill-[#2eb67d]" />
            <rect x="28" y="10" width="4" height="12" rx="2" className="fill-[#2eb67d]" />
            <circle cx="10" cy="30" r="5" className="fill-[#ecb22e]" />
            <rect x="10" y="28" width="12" height="4" rx="2" className="fill-[#ecb22e]" />
        </g>
        <text x="65" y="42" className="font-sans font-black text-3.5xl tracking-tight">slack</text>
    </svg>
)

const logos = [
    { name: 'Walmart', component: WalmartLogo },
    { name: 'LinkedIn', component: LinkedInLogo },
    { name: 'Google', component: GoogleLogo },
    { name: 'Slack', component: SlackLogo },
    { name: 'Walmart', component: WalmartLogo },
]

export default function ClientsSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)

    // Repeat logos for marquee
    const marqueeLogos = [...logos, ...logos, ...logos]

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (trackRef.current) {
                const totalWidth = trackRef.current.scrollWidth
                const oneSetWidth = totalWidth / 3

                gsap.set(trackRef.current, { x: 0 })

                gsap.to(trackRef.current, {
                    x: -oneSetWidth,
                    duration: 20,
                    ease: "none",
                    repeat: -1,
                    onRepeat: () => {
                        gsap.set(trackRef.current, { x: 0 })
                    }
                })
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-16 bg-[#050505] overflow-hidden relative border-t border-white/5 border-b border-white/5">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
                <div className="text-center">
                    <h2 className="text-sm font-semibold tracking-[0.2em] text-neutral-400 uppercase">
                        More Than 100+ Companies Trusted Us Worldwide
                    </h2>
                </div>
            </div>

            {/* Marquee Track Container */}
            <div className="w-full relative flex overflow-hidden">
                {/* Smoky masks */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

                {/* Moving Content */}
                <div
                    ref={trackRef}
                    className="flex gap-20 px-8 items-center will-change-transform"
                >
                    {marqueeLogos.map((logo, index) => {
                        const LogoComponent = logo.component
                        return (
                            <div
                                key={index}
                                className="relative flex items-center justify-center flex-shrink-0 w-44 h-16"
                            >
                                <LogoComponent />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
