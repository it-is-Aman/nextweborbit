import React from 'react'
import { StaggerContainer, StaggerItem } from '@/frontend/animations'
import { motion } from 'framer-motion'

export const StatsBar = () => {
    const stats = [
        { label: "Software Delivered", value: "200+" },
        { label: "Code Quality", value: "99.9%" },
        { label: "Uptime Guarantee", value: "99.99%" },
        { label: "Happy Clients", value: "150+" },
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
