'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Building, Globe, Server, Send, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import { BlurReveal, Magnetic } from '@/frontend/animations'
import { SOCIAL_LINKS } from '@/constants'
import { Button } from '@/components/ui/button'
import { api } from '@/frontend/lib/api-client'
import type { ApiResponse, ContactFormRequest, ContactFormResponse } from '@/types/api'

const CONTACT_INFO_DISPLAY = {
  offices: [
    {
      city: 'Noida',
      country: 'India',
      address: 'Sector 59, Noida,Uttar Pradesh, PIN 201309',
      phone: '+91-8588900105',
      mapUrl: 'https://maps.app.goo.gl/gcCKAUSALEzMP6WV8',
      embedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5591.579581311327!2d77.36272873868431!3d28.608214771747306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce565fcf639e7%3A0x677c4d7bd48136!2sSector%2059%2C%20Noida%2C%20Uttar%20Pradesh%20201309!5e1!3m2!1sen!2sin!4v1780131966085!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
    },
    // {
    //   city: 'New York',
    //   country: 'USA',
    //   address: '5 Penn Plaza, 14th Floor, New York, NY 10001',
    //   mapUrl: 'https://www.google.com/maps/search/5+Penn+Plaza+New+York',
    // //   embedSrc: 'https://www.google.com/maps/embed?pb=...'
    // }
  ],
  email: 'info@nextweborbit.com'
}

