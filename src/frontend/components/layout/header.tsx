'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import logo from '@/assets/image/logo.png'
import CurvedMenu from '@/components/layout/curved-menu'

const services = [
  {
    title: 'Website Development',
    href: '/website-development',
    video: '/videos/3130182-uhd_3840_2160_30fps.mp4',
    desc: 'Modern, responsive, and performance-driven web design.'
  },
  {
    title: 'Application Development',
    href: '/application-development',
    video: '/videos/3129540-uhd_3840_2160_30fps.mp4',
    desc: 'Custom mobile and web app solutions built to scale your business.'
  },
  {
    title: 'Software Development',
    href: '/software-development',
    video: '/videos/3129957-uhd_3840_2160_25fps.mp4',
    desc: 'Tailored software solutions for enterprises and startups alike.'
  },
  {
    title: 'Digital Marketing',
    href: '/digital-marketing',
    video: '/videos/3130284-uhd_3840_2160_30fps.mp4',
    desc: 'Creative campaigns that connect your brand to real customers.'
  },
  {
    title: 'UI/UX Design',
    href: '/ui-ux-design',
    video: '/videos/3141208-uhd_3840_2160_25fps.mp4',
    desc: 'Crafting intuitive and engaging user experiences.'
  },
  {
    title: 'Seo Packages',
    href: '/seo-packages',
    video: '/videos/3129576-uhd_3840_2160_30fps.mp4',
    desc: 'Boost your visibility and rank higher with our proven SEO strategies.'
  },
]

const companyItems = [
  {
    title: 'About Us',
    href: '/company/about',
    video: '/videos/3141208-uhd_3840_2160_25fps.mp4',
    desc: 'Know our story, mission, and the team powering our solutions.'
  },
  {
    title: 'Our Portfolio',
    href: '/portfolio',
    video: '/videos/3141210-uhd_3840_2160_25fps.mp4',
    desc: 'Explore projects we have delivered across industries and scales.'
  },
]

