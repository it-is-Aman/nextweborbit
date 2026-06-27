'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamic imports with ssr: false for below-the-fold content to save on TBT/Hydration
const ClientsSection = dynamic(() => import("./clients-section"), { ssr: false });
const PortfolioSection = dynamic(() => import("./portfolio-section"), { ssr: false });
const ServicesSection = dynamic(() => import("./services-section"), { ssr: false });
const WhyChooseUsSection = dynamic(() => import("./why-choose-us-section"), { ssr: false });
const StatisticsSection = dynamic(() => import("./statistics-section"), { ssr: false });
const TechnologiesSection = dynamic(() => import("./technologies-section"), { ssr: false });
const ReviewMarquee = dynamic(() => import("./review-marquee"), { ssr: false });
const ProductSection = dynamic(() => import("./product-section"), { ssr: false });
const WorkflowSection = dynamic(() => import("./workflow-section"), { ssr: false });
const FAQSection = dynamic(() => import("./faq-section"), { ssr: false });
const CTASection = dynamic(() => import("./cta-section"), { ssr: false });
const SolutionsSection = dynamic(() => import("./solutions-section"), { ssr: false });
const BlogSection = dynamic(() => import("./blog-section"), { ssr: false });

export default function HomeInteractiveSegments() {
    return (
        <>
            <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center">Loading...</div>}>
                <ProductSection />
            </Suspense>
            <ClientsSection />
            <SolutionsSection />
            <ServicesSection />
            <PortfolioSection />
            <BlogSection />
            <WorkflowSection />
            <WhyChooseUsSection />
            <TechnologiesSection />
            <StatisticsSection />
            <ReviewMarquee />
            <FAQSection />
            <CTASection />
        </>
    )
}
