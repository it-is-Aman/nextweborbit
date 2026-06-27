'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'
import { useIsMobile } from '@/frontend/animations/use-media-query'

// Google "G" Logo SVG
const GoogleLogo = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
)

interface Review {
    id: number
    name: string
    text: string
    rating: number
    timeAgo: string
    avatarColor: string
}

interface ActiveReview extends Review {
    x: number
    y: number
    delay: number
    isRightSide: boolean
}

const REVIEWS: Review[] = [
    { id: 1, name: 'Amit Patel', text: 'Excellent service and support! The team went above and beyond.', rating: 5, timeAgo: '2 days ago', avatarColor: 'bg-red-500' },
    { id: 2, name: 'Sarah Johnson', text: 'Transformed our business online. Highly recommended!', rating: 5, timeAgo: '1 week ago', avatarColor: 'bg-blue-500' },
    { id: 3, name: 'Rahul Sharma', text: 'Best web design team in Noida. Very professional.', rating: 5, timeAgo: '3 weeks ago', avatarColor: 'bg-green-500' },
    { id: 4, name: 'Emily Davis', text: 'Professional and timely delivery. Great experience.', rating: 5, timeAgo: '1 month ago', avatarColor: 'bg-purple-500' },
    { id: 5, name: 'Vikram Singh', text: 'Helped us increase leads by 50%. Amazing results.', rating: 5, timeAgo: '2 months ago', avatarColor: 'bg-orange-500' },
    { id: 6, name: 'Jessica Brown', text: 'Great attention to detail and creative designs.', rating: 4, timeAgo: '2 months ago', avatarColor: 'bg-pink-500' },
    { id: 7, name: 'David Wilson', text: 'User-friendly and modern designs. Love their work.', rating: 5, timeAgo: '3 months ago', avatarColor: 'bg-indigo-500' },
    { id: 8, name: 'Priya Gupta', text: 'Fantastic customer service and support.', rating: 5, timeAgo: '4 months ago', avatarColor: 'bg-teal-500' },
]

// Zones definition: { minX, maxX, minY, maxY, isRightSide }
// Adjusted to keep reviews in corners and avoid overlapping hero content
const DESKTOP_ZONES = [
    { minX: 2, maxX: 15, minY: 5, maxY: 25, isRightSide: false },   // Top Left
    { minX: 2, maxX: 15, minY: 70, maxY: 90, isRightSide: false },  // Bottom Left (moved lower)
    { minX: 2, maxX: 15, minY: 5, maxY: 25, isRightSide: true },    // Top Right
    { minX: 2, maxX: 15, minY: 70, maxY: 90, isRightSide: true },   // Bottom Right (moved lower)
]

const MOBILE_ZONES = [
    { minX: 2, maxX: 10, minY: 2, maxY: 15, isRightSide: false },   // Top Left
    { minX: 2, maxX: 10, minY: 2, maxY: 15, isRightSide: true },    // Top Right
    { minX: 2, maxX: 10, minY: 75, maxY: 85, isRightSide: false },  // Bottom Left
    { minX: 2, maxX: 10, minY: 75, maxY: 85, isRightSide: true },   // Bottom Right
]

const FloatingReviews = () => {
    const [activeReviews, setActiveReviews] = useState<ActiveReview[]>([])
    const isMobile = useIsMobile()

    // No need for a separate useEffect for resize check as useIsMobile handles it efficiently
    /* 
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])
    */

    useEffect(() => {
        if (isMobile) {
            if (activeReviews.length > 0) {
                setTimeout(() => setActiveReviews([]), 0)
            }
            return
        }

        const showReviews = () => {
            const zones = DESKTOP_ZONES
            // Select fewer reviews on mobile to avoid clutter
            const count = Math.floor(Math.random() * 2) + 4

            const shuffledReviews = [...REVIEWS].sort(() => 0.5 - Math.random())
            const selectedReviews = shuffledReviews.slice(0, count)

            const shuffledZones = [...zones].sort(() => 0.5 - Math.random())

            const positionedReviews = selectedReviews.map((review, index) => {
                const zone = shuffledZones[index % shuffledZones.length]

                return {
                    ...review,
                    x: Math.random() * (zone.maxX - zone.minX) + zone.minX,
                    y: Math.random() * (zone.maxY - zone.minY) + zone.minY,
                    delay: Math.random() * 2,
                    isRightSide: zone.isRightSide
                }
            })

            setActiveReviews(positionedReviews)

            const duration = Math.random() * 4000 + 6000
            const timeout = setTimeout(() => {
                setActiveReviews([])
            }, duration)
            return () => clearTimeout(timeout)
        }

        showReviews()
        const interval = setInterval(showReviews, 12000)
        return () => clearInterval(interval)
    }, [isMobile])

    return (
        <div className="hidden md:block absolute inset-0 pointer-events-none z-[5] overflow-hidden">
            <AnimatePresence>
                {activeReviews.map((review) => (
                    <motion.div
                        key={`${review.id}-${review.x}`}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                        transition={{ duration: 0.5, delay: review.delay }}
                        style={{
                            top: `${review.y}%`,
                            left: review.isRightSide ? 'auto' : `${review.x}%`,
                            right: review.isRightSide ? `${review.x}%` : 'auto',
                        }}
                        className="absolute bg-white p-2 md:p-3 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] max-w-[180px] md:max-w-[220px] w-full border border-gray-100"
                    >
                        <div className="flex items-start justify-between mb-1.5 md:mb-2">
                            <div className="flex items-center gap-1.5 md:gap-2">
                                <div className={`w-7 h-7 md:w-9 md:h-9 rounded-full ${review.avatarColor} flex items-center justify-center text-white font-bold text-xs md:text-base`}>
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-[11px] md:text-xs leading-tight">{review.name}</h4>
                                    <p className="text-[9px] md:text-[10px] text-gray-500">{review.timeAgo}</p>
                                </div>
                            </div>
                            <GoogleLogo />
                        </div>

                        <div className="flex items-center gap-0.5 mb-1.5">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 ${i < review.rating ? 'text-[#FBBC05] fill-[#FBBC05]' : 'text-gray-300 fill-gray-300'}`}
                                />
                            ))}
                        </div>

                        <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed line-clamp-2">
                            {review.text}
                        </p>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

export default FloatingReviews
