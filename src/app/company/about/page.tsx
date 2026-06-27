'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import FloatingButtons from "@/components/layout/floating-buttons"
import dynamic from 'next/dynamic'

const AboutHero = dynamic(() => import('@/components/features/about/about-hero'), { ssr: false })
const CultureSection = dynamic(() => import('@/components/features/about/culture-section'), { ssr: false })
const LeadershipSection = dynamic(() => import('@/components/features/about/leadership-section'), { ssr: false })
const JoinTeamBanner = dynamic(() => import('@/components/features/about/join-team-banner'), { ssr: false })
const InsightsSection = dynamic(() => import('@/components/features/about/insights-section'), { ssr: false })
const FounderSection = dynamic(() => import('@/components/features/about/founder-section'), { ssr: false })
const JourneySection = dynamic(() => import('@/components/features/about/journey-section'), { ssr: false })
const AboutClientsSection = dynamic(() => import('@/components/features/about/about-clients-section'), { ssr: false })
const TextRevealSection = dynamic(() => import('@/components/features/about/text-reveal-section'), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  return (
    <main className="w-full bg-background min-h-screen">
      <Header />
      <AboutHero />
      {/* <TextRevealSection /> */}
      <CultureSection />
      {/* <FounderSection /> */}
      <JourneySection />
      <AboutClientsSection />
      <LeadershipSection />
      <JoinTeamBanner />
      <InsightsSection />
      <Footer />
      <FloatingButtons />
    </main>
  )
}
