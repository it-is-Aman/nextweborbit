'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MarqueeSection() {
    const marqueeRef = useRef(null)

    useEffect(() => {
        if (marqueeRef.current) {
            gsap.to(marqueeRef.current, {
                xPercent: -50,
                duration: 20,
                ease: 'linear',
                repeat: -1,
            })
        }
    }, [])

    return (
        <section className="overflow-hidden py-6 bg-white text-black">
            <div ref={marqueeRef} className="whitespace-nowrap text-5xl font-extrabold flex gap-16">
                <span>INNOVATION • EXPERIENCE • TECHNOLOGY • GROWTH • DIGITAL FUTURE •</span>
                <span>INNOVATION • EXPERIENCE • TECHNOLOGY • GROWTH • DIGITAL FUTURE •</span>
            </div>
        </section>
    )
}
