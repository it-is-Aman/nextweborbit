'use client'

import { useState, useEffect } from 'react'
import NextImage from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PortfolioItem } from '@/shared/types/api'

export default function InsightsSection() {
    const [items, setItems] = useState<PortfolioItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await fetch(`/api/portfolio?t=${Date.now()}`)
                const data = await response.json()
                if (data.success && data.data?.items) {
                    // Filter for "Our Product" or just take the first 3 items as a showcase
                    // User said "product show krna hai" (show products)
                    // Trying to filter by type 'Our Product' if available, else just slice 3
                    const productItems = data.data.items.filter((item: PortfolioItem) => item.type === 'Our Product')
                    const displayItems = productItems.length > 0 ? productItems : data.data.items
                    setItems(displayItems.slice(0, 3))
                }
            } catch (error) {
                console.error('Failed to fetch portfolio:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPortfolio()
    }, [])

    if (isLoading) return null // Or a loading skeleton if preferred, but null prevents layout jump if fast

    return (
        <section className="w-full py-32 bg-secondary text-foreground">
            <div className="container mx-auto px-6">
                <div className="flex flex-col mb-12 md:mb-20 border-b border-foreground/10 pb-8">
                    <span className="text-sm font-bold tracking-wide text-muted-foreground mb-4 block">Our Latest Products</span>
                    <div className="flex flex-row justify-between items-center gap-2 md:gap-4 overflow-hidden">
                        <h2 className="text-[clamp(1.5rem,6.5vw,4.5rem)] md:text-7xl font-black tracking-tighter leading-none shrink min-w-0">
                            Insights By NextWebOrbit
                        </h2>
                        <Link href="/portfolio">
                            <button className="flex-shrink-0 w-20 h-20 md:w-28 md:h-28 border border-foreground rounded-full flex flex-col items-center justify-center text-[8px] md:text-xs font-bold tracking-tight hover:bg-foreground hover:text-background transition-all duration-300 leading-tight p-1 text-center group cursor-pointer">
                                <span>View</span>
                                <span>All</span>
                                <span>Works</span>
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((item, i) => (
                        <motion.div
                            key={item.id || i}
                            whileHover={{ y: -10 }}
                            className="group cursor-pointer flex flex-col h-full"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden rounded-md mb-6 bg-muted">
                                {item.imageUrl || item.preview ? (
                                    <NextImage
                                        src={item.imageUrl || item.preview}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-background px-3 py-1 text-xs font-bold tracking-wide rounded-sm text-foreground uppercase">
                                    {item.category || item.type}
                                </div>
                            </div>

                            <div className="flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                    {item.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-foreground/10">
                                    <a
                                        href={item.projectLink || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-bold tracking-wide hover:text-primary transition-colors"
                                    >
                                        View
                                        <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
