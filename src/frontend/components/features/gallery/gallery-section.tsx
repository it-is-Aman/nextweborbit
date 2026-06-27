"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const galleryImages = [
    { id: 1, src: '/uploads/images/1.jpeg', alt: 'Modern Workspace', category: 'Office' },
    { id: 2, src: '/uploads/images/2.jpeg', alt: 'Team Collaboration', category: 'Culture' },
    { id: 3, src: '/uploads/images/3.jpeg', alt: 'Creative Design', category: 'Design' },
    { id: 4, src: '/uploads/images/4.jpeg', alt: 'Development', category: 'Tech' },
    { id: 5, src: '/uploads/images/5.jpeg', alt: 'Digital Marketing', category: 'Marketing' },
    { id: 6, src: '/uploads/images/6.jpeg', alt: 'Creative Space', category: 'Studio' },
    { id: 7, src: '/uploads/images/7.jpeg', alt: 'Team Meeting', category: 'Meeting' },
    { id: 8, src: '/uploads/images/8.jpeg', alt: 'Office Vibes', category: 'Office' },
    { id: 9, src: '/uploads/images/9.jpeg', alt: 'Design Thinking', category: 'Work' },
    { id: 10, src: '/uploads/images/10.jpeg', alt: 'Coding Session', category: 'Tech' },
    { id: 11, src: '/uploads/images/11.jpeg', alt: 'Strategy Planning', category: 'Strategy' },
    { id: 12, src: '/uploads/images/12.jpeg', alt: 'Client Presentation', category: 'Business' },
    { id: 13, src: '/uploads/images/13.jpeg', alt: 'Focus Mode', category: 'Work' },
    { id: 14, src: '/uploads/images/14.jpeg', alt: 'Team Lunch', category: 'Fun' },
    { id: 15, src: '/uploads/images/17.jpeg', alt: 'Tech Setup', category: 'Tech' },

];

const GalleryPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Clean, simple stagger fade-in animation
            // This will NOT affect the layout or gaps
            gsap.fromTo(imagesRef.current,
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%', // Animation starts when gallery top hits 80% of viewport
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen bg-white text-black overflow-hidden py-12 md:py-24">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-12 md:mb-20 text-center">
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] opacity-90 mb-8 uppercase text-black">
                        GALLERY
                    </h1>
                    <p className="text-primary text-[10px] font-bold tracking-[0.2em] mt-1 uppercase">
                        Selected Works
                    </p>
                </div>

                {/* Unified Responsive Grid */}
                {/*
            grid-cols-1 (Mobile)
            md:grid-cols-2 (Tablet)
            lg:grid-cols-3 (Desktop)
            Consistent gap-6 (Mobile) to gap-8 (Desktop)
        */}
                <div ref={containerRef} className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
                    {galleryImages.map((image, index) => (
                        <div
                            key={image.id}
                            ref={el => { imagesRef.current[index] = el }}
                            className="break-inside-avoid relative group overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-500 mb-6 md:mb-8"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={800}
                                height={1200}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 block"
                            />

                            {/* Dark Gradient Overlay - Always subtle, darker on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

                            {/* Content - Slides up on hover */}
                            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="inline-block px-3 py-1 mb-3 text-[10px] md:text-xs font-bold tracking-widest text-black bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {image.category}
                                </span>
                                <h3 className="text-2xl font-black text-white leading-none mb-2 tracking-tight">
                                    {image.alt}
                                </h3>
                                <div className="w-12 h-1 bg-white mt-4 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-200"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom decorative line */}
                <div className="mt-20 border-t border-gray-100 pt-8 flex justify-between items-center text-xs text-gray-400 uppercase tracking-wider">
                    <span>01 / 09</span>
                    <span>Scroll</span>
                </div>
            </div>
        </div>
    );
};

export default GalleryPage;