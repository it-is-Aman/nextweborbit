'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BottomToCenter } from '@/frontend/animations'
import { JOB_CATEGORIES } from '@/constants'
import { ChevronDown } from 'lucide-react'

interface JobCategoryFiltersProps {
    selectedCategory: string
    onCategoryChange: (category: string) => void
}

export default function JobCategoryFilters({ selectedCategory, onCategoryChange }: JobCategoryFiltersProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const handleCategorySelect = (category: string) => {
        onCategoryChange(category)
        setIsDropdownOpen(false)
    }

    return (
        <BottomToCenter>
            {/* Mobile Dropdown Filter */}
            <div className="md:hidden mb-12 relative z-50">
                <motion.button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-30px px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 bg-foreground text-background flex items-center justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <span>Select</span>
                    <motion.div
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown size={20} />
                    </motion.div>
                </motion.button>

                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full mt-2 w-30px bg-background border border-border rounded-2xl shadow-lg overflow-hidden z-50"
                        >
                            {JOB_CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategorySelect(category)}
                                    className={`w-30px px-5 py-3 text-left text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                        ? 'bg-foreground text-background'
                                        : 'bg-background text-foreground hover:bg-muted'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Desktop Horizontal Filters */}
            <motion.div
                className="hidden md:flex flex-wrap gap-3 mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                {JOB_CATEGORIES.map((category, index) => (
                    <motion.button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                            ? 'bg-foreground text-background'
                            : 'border-2 border-border bg-background text-foreground hover:bg-blue-600 hover:text-white hover:border-blue-600'
                            }`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {category}
                    </motion.button>
                ))}
            </motion.div>
        </BottomToCenter>
    )
}
