'use client'

import { useLayoutEffect, useRef } from 'react'
import NextImage from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutHero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLHeadingElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const typingRef = useRef<HTMLParagraphElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Text reveal
            gsap.from(textRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: 'power4.out',
                delay: 0.5
            })

            // Typing animation for the paragraph
            if (typingRef.current) {
                const text = typingRef.current.innerText
                typingRef.current.innerText = ''

                const letters = text.split('')
                letters.forEach((char) => {
                    const span = document.createElement('span')
                    span.innerText = char
                    span.style.opacity = '0'
                    typingRef.current?.appendChild(span)
                })

                gsap.to(typingRef.current.children, {
                    opacity: 1,
                    stagger: 0.03,
                    duration: 0.1,
                    ease: 'none',
                    delay: 1.5
                })
            }

            // Image Parallax / Reveal
            gsap.fromTo(imageRef.current,
                { scale: 1.2, opacity: 0 },
                { scale: 1, opacity: 1, duration: 2, ease: 'expo.out' }
            )

            // Parallax on scroll - Removed to prevent clipping
            /* gsap.to(imageRef.current, {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            }) */
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative w-full h-[85vh] min-h-[650px] flex overflow-hidden bg-background text-foreground">
            {/* Left Content */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-20 z-10">
                <div className="overflow-visible">
                    <h1 ref={textRef} className="font-bold text-foreground tracking-wider uppercase leading-tight text-[clamp(2rem,8vw,6rem)]">
                        AboutUs
                    </h1>
                </div>
                <p ref={typingRef} className="mt-8 text-lg md:text-xl max-w-xl font-serif opacity-80 leading-relaxed text-black min-h-[5em]">
                    At NextWebOrbit, we are more than just a technology provider. We are your strategic partners in the digital realm, dedicated to transforming complex challenges into seamless, user-centric experiences. From innovative web architectures to high-performance marketing ecosystems, our mission is to drive growth and redefine the future of digital engagement through expertise and relentless creativity.
                </p>
                <div className="mt-12">
                    <span className="inline-block px-4 py-1 border border-foreground/30 rounded-full text-xs tracking-wide text-foreground">
                        Established 2025
                    </span>
                </div>
            </div>

            {/* Right Image */}
            <div className="absolute inset-0 md:relative md:w-1/2 h-full w-full overflow-hidden">
                <div ref={imageRef} className="w-full h-full relative">
                    <NextImage
                        src="/uploads/images/17.jpeg"
                        alt="Our Team"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Overlay for mobile readability if needed */}
                    <div className="absolute inset-0 bg-background/40 md:bg-transparent" />
                </div>
            </div>
        </section >
    )
}
