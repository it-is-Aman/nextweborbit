'use client'

import Script from 'next/script'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import FloatingButtons from '@/components/layout/floating-buttons'
import ContactSection from '@/components/features/contact/contact-section'

export default function ContactPageView() {
  return (
    <>
      <Script
        id="localbusiness-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "NextWebOrbit",
            url: "https://nextweborbit.com/contact",
            telephone: "+91-7303468125",
            email: "info@nextweborbit.com",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "Sector 59, Noida,Uttar Pradesh, PIN 201309",
              addressLocality: "Noida",
              addressRegion: "UP",
              postalCode: "201309",
              addressCountry: "IN",
            },
          }),
        }}
      />

      <main className="min-h-screen">
        <Header />
        <ContactSection />
        <Footer />
        <FloatingButtons />
      </main>
    </>
  )
}
