import React from 'react'
import { motion } from 'framer-motion'
import { ExpandOnScroll, Magnetic } from '@/frontend/animations'

interface ProcessStepProps {
    number: string | number;
    title: string;
    description: string;
    index: number;
}

export const ProcessStep = ({ number, title, description, index }: ProcessStepProps) => {
    return (
        <ExpandOnScroll className="relative pl-12 pb-12 border-l-2 border-border last:border-0 last:pb-0 group">
            <Magnetic className="absolute -left-[17px] top-0 z-10">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
                    className="w-8 h-8 bg-background border-4 border-primary rounded-full group-hover:bg-primary group-hover:scale-125 transition-all duration-300"
                />
            </Magnetic>
            <div className="text-sm font-mono text-primary mb-2">STEP {number}</div>
            <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">{title}</h4>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{description}</p>
        </ExpandOnScroll>
    )
}
