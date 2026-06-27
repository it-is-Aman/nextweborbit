'use client'

import React from 'react'
import { StaggerContainer, StaggerItem } from '@/frontend/animations'
import { motion } from 'framer-motion'

export const StatsBar = () => {
    const stats = [
        { label: "User Journeys Mapped", value: "500+" },
        { label: "Design Iterations", value: "2k+" },
        { label: "CSAT Score", value: "4.9/5" },
        { label: "Components Built", value: "10k+" },
    ]

    return (
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-border">
            {stats.map((stat, index) => (
                <StaggerItem key={index}>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="text-center cursor-default"
                    >
                        <div className="text-3xl md:text-5xl font-black mb-2 text-primary">{stat.value}</div>
                        <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                </StaggerItem>
            ))}
        </StaggerContainer>
    )
}