export default function Header() {
  const [activeVideo, setActiveVideo] = useState(services[0].video)
  const [hovered, setHovered] = useState<string | null>(null)
  const [companyActive, setCompanyActive] = useState(companyItems[0].title)
  const [companyHovered, setCompanyHovered] = useState<string | null>(null)
  const [companyActiveVideo, setCompanyActiveVideo] = useState<string | undefined>(companyItems[0].video)
  const hoverTimeoutRef = useRef<number | null>(null)

  return (
    <motion.header
      className="bg-gray-200 border-b border-border/40 sticky top-0 z-[9999] backdrop-blur-sm bg-gray-200/95"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-10">
        <nav className="flex items-center justify-between py-4 gap-4">

          {/* Left: Logo */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={logo}
                alt="NextWebOrbit Logo"
                width={50}
                height={50}
                className="object-contain"
              />
              <span className="hidden lg:block font-bold text-foreground tracking-tight whitespace-nowrap text-[clamp(1.125rem,1.6vw,1.75rem)]">
                NextWebOrbit
              </span>
            </Link>
          </motion.div>

          {/* Center: Navigation */}
          <motion.ul
            className="hidden lg:flex items-center gap-[clamp(1rem,2vw,2.5rem)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Home */}
            <li className="relative group/nav overflow-hidden py-2">
              <Link href="/" className="font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap text-[clamp(1rem,1.2vw,1.25rem)] flex items-center gap-1">
                Home
              </Link>
              <motion.div className="absolute bottom-1 left-0 h-[2px] bg-primary w-0 group-hover/nav:w-full transition-all duration-300" />
            </li>

            {/* Company Dropdown */}
            <li className="relative group/nav py-2">
              <div className="font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap text-[clamp(1rem,1.2vw,1.25rem)] flex items-center gap-1 cursor-pointer">
                Company
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover/nav:rotate-180" />
              </div>
              <motion.div className="absolute bottom-1 left-0 h-[2px] bg-primary w-0 group-hover/nav:w-full transition-all duration-300" />
              <div className="invisible absolute left-0 top-full z-50 mt-0 w-[650px] translate-y-2 rounded-xl border border-border bg-background p-4 opacity-0 shadow-xl transition-all duration-200 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 flex before:absolute before:-top-5 before:left-0 before:h-5 before:w-full before:content-['']">
                {/* Left: Company list */}
                <div className="w-1/2 border-r border-border pr-4">
                  {companyItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onMouseEnter={() => {
                        setCompanyHovered(item.title)
                        if (hoverTimeoutRef.current) {
                          clearTimeout(hoverTimeoutRef.current)
                        }
                        hoverTimeoutRef.current = window.setTimeout(() => {
                          setCompanyActive(item.title)
                          setCompanyActiveVideo(item.video)
                        }, 80)
                      }}
                      onMouseLeave={() => {
                        setCompanyHovered(null)
                        if (hoverTimeoutRef.current) {
                          clearTimeout(hoverTimeoutRef.current)
                          hoverTimeoutRef.current = null
                        }
                      }}
                      className="block py-3 border-b border-border/40 last:border-none cursor-pointer"
                    >
                      <div className="relative group/item">
                        <span
                          className="text-[18px] font-semibold text-foreground group-hover/item:text-primary transition-all"
                        >
                          {item.title}
                        </span>
                        <motion.div
                          className="absolute left-0 bottom-0 h-[2px] bg-neutral-800 rounded-full"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{
                            opacity: companyHovered === item.title ? 1 : 0,
                            width: companyHovered === item.title ? '100%' : 0,
                          }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                        {companyHovered === item.title && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="text-[14px] text-muted-foreground mt-1"
                          >
                            {item.desc}
                          </motion.p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Right: Preview panel (textual) */}
                <motion.div
                  key={companyActive + (companyActiveVideo || 'text')}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="w-1/2 pl-4 flex items-center justify-center"
                >
                  {companyActiveVideo ? (
                    <div className="rounded-xl overflow-hidden w-full h-56 shadow-lg bg-black">
                      <video
                        src={companyActiveVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="rounded-xl w-full h-56 shadow-lg border border-border bg-gradient-to-br from-muted to-muted/60 p-5 flex flex-col justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Company</p>
                        <h4 className="text-xl font-semibold text-foreground">
                          {companyActive}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-2">
                          {companyItems.find(ci => ci.title === companyActive)?.desc}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <Link
                          href={companyItems.find(ci => ci.title === companyActive)?.href || '/company'}
                          className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                        >
                          Learn more →
                        </Link>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </li>

            {/* Our Services (with video preview) */}
            <li className="relative group/nav py-2">
              <div className="font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap text-[clamp(1rem,1.2vw,1.25rem)] cursor-pointer flex items-center gap-1">
                Services
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover/nav:rotate-180" />
              </div>
              <motion.div className="absolute bottom-1 left-0 h-[2px] bg-primary w-0 group-hover/nav:w-full transition-all duration-300" />

              <div className="invisible absolute left-0 top-full z-50 mt-0 w-[650px] translate-y-2 rounded-xl border border-border bg-background p-4 opacity-0 shadow-xl transition-all duration-200 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 flex before:absolute before:-top-5 before:left-0 before:h-5 before:w-full before:content-['']">

                {/* Left: Service list */}
                <div className="w-1/2 border-r border-border pr-4">
                  {services.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onMouseEnter={() => {
                        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
                        setHovered(item.title)
                        hoverTimeoutRef.current = window.setTimeout(() => {
                          setActiveVideo(item.video)
                        }, 200)
                      }}
                      onMouseLeave={() => {
                        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
                        setHovered(null)
                      }}
                      className="block py-3 border-b border-border/40 last:border-none cursor-pointer"
                    >
                      <div className="relative group/item">
                        <span
                          className="text-[20px] font-semibold text-foreground group-hover/item:text-primary transition-all"
                        >
                          {item.title}
                        </span>

                        <motion.div
                          className="absolute left-0 bottom-0 h-[2px] bg-neutral-800 rounded-full"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{
                            opacity: hovered === item.title ? 1 : 0,
                            width: hovered === item.title ? '100%' : 0,
                          }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />

                        {/* Description */}
                        {hovered === item.title && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="text-[14px] text-muted-foreground mt-1"
                          >
                            {item.desc}
                          </motion.p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Right: Video preview */}
                <motion.div
                  key={activeVideo}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="w-1/2 pl-4 flex items-center justify-center"
                >
                  <div className="rounded-xl overflow-hidden w-full h-56 shadow-lg bg-black">
                    <video
                      key={activeVideo}
                      src={activeVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </li>

            {/* Other Pages */}
            <li className="relative group/nav overflow-hidden py-2">
              <Link href="/gallery" className="font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap text-[clamp(1rem,1.2vw,1.25rem)]">
                Gallery
              </Link>
              <motion.div className="absolute bottom-1 left-0 h-[2px] bg-primary w-0 group-hover/nav:w-full transition-all duration-300" />
            </li>
            <li className="relative group/nav overflow-hidden py-2">
              <Link href="/career" className="font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap text-[clamp(1rem,1.2vw,1.25rem)]">
                Career
              </Link>
              <motion.div className="absolute bottom-1 left-0 h-[2px] bg-primary w-0 group-hover/nav:w-full transition-all duration-300" />
            </li>
            <li className="relative group/nav overflow-hidden py-2">
              <Link href="/contact" className="font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap text-[clamp(1rem,1.2vw,1.25rem)]">
                Contact Us
              </Link>
              <motion.div className="absolute bottom-1 left-0 h-[2px] bg-primary w-0 group-hover/nav:w-full transition-all duration-300" />
            </li>
          </motion.ul>

          {/* Right Buttons */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <CurvedMenu />
            <Button asChild className="hidden lg:inline-flex bg-foreground text-background hover:bg-foreground/90 rounded-lg font-medium transition-all transform hover:scale-105 px-[clamp(1rem,1.5vw,1.5rem)] py-[clamp(0.25rem,0.5vw,0.5rem)] text-[clamp(0.875rem,1vw,1rem)] h-auto min-h-[2.5rem]">
              <Link href="/contact">Get Started</Link>
            </Button>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  )
}