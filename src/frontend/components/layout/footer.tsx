'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'
import { CONTACT_INFO, SOCIAL_LINKS, COMPANY_INFO, SERVICES } from '@/constants'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { api } from '@/frontend/lib/api-client'
import type { ApiResponse, NewsletterSubscribeRequest, NewsletterSubscribeResponse } from '@/types/api'

interface CompanyInfo {
  name: string
  tagline: string
  description: string
  expertise: string[]
  logo: {
    dot: boolean
    dotColor: string
  }
}

const Footer = () => {
  // Explicitly cast COMPANY_INFO to our local interface to bypass stale server types
  const companyInfo = COMPANY_INFO as unknown as CompanyInfo

  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // State for footer dropdowns (mobile/desktop toggle)
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const companyLinks = [
    { label: 'About Us', href: '/company/about' },
    { label: 'Our Portfolio', href: '/portfolio' },
    { label: 'Career', href: '/career' },
    { label: 'Contact Us', href: '/contact' },
  ]

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your email' })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await api.post<ApiResponse<NewsletterSubscribeResponse>>(
        '/api/newsletter',
        { email } as NewsletterSubscribeRequest
      )

      if (response.success) {
        setMessage({ type: 'success', text: response.data?.message || 'Successfully subscribed!' })
        setEmail('') // Clear input
      } else {
        setMessage({ type: 'error', text: response.error || 'Subscription failed' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to subscribe' })
    } finally {
      setIsSubmitting(false)
      // Clear message after 5 seconds
      setTimeout(() => setMessage(null), 5000)
    }
  }

  return (
    <footer className="bg-[#050505] text-white py-20 relative overflow-hidden noise-bg">
      {/* Scrolling Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none">
        <motion.div
          className="whitespace-nowrap text-[15vw] font-black leading-none"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35
          }}
        >
          NexWebOrbit Digital Solutions Built for Modern Brands • NexWebOrbit Digital Solutions Built for Modern Brands • NexWebOrbit Digital Solutions Built for Modern Brands •
        </motion.div>
      </div>

      <div className="container mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8 xl:gap-12 mb-12">

          {/* Company Info */}
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center gap-4">
              <div className="shrink-0">
                <Image
                  src="/uploads/logo-2.png"
                  alt="NextWebOrbit Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold leading-tight">{companyInfo.name}</h3>
                <p className="text-sm text-white/50 font-medium">{companyInfo.tagline}</p>
              </div>
            </div>

            <p className="text-background/80 text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed max-w-xl">
              {companyInfo.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {companyInfo.expertise.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold hover:bg-white/10 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Company Dropdown */}
          <div className="flex flex-col">
            <button
              onClick={() => toggleSection('company')}
              className="flex items-center justify-between w-full md:w-auto text-[clamp(1.125rem,2vw,1.25rem)] font-bold mb-6 text-left group"
            >
              Company
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 md:hidden ${openSection === 'company' ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              <div className={`overflow-hidden md:block ${openSection === 'company' ? 'block' : 'hidden'}`}>
                <ul className="space-y-4 text-[clamp(0.875rem,1.5vw,1rem)]">
                  {companyLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link href={link.href} className="text-background/80 hover:text-background transition-colors hover:translate-x-2 inline-block duration-300">
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </AnimatePresence>
          </div>

          {/* Services Dropdown */}
          <div className="flex flex-col">
            <button
              onClick={() => toggleSection('services')}
              className="flex items-center justify-between w-full md:w-auto text-[clamp(1.125rem,2vw,1.25rem)] font-bold mb-6 text-left group"
            >
              Services
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 md:hidden ${openSection === 'services' ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              <div className={`overflow-hidden md:block ${openSection === 'services' ? 'block' : 'hidden'}`}>
                <ul className="space-y-4 text-[clamp(0.875rem,1.5vw,1rem)]">
                  {SERVICES.map((service, index) => (
                    <motion.li
                      key={service.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link href={`/${service.slug}`} className="text-background/80 hover:text-background transition-colors hover:translate-x-2 inline-block duration-300">
                        {service.title}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </AnimatePresence>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-[clamp(0.875rem,1.5vw,1rem)] text-background/80">
              {CONTACT_INFO.address.map((office, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="mb-4 last:mb-0"
                >
                  <a
                    href={office.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.value)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 hover:text-white transition-colors group"
                  >
                    <MapPin className="w-5 h-5 shrink-0 mt-1 group-hover:text-blue-500 transition-colors" />
                    <div>
                      <span className="block text-xs font-bold text-primary mb-0.5 uppercase tracking-wider group-hover:text-white transition-colors">{office.label}</span>
                      <span className="leading-snug block">{office.value}</span>
                    </div>
                  </a>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="flex flex-col gap-2">
                  {CONTACT_INFO.phone.map((phone, i) => (
                    <a
                      key={i}
                      href={`tel:${phone.value.replace(/[^0-9+]/g, '')}`}
                      className="flex items-center gap-3 hover:text-white transition-colors group whitespace-nowrap"
                    >
                      <Phone className="w-5 h-5 shrink-0 group-hover:text-blue-500 transition-colors" />
                      <div className="flex items-center">
                        {phone.label && <span className="text-xs text-white font-bold mr-2 uppercase group-hover:text-white transition-colors">{phone.label}:</span>}
                        <span className="text-sm font-medium">{phone.value}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-3 hover:text-white transition-colors group"
                >
                  <Mail className="w-5 h-5 shrink-0 group-hover:text-blue-500 transition-colors" />
                  <span>{CONTACT_INFO.email}</span>
                </a>
              </motion.li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-bold mb-6">OUR NEWSLETTER</h3>
            <form className="space-y-4" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg text-foreground bg-background/90 border-none focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-foreground/60 disabled:opacity-50"
              />
              {message && (
                <div className={`text-sm p-2 rounded ${message.type === 'success'
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-red-500/20 text-red-300'
                  }`}>
                  {message.text}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-bold bg-background text-foreground hover:bg-background/90 disabled:opacity-50 rounded-lg inline-flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Capsule Outlined Social Buttons (Image 5 Style) */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-12 pt-6 border-t border-white/5"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
            {[
                { name: 'Behance', url: 'https://behance.net' },
                { name: 'Dribbble', url: 'https://dribbble.com' },
                { name: 'Instagram', url: 'https://instagram.com' },
                { name: 'Facebook', url: 'https://facebook.com' },
                { name: 'Linked in', url: 'https://linkedin.com' }
            ].map((social) => (
                <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 sm:px-8 py-3 rounded-full border border-white/20 hover:border-[#b2ff2e] hover:text-[#b2ff2e] text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 transform hover:scale-[1.03]"
                >
                    {social.name}
                </a>
            ))}
        </motion.div>

        {/* Social Media (Circular Row) */}
        <motion.div
          className="flex justify-center gap-4 sm:gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {SOCIAL_LINKS.map((social, index) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:bg-[#FF9F00] hover:text-black transition-all duration-300"
                aria-label={social.name}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            )
          })}
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="text-center text-[clamp(0.75rem,1.5vw,1rem)] text-background/60 pt-8 border-t border-background/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          © Copyright {companyInfo.name}. All Rights Reserved | Designed by {companyInfo.name}
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

