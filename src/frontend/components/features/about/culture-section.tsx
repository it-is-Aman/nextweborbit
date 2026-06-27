'use client'

import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import NextImage from 'next/image'
import { gsap } from 'gsap'

const COLLAGE_IMAGES = [
    'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
    'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80',
]

export default function CultureSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const columnsRef = useRef<(HTMLDivElement | null)[]>([])
    const [pathValue, setPathValue] = useState<string>('')

    // --- Calculate Responsive SVG Path for Rounded Stairs (Shidhi) ---
    useEffect(() => {
        const updateClipPath = () => {
            const width = window.innerWidth
            const height = containerRef.current?.offsetHeight || 1000

            // Disable clip-path on mobile for better usability
            if (width < 1024) {
                setPathValue('none')
                return
            }

            const stepW = width / 4
            const radius = 24

            // TOP EDGE: Steps Down
            let path = `M 0 0`
            path += ` L ${stepW - radius} 0`
            path += ` Q ${stepW} 0 ${stepW} ${radius}`
            path += ` L ${stepW} ${60 - radius}`
            path += ` Q ${stepW} 60 ${stepW + radius} 60`

            path += ` L ${stepW * 2 - radius} 60`
            path += ` Q ${stepW * 2} 60 ${stepW * 2} ${60 + radius}`
            path += ` L ${stepW * 2} ${120 - radius}`
            path += ` Q ${stepW * 2} 120 ${stepW * 2 + radius} 120`

            path += ` L ${stepW * 3 - radius} 120`
            path += ` Q ${stepW * 3} 120 ${stepW * 3} ${120 + radius}`
            path += ` L ${stepW * 3} ${180 - radius}`
            path += ` Q ${stepW * 3} 180 ${stepW * 3 + radius} 180`

            path += ` L ${width} 180`

            // RIGHT EDGE
            path += ` L ${width} ${height}`

            // BOTTOM EDGE: Scanned Right to Left (Going "UP" in Y)
            path += ` L ${stepW * 3 + radius} ${height}`
            path += ` Q ${stepW * 3} ${height} ${stepW * 3} ${height - radius}`
            path += ` L ${stepW * 3} ${height - 60 + radius}`
            path += ` Q ${stepW * 3} ${height - 60} ${stepW * 3 - radius} ${height - 60}`

            path += ` L ${stepW * 2 + radius} ${height - 60}`
            path += ` Q ${stepW * 2} ${height - 60} ${stepW * 2} ${height - 60 - radius}`
            path += ` L ${stepW * 2} ${height - 120 + radius}`
            path += ` Q ${stepW * 2} ${height - 120} ${stepW * 2 - radius} ${height - 120}`

            path += ` L ${stepW + radius} ${height - 120}`
            path += ` Q ${stepW} ${height - 120} ${stepW} ${height - 120 - radius}`
            path += ` L ${stepW} ${height - 180 + radius}`
            path += ` Q ${stepW} ${height - 180} ${stepW - radius} ${height - 180}`

            path += ` L 0 ${height - 180}`
            path += ` Z`

            setPathValue(`path('${path}')`)
        }

        updateClipPath()
        window.addEventListener('resize', updateClipPath)
        return () => window.removeEventListener('resize', updateClipPath)
    }, [])

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Columns
            columnsRef.current.forEach((col, i) => {
                if (!col) return
                const speed = (i % 2 === 0) ? -100 : 100 // Alternating direction

                gsap.to(col, {
                    y: speed,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    }
                })
            })

            // Text Reveal
            gsap.from('.culture-text', {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                }
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative w-full pt-32 md:pt-56 pb-48 md:pb-64 bg-black text-white overflow-hidden"
            style={{ clipPath: pathValue }}
        >
            <div className="container mx-auto px-6 mb-24">
                <h2 className="culture-text text-4xl md:text-6xl lg:text-7xl font-bold max-w-5xl tracking-tight leading-[0.9] uppercase">
                    Our people drive digital marketing breakthroughs every day.
                </h2>
                <div className="w-24 h-1 bg-white mt-8 culture-text" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 h-[800px] overflow-hidden">
                {[0, 1, 2, 3].map((colIndex) => (
                    <div
                        key={colIndex}
                        ref={el => { columnsRef.current[colIndex] = el }}
                        className={`flex flex-col gap-4 ${colIndex % 2 === 0 ? '-mt-20' : 'mt-0'}`}
                    >
                        {COLLAGE_IMAGES.slice(colIndex * 2, colIndex * 2 + 2).map((src, imgIndex) => (
                            <div key={imgIndex} className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-sm culture-col">
                                <NextImage
                                    src={src}
                                    alt="Culture"
                                    fill
                                    className="object-cover transition-transform duration-700"
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}
