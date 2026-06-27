import React, { useState } from 'react'
import { ShuffleText, TiltCard, ScaleIn } from '@/frontend/animations'

interface IndustryCardProps {
    icon: React.ElementType;
    title: string;
}

export const IndustryCard = ({ icon: Icon, title }: IndustryCardProps) => {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <ScaleIn>
            <TiltCard className="h-full">
                <div
                    className="group relative h-full p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all cursor-pointer overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                        <Icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
                        <h3 className="text-2xl font-black text-foreground leading-none">
                            <ShuffleText text={title} isHovered={isHovered} />
                        </h3>
                    </div>
                </div>
            </TiltCard>
        </ScaleIn>
    )
}
