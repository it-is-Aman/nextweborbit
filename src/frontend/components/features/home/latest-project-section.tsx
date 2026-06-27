

'use client'

import { SpotlightButton } from '@/frontend/animations'
import Link from 'next/link'
import { BottomToCenter, BlurReveal, Magnetic } from '@/frontend/animations'
import { motion, useMotionValue, useSpring, useTransform, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

const projects = [
  { id: 1, src: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80', alt: 'E-commerce Website', title: 'E-commerce Platform' },
  { id: 2, src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', alt: 'Business Website', title: 'Corporate Website' },
  { id: 3, src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80', alt: 'Portfolio Website', title: 'Portfolio Site' },
  { id: 4, src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', alt: 'Dashboard App', title: 'Dashboard Application' },
  { id: 5, src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', alt: 'Mobile App', title: 'Mobile Application' },
  { id: 6, src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', alt: 'Web App', title: 'Web Application' },
]

const LatestProjectSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [itemWidth, setItemWidth] = useState(0)
  const scrollX = useMotionValue(0)
  const mouseX = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30 })

  // Calculate item width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.offsetWidth
      const isMobile = containerWidth < 768
      const width = isMobile ? containerWidth : (containerWidth - 48) / 3
      setItemWidth(width)
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Auto-scroll effect
  useEffect(() => {
    if (isHovered || itemWidth === 0) return

    let animationFrame: number
    const animate = () => {
      scrollX.set(scrollX.get() + 0.3)
      animationFrame = requestAnimationFrame(animate)
    }
    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [isHovered, scrollX, itemWidth])

  // Mouse movement control
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const normalizedX = (x / rect.width) * 2 - 1
    mouseX.set(normalizedX)

    if (isHovered && itemWidth > 0) {
      const scrollSpeed = normalizedX * 1.5
      scrollX.set(scrollX.get() + scrollSpeed * 0.1)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
  }

  // Duplicate projects for seamless infinite scroll
  const duplicatedProjects = [...projects, ...projects, ...projects]

  // Motion value for x position
  const x = useMotionValue(0)
  const mouseOffset = useTransform(smoothX, (x) => x * 30)

  // Update x position based on scroll and mouse
  useMotionValueEvent(scrollX, 'change', (latest) => {
    if (itemWidth === 0) return

    const gap = 24
    const singleSetWidth = projects.length * (itemWidth + gap)
    const normalizedScroll = ((latest % singleSetWidth) + singleSetWidth) % singleSetWidth
    const baseX = -normalizedScroll
    const offset = mouseOffset.get()
    x.set(baseX + offset)
  })

  useMotionValueEvent(mouseOffset, 'change', (latest) => {
    if (itemWidth === 0) return

    const gap = 24
    const singleSetWidth = projects.length * (itemWidth + gap)
    const normalizedScroll = ((scrollX.get() % singleSetWidth) + singleSetWidth) % singleSetWidth
    const baseX = -normalizedScroll
    x.set(baseX + latest)
  })

  useEffect(() => {
    if (itemWidth === 0) return

    const gap = 24
    const singleSetWidth = projects.length * (itemWidth + gap)
    const normalizedScroll = ((scrollX.get() % singleSetWidth) + singleSetWidth) % singleSetWidth
    const baseX = -normalizedScroll
    const offset = mouseOffset.get()
    x.set(baseX + offset)
  }, [itemWidth, scrollX, mouseOffset, x])

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-foreground/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto max-w-[1440px] px-4 md:px-6 relative z-10">
        <div className="mb-12 flex justify-center">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] opacity-90 mb-8 uppercase text-center">
            <BlurReveal>Latest Projects</BlurReveal>
          </h2>
        </div>

        <div
          ref={containerRef}
          className="overflow-hidden mb-8 cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <motion.div
            ref={contentRef}
            className="flex gap-6"
            style={{ x }}
          >
            {duplicatedProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="shrink-0 w-full md:w-[calc(33.333%-1rem)] group"
              >
                <Link href="/portfolio" className="block h-full">
                  <div className="bg-background rounded-xl border border-border overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 group-hover:border-foreground/20">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={project.src}
                        alt={project.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-all duration-300 flex items-center justify-center">
                        <span className="text-background font-semibold text-[clamp(1rem,2.5vw,1.125rem)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wide">
                          {project.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>

        <BottomToCenter>
          <div className="text-center flex justify-center">
            <Magnetic>
              <SpotlightButton asChild>
                <Link href="/portfolio">View More Projects</Link>
              </SpotlightButton >
            </Magnetic>
          </div>
        </BottomToCenter>
      </div>
    </section>
  )
}

export default LatestProjectSection