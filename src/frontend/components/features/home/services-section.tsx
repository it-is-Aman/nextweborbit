'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SERVICES } from '@/constants'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { BlurReveal } from '@/frontend/animations'

interface Service {
  id: number
  title: string
  slug: string
  icon: React.ElementType
  tagline?: string
  description?: string
}

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const [isArrowHovered, setIsArrowHovered] = useState(false)
  const Icon = service.icon
  const colors = [
    '#e2ffbc', // Light Lime
    '#d1eaff', // Light Blue
    '#f3d8ff', // Light Purple
    '#ffe5d8', // Light Orange
    '#d8f8f3', // Light Cyan
  ]
  const cardColor = colors[index % colors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative w-full h-full min-h-[320px] rounded-[2.5rem] p-[clamp(1rem,3vw,1.5rem)] flex flex-col justify-between shadow-lg overflow-visible group"
      style={{ backgroundColor: cardColor }}
    >
      {/* Corner Action Area */}
      <div className="absolute top-0 right-0 flex items-center bg-[#F2F2F2] pl-6 pb-6 rounded-bl-[3.5rem] z-20">
        {/* Top-Left Inverted Corner */}
        <div className="absolute -left-12 top-0 w-12 h-12 bg-[#F2F2F2]">
          <div
            className="w-full h-full rounded-tr-[3.5rem]"
            style={{ backgroundColor: cardColor }}
          />
        </div>
        {/* Bottom-Right Inverted Corner */}
        <div className="absolute right-0 -bottom-12 w-12 h-12 bg-[#F2F2F2]">
          <div
            className="w-full h-full rounded-tr-[3.5rem]"
            style={{ backgroundColor: cardColor }}
          />
        </div>

        <div className="flex gap-2 relative z-30">
          <Link
            href={`/${service.slug}`}
            onMouseEnter={() => setIsArrowHovered(true)}
            onMouseLeave={() => setIsArrowHovered(false)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-md mt-1 mr-1 ${isArrowHovered ? 'bg-[#212121] text-white' : 'bg-[#f2f2f2] text-[#212121] border border-black/5'
              }`}
          >
            <ArrowUpRight className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Card Header */}
      <div className="flex items-center gap-4 pt-4 pr-16 md:pr-20">
        <div className="w-12 h-12 bg-[#212121] rounded-full flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-black text-[#212121] leading-none mb-1">{service.title}</h3>
          <span className="text-primary text-[10px] font-bold tracking-[0.2em] mt-1 uppercase italic">{service.tagline || 'Strategic IT Solution'}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="mt-8 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#212121] rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[#212121] font-semibold text-lg leading-snug">
              {service.title} Strategy & Deployment
            </p>
            <p className="text-[#212121]/70 text-sm mt-1">
              {service.description || 'Building next-gen digital experiences for your brand and business.'}
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-4">
        <div className="flex items-center gap-2 bg-black/5 px-3 py-2 rounded-full transition-all duration-300">
          <div className="w-8 h-8 rounded-full bg-[#212121] flex items-center justify-center">
            <Icon className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-bold text-[#212121] min-w-[80px]">
            {isArrowHovered ? 'Explore' : 'Waiting Action'}
          </span>
        </div>

        <div className="flex gap-2">
          <div className="w-11 h-11 rounded-full bg-[#212121] text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#212121] transition-colors duration-300">
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const ServicesSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] opacity-90 mb-6 uppercase">
            <BlurReveal>Our Specialized Services</BlurReveal>
          </h2>
          <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed text-muted-foreground max-w-xl">
            Empowering Businesses with Smart Digital Solutions That Drive Real Growth. <b>Start Your Digital Transformation Today</b>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
