import React from 'react'
import { motion } from 'framer-motion'
import { ExpandOnScroll, Magnetic, StaggerContainer, StaggerItem } from '@/frontend/animations'

export const TechCategory = ({ title, items }: { title: string, items: string[] }) => {
    return (
        <ExpandOnScroll>
            <Magnetic>
                <div className="bg-card border border-border p-8 rounded-2xl hover:border-primary/50 transition-colors group shadow-sm h-full">
                    <h3 className="text-2xl font-black text-foreground mb-6 border-b border-border pb-4 group-hover:border-primary/30 transition-colors uppercase">
                        {title}
                    </h3>
                    <StaggerContainer className="flex flex-wrap gap-2">
                        {items.map((item, i) => (
                            <StaggerItem key={i}>
                                <motion.span
                                    whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
                                    className="inline-block px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground border border-transparent hover:border-primary/50 transition-all cursor-default"
                                >
                                    {item}
                                </motion.span>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </Magnetic>
        </ExpandOnScroll>
    )
}
