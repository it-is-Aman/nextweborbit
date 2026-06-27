'use client'

import { Star } from 'lucide-react'

const ALL_REVIEWS = [
    {
        id: 1,
        text: "Next Web Orbit transformed our outdated website into a modern, high-converting platform. Their attention to detail and technical expertise is unmatched.",
        name: "Rajesh Kumar",
        role: "Director at Alpha Tech Solutions",
        rating: 5,
    },
    {
        id: 2,
        text: "The SEO results have been phenomenal. We've seen a 200% increase in organic traffic within just 3 months of working with them.",
        name: "Sarah Jenkins",
        role: "Marketing Head at StyleStore",
        rating: 5,
    },
    {
        id: 3,
        text: "They built a robust mobile app for our logistics business that streamlined our entire operation. Highly recommended for custom software development.",
        name: "Amit Patel",
        role: "COO of FastTrack Logistics",
        rating: 5,
    },
    {
        id: 4,
        text: "Our digital marketing campaigns are finally delivering ROI. The team at Next Web Orbit really understands how to target the right audience.",
        name: "Jessica Lee",
        role: "Founder of Urban Cafe",
        rating: 5,
    },
    {
        id: 5,
        text: "Professional, timely, and innovative. They didn't just build a website; they consulted us on our entire digital strategy.",
        name: "David Chen",
        role: "CEO at TechVision Inc",
        rating: 5,
    },
    {
        id: 6,
        text: "Excellent support team! They are always available to handle any technical issues instantly. Truly a reliable IT partner.",
        name: "Priya Sharma",
        role: "Manager at HealthFirst Clinic",
        rating: 4,
    }
]

const AVATAR_COLORS = [
    'bg-[#FF6B6B]', // Coral
    'bg-[#4ECDC4]', // Turquoise
    'bg-[#45B7D1]', // Sky Blue
    'bg-[#96CEB4]', // Sage
    'bg-[#FFEEAD]', // Cream
    'bg-[#D4A5A5]', // Rose
    'bg-[#9B59B6]', // Amethyst
    'bg-[#3498DB]', // Blue
    'bg-[#E67E22]', // Orange
    'bg-[#2ECC71]', // Green
]

const getAvatarColor = (name: string) => {
    const charCode = name.charCodeAt(0)
    return AVATAR_COLORS[charCode % AVATAR_COLORS.length]
}

const ReviewCard = ({ review }: { review: typeof ALL_REVIEWS[0] }) => {
    const avatarBg = getAvatarColor(review.name)

    return (
        <div className="w-[200px] h-[160px] md:w-[240px] md:h-[190px] lg:w-[280px] lg:h-[220px] bg-[#1a1a1a] rounded-[1.2rem] md:rounded-[1.5rem] p-3 md:p-3.5 lg:p-4 flex-shrink-0 mx-2 md:mx-2.5 lg:mx-3 relative overflow-hidden group transition-all duration-300 hover:scale-[1.02]">
            {/* Circle Element (Avatar with Letter) */}
            <div className={`absolute top-1 left-1 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full ${avatarBg} z-20 flex items-center justify-center border-[2px] border-[#1a1a1a] shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                <span className="text-white font-black text-sm md:text-base lg:text-lg uppercase italic drop-shadow-md">
                    {review.name.charAt(0)}
                </span>
            </div>

            {/* Content Block */}
            <div
                className="absolute top-2 left-2 right-2 bottom-2 bg-[#ffffff] rounded-[1rem] md:rounded-[1.2rem] p-3 pl-10 md:pl-12 lg:pl-14 flex flex-col justify-start transition-all duration-500"
                style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 8% 100%, 0 85%)" }}>

                {/* Stars */}
                <div className="flex mb-1.5 md:mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-2.5 h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 mr-0.5 ${i < review.rating ? 'text-[#FFD700] fill-[#FFD700]' : 'text-gray-200 fill-gray-200'}`}
                        />
                    ))}
                </div>

                <p className="text-[10px] md:text-[11px] lg:text-[12px] text-[#2d2d2d] font-semibold line-clamp-4 mb-auto leading-relaxed italic tracking-tight">
                    {review.text}
                </p>

                <div className="pt-1.5 md:pt-2 border-t border-gray-100 mt-1 md:mt-1.5">
                    <h4 className="text-[11px] md:text-[12px] lg:text-[13px] font-bold text-[#3b82f6] leading-none mb-0.5 truncate">{review.name}</h4>
                    <p className="text-[8px] md:text-[9px] lg:text-[10px] text-gray-500 font-bold uppercase tracking-widest truncate">{review.role}</p>
                </div>
            </div>

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        </div>
    )
}

export default function ReviewMarquee() {
    return (
        <section className="py-[clamp(2rem,6vw,4rem)] bg-gray-50 overflow-hidden">
            <style jsx>{`
                @keyframes marquee-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .animate-marquee-left {
                    animation: marquee-left 40s linear infinite;
                }
                .animate-marquee-right {
                    animation: marquee-right 45s linear infinite;
                }
                .marquee-container:hover .animate-marquee-left,
                .marquee-container:hover .animate-marquee-right {
                    animation-play-state: paused;
                }
            `}</style>
            <div className="container mx-auto px-4 mb-[clamp(1.5rem,4vw,3rem)] text-center">
                <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold uppercase text-foreground leading-tight max-w-4xl mx-auto">
                    Words of praise from others about our presence.
                </h2>
            </div>

            <div className="flex flex-col gap-[clamp(1rem,3vw,2rem)] relative marquee-container">
                {/* Side Gradients for "Smoky" Blur Effect */}
                <div className="absolute top-0 left-0 w-[15vw] h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[15vw] h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

                {/* Row 1: Right to Left */}
                <div className="flex overflow-hidden">
                    <div className="flex animate-marquee-left w-fit">
                        {[...ALL_REVIEWS, ...ALL_REVIEWS].map((review, idx) => (
                            <ReviewCard key={`row1-${idx}`} review={review} />
                        ))}
                    </div>
                </div>

                {/* Row 2: Left to Right */}
                <div className="flex overflow-hidden">
                    <div className="flex animate-marquee-right w-fit">
                        {[...ALL_REVIEWS, ...ALL_REVIEWS].map((review, idx) => (
                            <ReviewCard key={`row2-${idx}`} review={review} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}


