'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { SOCIAL_LINKS } from '@/constants'

const menuItems = [
    { name: 'Home', href: '/' },
    {
        name: 'Company',
        children: [
            { name: 'About Us', href: '/company/about' },
            { name: 'Our Portfolio', href: '/portfolio' },
            { name: 'Gallery', href: '/gallery' }
        ]
    },
    {
        name: 'Services',
        children: [
            { name: 'Application Development', href: '/application-development' },
            { name: 'Seo Packages', href: '/seo-packages' },
            { name: 'Software Development', href: '/software-development' },
            { name: 'Website Development', href: '/website-development' },
            { name: 'Digital Marketing', href: '/digital-marketing' }
        ]
    },
    { name: 'Career', href: '/career' },
    { name: 'Contact', href: '/contact' }
]

// socialLinks moved to centralized constants

export default function CurvedMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true)
    }, [])

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false)
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
            return () => {
                document.removeEventListener('keydown', handleEscape)
                document.body.style.overflow = 'unset'
            }
        }
    }, [isOpen])

    // Close on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setIsOpen(false)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name)
    }

    const curveVariants = {
        initial: {
            d: 'M 100 0 L 100 100 Q 100 50 100 0',
        },
        animate: {
            d: 'M 100 0 L 100 100 Q 0 50 100 0',
            transition: {
                duration: 0.7,
                ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
            }
        },
        exit: {
            d: 'M 100 0 L 100 100 Q 100 50 100 0',
            transition: {
                duration: 0.7,
                ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
            }
        }
    }

    const menuVariants = {
        closed: {
            x: 'calc(100% + 100px)',
            transition: {
                duration: 0.7,
                ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
            },
        },
        open: {
            x: 0,
            transition: {
                duration: 0.7,
                ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
            },
        },
    }

    const menuItemVariants = {
        closed: {
            x: 50,
            opacity: 0,
        },
        open: (i: number) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: 0.1 + i * 0.1,
                duration: 0.4,
                ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
            },
        }),
    }

    const footerVariants = {
        closed: {
            opacity: 0,
        },
        open: {
            opacity: 1,
            transition: {
                delay: 0.6,
                duration: 0.4,
            },
        },
    }

    return (
        <>
            {/* Burger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative z-[100] w-12 h-12 flex flex-col items-center justify-center gap-[6px] group cursor-pointer"
                aria-label="Toggle menu"
            >
                <motion.span
                    animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-7 h-[2px] rounded-full origin-center transition-colors duration-300 ${isOpen ? 'bg-white' : 'bg-foreground'}`}
                />
                <motion.span
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-7 h-[2px] bg-foreground rounded-full"
                />
                <motion.span
                    animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-7 h-[2px] rounded-full origin-center transition-colors duration-300 ${isOpen ? 'bg-white' : 'bg-foreground'}`}
                />
            </button>

            {mounted && createPortal(
                <AnimatePresence mode="wait">
                    {isOpen && (
                        <>
                            {/* Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] lg:hidden"
                                onClick={() => setIsOpen(false)}
                            />

                            {/* Menu Container */}
                            <motion.div
                                variants={menuVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                className="fixed top-0 right-0 h-screen w-[85%] max-w-[480px] bg-[#1a1a1a] z-[9999] lg:hidden overflow-y-auto no-scrollbar"
                            >
                                {/* SVG Curve */}
                                <svg
                                    className="absolute top-0 right-full h-full w-[100px] pointer-events-none fill-[#1a1a1a]"
                                    preserveAspectRatio="none"
                                >
                                    <motion.path
                                        variants={curveVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                    />
                                </svg>

                                {/* Close Button */}
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ delay: 0.2, duration: 0.3 }}
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-8 right-8 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors z-10"
                                    aria-label="Close menu"
                                >
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </motion.button>

                                {/* Menu Content */}
                                <div className="flex flex-col min-h-full px-10 py-32">
                                    {/* Navigation Header */}
                                    <div className="flex-1">
                                        <motion.p
                                            variants={footerVariants}
                                            className="text-gray-400 text-xs uppercase tracking-wider mb-8 border-b border-gray-700 pb-2"
                                        >
                                            Navigation
                                        </motion.p>

                                        {/* Menu Items */}
                                        <nav className="flex flex-col gap-3">
                                            {menuItems.map((item, i) => (
                                                <motion.div
                                                    key={item.name}
                                                    custom={i}
                                                    variants={menuItemVariants}
                                                    initial="closed"
                                                    animate="open"
                                                    exit="closed"
                                                >
                                                    {item.children ? (
                                                        <div className="flex flex-col">
                                                            <div
                                                                className="flex items-center justify-between cursor-pointer group"
                                                                onClick={() => toggleDropdown(item.name)}
                                                            >
                                                                <span className="text-white text-5xl md:text-6xl font-light group-hover:text-gray-300 transition-colors block leading-tight">
                                                                    {item.name}
                                                                </span>
                                                                <motion.div
                                                                    animate={{ rotate: activeDropdown === item.name ? 90 : 0 }}
                                                                    transition={{ duration: 0.2 }}
                                                                >
                                                                    <ChevronRight size={32} className="text-white/50" />
                                                                </motion.div>
                                                            </div>

                                                            <AnimatePresence>
                                                                {activeDropdown === item.name && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: 'auto', opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        transition={{ duration: 0.3 }}
                                                                        className="overflow-hidden"
                                                                    >
                                                                        <div className="flex flex-col gap-2 pl-4 mt-2 mb-4 border-l border-white/10">
                                                                            {item.children.map((child, idx) => (
                                                                                <Link
                                                                                    key={idx}
                                                                                    href={child.href}
                                                                                    onClick={() => setIsOpen(false)}
                                                                                    className="text-white/70 text-xl hover:text-white transition-colors py-1"
                                                                                >
                                                                                    {child.name}
                                                                                </Link>
                                                                            ))}
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    ) : (
                                                        <Link
                                                            href={item.href!}
                                                            onClick={() => setIsOpen(false)}
                                                            className="text-white text-5xl md:text-6xl font-light hover:text-gray-300 transition-colors block leading-tight"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </nav>
                                    </div>

                                    {/* Footer Section */}
                                    <div className="mt-12 space-y-8">

                                        {/* Video Section */}
                                        <motion.div
                                            variants={footerVariants}
                                            initial="closed"
                                            animate="open"
                                            exit="closed"
                                            className="rounded-xl overflow-hidden border border-white/10 bg-black/20"
                                        >
                                            <video
                                                key={isOpen ? 'open' : 'closed'}
                                                src="/videos/3130182-uhd_3840_2160_30fps.mp4"
                                                className="w-full h-[160px] object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                preload="none"
                                            />
                                            <div className="p-3">
                                                <p className="text-white/60 text-xs">Welcome to NextWebOrbit</p>
                                            </div>
                                        </motion.div>

                                        {/* Social Icons */}
                                        <motion.div
                                            variants={footerVariants}
                                            initial="closed"
                                            animate="open"
                                            exit="closed"
                                            className="flex flex-wrap gap-6"
                                        >
                                            {SOCIAL_LINKS.map((link) => {
                                                const Icon = link.icon
                                                return (
                                                    <a
                                                        key={link.name}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-white/70 hover:text-white transition-colors"
                                                    >
                                                        <Icon size={24} />
                                                        <span className="sr-only">{link.name}</span>
                                                    </a>
                                                )
                                            })}
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    )
}
