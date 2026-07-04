'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react'

interface Industry {
    id: string
    name: string
    description: string
    image: string
    subcategories: string[]
}

const INDUSTRIES: Industry[] = [
    {
        id: 'real-estate',
        name: 'Real Estate',
        description: 'We build websites, software, and mobile apps for real estate businesses to streamline operations, improve lead management, and drive sales.',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop',
        subcategories: [
            'Real Estate Developers',
            'Property Dealers',
            'Builders',
            'Real Estate Consultants',
            'Brokerage Firms',
            'Commercial Property Companies',
            'Residential Developers',
            'Property Management Companies',
            'Land Developers',
            'Housing Projects'
        ]
    },
    {
        id: 'ecommerce',
        name: 'E-Commerce & Retail',
        description: 'We deliver full-scale online storefronts, inventory management systems, and shopping apps that maximize sales conversion and customer engagement.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop',
        subcategories: [
            'Online Stores & Carts',
            'B2C Shopping Apps',
            'Multi-vendor Marketplaces',
            'POS Integrations',
            'Payment Gateway Setup',
            'Inventory Management',
            'CRM & Customer Loyalty',
            'Subscriptions & Billing',
            'Dropshipping Systems',
            'B2B Wholesale Portals'
        ]
    },
    {
        id: 'healthcare',
        name: 'Healthcare & Life Sciences',
        description: 'Secure, compliant digital tools, telemedicine apps, and custom patient platforms that streamline clinical workflows and care delivery.',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=600&auto=format&fit=crop',
        subcategories: [
            'Telemedicine Platforms',
            'Hospital Management',
            'Patient Portals & Apps',
            'Appointment Scheduling',
            'EHR/EMR Integrations',
            'Pharmacy Order Apps',
            'Clinical Trial Software',
            'Medical Billing Systems',
            'Health Tracking Devices',
            'HIPAA Compliant Tech'
        ]
    },
    {
        id: 'education',
        name: 'Education & E-Learning',
        description: 'Interactive learning management systems, school administration software, and student applications built to deliver seamless remote education.',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop',
        subcategories: [
            'Learning Management (LMS)',
            'Virtual Classrooms',
            'Interactive Study Apps',
            'Student & Grade Portals',
            'Video Lectures Streaming',
            'Exam & Proctoring Software',
            'Language Learning Apps',
            'Corporate Training Tools',
            'Tuition & Tutor Systems',
            'Admission & Enrollments'
        ]
    },
    {
        id: 'logistics',
        name: 'Logistics & Supply Chain',
        description: 'End-to-end supply chain dashboards, real-time fleet tracking, and driver apps that reduce operational overhead and improve dispatch times.',
        image: 'https://images.unsplash.com/photo-1519003722824-192d992a6058?q=80&w=600&auto=format&fit=crop',
        subcategories: [
            'Fleet Tracking & GPS',
            'Driver Navigation Apps',
            'Dispatch & Optimization',
            'Warehouse Management',
            'Cargo & Freight Booking',
            'Real-Time Package Tracking',
            'Supply Chain Dashboards',
            'Inventory Sync Systems',
            'Logistics Analytics',
            'Delivery Driver Apps'
        ]
    }
]

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 100 : -100,
        opacity: 0
    }),
    center: {
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 100 : -100,
        opacity: 0
    })
}

const IndustriesServe = () => {
    const [[page, direction], setPage] = useState([0, 0])

    const activeIndex = (page % INDUSTRIES.length + INDUSTRIES.length) % INDUSTRIES.length
    const currentIndustry = INDUSTRIES[activeIndex]

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection])
    }

    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900 mb-6 leading-tight">
                        Industries We Serve
                    </h2>
                    <p className="text-base sm:text-lg text-neutral-500 font-light leading-relaxed">
                        We&apos;ve excelled our experience in a wide range of industries to bring valuable insights and provide our clients with the truly beneficial solutions.
                    </p>
                </div>

                {/* Card Container */}
                <div className="relative bg-white border border-neutral-100 rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] max-w-6xl mx-auto z-10">
                    
                    <div className="overflow-hidden relative min-h-[500px] md:min-h-[380px]">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={page}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: 'spring', stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
                            >
                                {/* Left Side: Image */}
                                <div className="md:col-span-5 relative w-full aspect-[4/3] rounded-[1.8rem] overflow-hidden shadow-md">
                                    <Image
                                        src={currentIndustry.image}
                                        alt={currentIndustry.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        className="object-cover"
                                        priority
                                    />
                                </div>

                                {/* Right Side: Content */}
                                <div className="md:col-span-7 flex flex-col justify-between h-full">
                                    <div>
                                        <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-4">
                                            {currentIndustry.name}
                                        </h3>
                                        <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed mb-8">
                                            {currentIndustry.description}
                                        </p>

                                        {/* Subcategories List Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                            {currentIndustry.subcategories.map((sub, idx) => (
                                                <div key={idx} className="flex items-center gap-3">
                                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 stroke-[1.8]" />
                                                    <span className="text-sm sm:text-[15px] font-medium text-neutral-700">
                                                        {sub}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Right Controls */}
                                    <div className="flex justify-end gap-3 mt-8 md:mt-6">
                                        <button
                                            onClick={() => paginate(-1)}
                                            className="p-3.5 rounded-full border border-neutral-200 hover:border-neutral-900 text-neutral-500 hover:text-neutral-900 transition-all duration-300 active:scale-95 bg-white shadow-sm hover:shadow"
                                            aria-label="Previous Industry"
                                        >
                                            <ArrowLeft className="w-5 h-5 stroke-[2]" />
                                        </button>
                                        <button
                                            onClick={() => paginate(1)}
                                            className="p-3.5 rounded-full border border-neutral-200 hover:border-neutral-900 text-neutral-500 hover:text-neutral-900 transition-all duration-300 active:scale-95 bg-white shadow-sm hover:shadow"
                                            aria-label="Next Industry"
                                        >
                                            <ArrowRight className="w-5 h-5 stroke-[2]" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default IndustriesServe