const TechnicalAccent = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none opacity-30 ${className}`}>
    <div className="w-4 h-4 border-t-2 border-l-2 border-primary" />
    <div className="w-12 h-[1px] bg-gradient-to-r from-primary to-transparent" />
    <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
  </div>
)

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', company: '', service: '', message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [activeMaps, setActiveMaps] = useState<{ [key: string]: boolean }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')
    setErrorMessage(null)

    try {
      const response = await api.post<ApiResponse<ContactFormResponse>>('/api/contact', formData as ContactFormRequest)
      if (response.success) {
        setStatus('success')
        setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', service: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setErrorMessage(response.error || 'Submission failed')
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Error submitting form')
    } finally {
      setIsSubmitting(false)
    }
  }

  const whatsapp = CONTACT_INFO_DISPLAY.offices[0].phone?.replace(/[^0-9]/g, '')

  return (
    <section className="relative py-24 md:py-40 bg-white overflow-hidden text-slate-900 border-t border-slate-100">
      {/* HUD Background Elements - Adjusted for Light Theme */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.3),transparent_40%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-slate-900 rounded-full scale-150" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-slate-900 rounded-full scale-110" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-20 xl:gap-32 items-start">

          {/* Left Column: Information Display */}
          <div className="space-y-16">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">Status: Systems Online</span>
              </div>
              <h2 className="text-[clamp(3.2rem,8vw,5.5rem)] font-black tracking-tighter leading-[0.9] uppercase text-slate-950">
                <BlurReveal>Connect</BlurReveal>
                <div className="text-slate-200"><BlurReveal delay={0.2}>Commander</BlurReveal></div>
              </h2>
              <p className="text-lg text-slate-500 max-w-lg font-medium leading-relaxed">
                Initiate protocols for digital expansion. Our technical consultants are standing by for deployment instructions.
              </p>
            </div>

            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-[11px] font-black tracking-[0.4em] text-slate-400 uppercase block">Global Headquarters</span>
                <div className="grid sm:grid-cols-2 gap-8">
                  {CONTACT_INFO_DISPLAY.offices.map((office) => (
                    <div key={office.city} className="group cursor-default">
                      <div className="p-6 rounded-[2rem] bg-slate-50/50 border border-slate-200 transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-primary/30 shadow-sm">
                        <div className="flex items-center gap-4 mb-3">
                          <MapPin className="w-5 h-5 text-primary" />
                          <h4 className="font-black text-sm tracking-widest uppercase text-slate-900">{office.city}</h4>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-bold">{office.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-12">
                <div className="space-y-4">
                  <span className="text-[11px] font-black tracking-[0.4em] text-slate-400 uppercase block">Terminal Link</span>
                  <a href={`mailto:${CONTACT_INFO_DISPLAY.email}`} className="text-lg font-black tracking-tight text-slate-950 hover:text-primary transition-colors uppercase border-b-2 border-slate-200 hover:border-primary/30 pb-1">
                    {CONTACT_INFO_DISPLAY.email}
                  </a>
                </div>
                <div className="space-y-4">
                  <span className="text-[11px] font-black tracking-[0.4em] text-slate-400 uppercase block">Social Channels</span>
                  <div className="flex gap-3">
                    {SOCIAL_LINKS.map((link, i) => {
                      const Icon = link.icon
                      return (
                        <Magnetic key={i}>
                          <a href={link.url} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all group shadow-sm">
                            <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </a>
                        </Magnetic>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission Control Form */}
          <div className="relative">
            <TechnicalAccent className="top-0 left-0 -mt-2 -ml-2" />
            <TechnicalAccent className="bottom-0 right-0 -mb-2 -mr-2 rotate-180" />

            <div className="bg-white border border-slate-200 rounded-[3rem] p-8 md:p-12 shadow-[0_40px_100px_-20px_rgba(15,23,42,0.12)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <div className="w-24 h-[1px] bg-slate-100" />
                <div className="w-[1px] h-24 bg-slate-100 absolute top-0 right-0" />
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-black tracking-tight uppercase mb-2 text-slate-950">Consultation Input</h3>
                <p className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Data Packet Submission Protocol v4.0</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1">Identity: First</label>
                    <input
                      type="text"
                      required
                      placeholder="ENTER NAME"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1">Identity: Last</label>
                    <input
                      type="text"
                      placeholder="OPTIONAL"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1">Transmission Channel (Email)</label>
                    <input
                      type="email"
                      required
                      placeholder="COMMAND@DOMAIN.COM"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1">Communication ID (Phone)</label>
                    <input
                      type="tel"
                      placeholder="+X XXX XXX XXXX"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1">Strategic Objective (Message)</label>
                  <textarea
                    required
                    placeholder="DESCRIBE MISSION PARAMETERS..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all min-h-[160px] resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 border border-green-100 text-green-600 text-[11px] font-black tracking-widest uppercase"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Dispatch Successful. Protocols Initialized.
                    </motion.div>
                  ) : status === 'error' ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-[11px] font-black tracking-widest uppercase"
                    >
                      <XCircle className="w-4 h-4" />
                      Transmission Failed: {errorMessage}
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Magnetic>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative flex-[2] bg-slate-950 text-white px-8 py-5 rounded-2xl font-black text-xs tracking-[0.3em] uppercase group overflow-hidden transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? 'PROCESSING...' : (
                          <>
                            Initiate Broadcast <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                  </Magnetic>
                  <Magnetic>
                    <a
                      href={`https://wa.me/${whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-8 py-5 rounded-2xl border-2 border-slate-200 font-black text-xs tracking-[0.2em] uppercase text-slate-950 hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all text-center flex items-center justify-center bg-white shadow-sm"
                    >
                      WhatsApp
                    </a>
                  </Magnetic>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Global Surveillance (Map View) */}
        <div className="mt-32 space-y-12">
          <div className="flex items-end justify-between border-b border-slate-200 pb-8">
            <div className="space-y-4">
              <span className="text-[11px] font-black tracking-[0.4em] text-slate-400 uppercase block">Spatial Coordinates</span>
              <h3 className="text-4xl font-black tracking-tight uppercase text-slate-950">Presence Mapping</h3>
            </div>
            <div className="hidden md:flex gap-4">
              <div className="flex gap-1 h-3">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-[1.5px] bg-slate-200 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {CONTACT_INFO_DISPLAY.offices.map((office, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/20 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[2px]" />
                <div className="relative bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] transition-shadow duration-500 hover:shadow-2xl hover:shadow-primary/5">
                  <div className="p-8 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                    <div>
                      <h4 className="text-2xl font-black tracking-tight uppercase text-slate-950">{office.city}</h4>
                      <p className="text-[9px] font-black tracking-[0.3em] text-primary/70 uppercase mt-1">Surveillance Active</p>
                    </div>
                    <Magnetic>
                      <a href={office.mapUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-slate-950 text-white flex items-center justify-center hover:bg-primary transition-all">
                        <ArrowRight className="w-5 h-5 -rotate-45" />
                      </a>
                    </Magnetic>
                  </div>
                  <div className="aspect-[16/9] w-full relative group/map overflow-hidden grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-[1s] border-b border-slate-200">
                    <iframe
                      title={`Mission Map ${office.city}`}
                      src={office.embedSrc}
                      width="100%"
                      height="100%"
                      // style={{ border: 0, pointerEvents: activeMaps[office.city] ? 'auto' : 'none' }}
                      allowFullScreen
                      loading="lazy"
                      className="transition-transform duration-[1s] "
                    />
                    {/* {!activeMaps[office.city] && (
                      <div
                        className="absolute inset-0 bg-black/5 backdrop-blur-[2px] cursor-pointer flex items-center justify-center group/overlay transition-all hover:bg-black/10"
                        onClick={() => setActiveMaps(prev => ({ ...prev, [office.city]: true }))}
                      >
                        <div className="bg-white/90 border border-slate-200 px-4 py-2 rounded-xl shadow-lg transform translate-y-4 opacity-0 group-hover/overlay:translate-y-0 group-hover/overlay:opacity-100 transition-all duration-300">
                          <span className="text-[10px] font-black tracking-widest uppercase text-slate-900">Click to Interact</span>
                        </div>
                      </div>
                    )} */}
                  </div>
                  <div className="p-8 grid grid-cols-2 gap-8 bg-white">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase block">Deployment Hub</span>
                      <p className="text-[11px] font-bold text-slate-600 leading-relaxed uppercase">{office.address}</p>
                    </div>
                    {office.phone && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase block">Voice Comms</span>
                        <p className="text-xl font-black tracking-tight text-slate-950">{office.phone}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}