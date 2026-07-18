'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Building, Globe, Server, Send, ArrowRight, CheckCircle2, XCircle, RotateCw, ChevronDown } from 'lucide-react'
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
      embedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5591.579581311327!2d77.36272873868431!3d28.608214771747306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce565fcf639e7%3A0x677c4d7bd48136!2sSector%2059%2C%20Noida%2C%20Uttar%20Pradesh%20201309!5e1!3m2!1sen!2sin!4v1780131966085!5m2!1sen!2sin'
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [activeMaps, setActiveMaps] = useState<{ [key: string]: boolean }>({})

  const [captchaCode, setCaptchaCode] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaError, setCaptchaError] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateCaptcha = () => {
    const chars = '23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
    let code = ''
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaCode(code)
    setCaptchaInput('')
    setCaptchaError(false)
  }

  const drawCaptcha = (code: string) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    bgGradient.addColorStop(0, '#f8fafc')
    bgGradient.addColorStop(1, '#f1f5f9')
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#e2e8f0'
    ctx.lineWidth = 1
    ctx.strokeRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = 'rgba(203, 213, 225, 0.4)'
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 15) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    const lineColors = ['#94a3b8', '#cbd5e1', '#0072F5', '#f43f5e', '#10b981']
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = lineColors[Math.floor(Math.random() * lineColors.length)]
      ctx.lineWidth = Math.random() * 1.5 + 1
      ctx.beginPath()
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.bezierCurveTo(
        Math.random() * canvas.width, Math.random() * canvas.height,
        Math.random() * canvas.width, Math.random() * canvas.height,
        Math.random() * canvas.width, Math.random() * canvas.height
      )
      ctx.stroke()
    }

    ctx.textBaseline = 'middle'
    const fontFamilies = ['Arial', 'Verdana', 'Georgia', 'Courier New', 'Times New Roman']
    
    const charSpacing = canvas.width / (code.length + 1)
    for (let i = 0; i < code.length; i++) {
      const char = code[i]
      const fontSize = Math.floor(Math.random() * 6) + 22
      const fontFamily = fontFamilies[Math.floor(Math.random() * fontFamilies.length)]
      ctx.font = `bold ${fontSize}px ${fontFamily}`
      
      const textColors = [
        '#0f172a',
        '#1e293b',
        '#0072F5',
        '#4f46e5',
        '#0891b2',
        '#c026d3',
        '#2563eb',
      ]
      ctx.fillStyle = textColors[Math.floor(Math.random() * textColors.length)]

      const x = charSpacing * (i + 1) - 5 + (Math.random() * 6 - 3)
      const y = canvas.height / 2 + (Math.random() * 8 - 4)

      ctx.save()
      ctx.translate(x, y)
      const rotationAngle = (Math.random() * 40 - 20) * Math.PI / 180
      ctx.rotate(rotationAngle)
      ctx.fillText(char, 0, 0)
      ctx.restore()
    }

    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = 'rgba(148, 163, 184, 0.4)'
      ctx.beginPath()
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 1.5 + 0.5, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  useEffect(() => {
    if (captchaCode) {
      drawCaptcha(captchaCode)
    }
  }, [captchaCode])

  useEffect(() => {
    generateCaptcha()
  }, [])

  const hasHtmlOrScript = (val: string) => {
    const hasHtml = /<[^>]*>/g.test(val)
    const hasScript = /(javascript:|onload=|onerror=|script)/gi.test(val)
    return hasHtml || hasScript
  }

  const validateField = (name: string, value: string) => {
    let error = ''
    if (name === 'firstName') {
      if (!value.trim()) {
        error = 'First name is required'
      } else if (value.length > 50) {
        error = 'First name cannot exceed 50 characters'
      } else if (hasHtmlOrScript(value)) {
        error = 'HTML or scripts are not allowed'
      }
    } else if (name === 'lastName') {
      if (value && value.length > 50) {
        error = 'Last name cannot exceed 50 characters'
      } else if (value && hasHtmlOrScript(value)) {
        error = 'HTML or scripts are not allowed'
      }
    } else if (name === 'email') {
      if (!value.trim()) {
        error = 'Email address is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Invalid email address'
      }
    } else if (name === 'phone') {
      if (!value.trim()) {
        error = 'Phone number is required'
      } else if (!/^[0-9]{10}$/.test(value)) {
        error = 'Phone number must be exactly 10 digits'
      }
    } else if (name === 'company') {
      if (value && value.length > 100) {
        error = 'Company name cannot exceed 100 characters'
      } else if (value && hasHtmlOrScript(value)) {
        error = 'HTML or scripts are not allowed'
      }
    } else if (name === 'service') {
      if (!value.trim()) {
        error = 'Please select a service'
      } else if (value.length > 100) {
        error = 'Service name cannot exceed 100 characters'
      } else if (hasHtmlOrScript(value)) {
        error = 'HTML or scripts are not allowed'
      }
    } else if (name === 'message') {
      if (!value.trim()) {
        error = 'Message is required'
      } else if (value.length < 10) {
        error = 'Message must be at least 10 characters'
      } else if (value.length > 1000) {
        error = 'Message cannot exceed 1000 characters'
      } else if (hasHtmlOrScript(value)) {
        error = 'HTML or scripts are not allowed'
      }
    }
    setErrors(prev => ({ ...prev, [name]: error }))
    return error
  }

  const validateForm = () => {
    const e1 = validateField('firstName', formData.firstName)
    const e2 = validateField('lastName', formData.lastName || '')
    const e3 = validateField('email', formData.email)
    const e4 = validateField('phone', formData.phone)
    const e5 = validateField('company', formData.company || '')
    const e6 = validateField('service', formData.service || '')
    const e7 = validateField('message', formData.message)
    return !(e1 || e2 || e3 || e4 || e5 || e6 || e7)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setStatus('error')
      setErrorMessage('Please fix the validation errors in the form.')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')
    setErrorMessage(null)

    if (captchaInput.toLowerCase() !== captchaCode.toLowerCase()) {
      setCaptchaError(true)
      setStatus('error')
      setErrorMessage('Incorrect verification code.')
      setIsSubmitting(false)
      generateCaptcha()
      return
    }
    setCaptchaError(false)

    try {
      const response = await api.post<ApiResponse<ContactFormResponse>>('/api/contact', formData as ContactFormRequest)
      if (response.success) {
        setStatus('success')
        setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', service: '', message: '' })
        setErrors({})
        generateCaptcha()
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setErrorMessage(response.error || 'Submission failed')
        generateCaptcha()
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Error submitting form')
      generateCaptcha()
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
                <div className="w-1.5 h-1.5 rounded-full bg-[#0072F5] animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#0072F5]">Available for Projects</span>
              </div>
              <h2 className="text-[clamp(3.2rem,8vw,5.5rem)] font-black tracking-tighter leading-[0.9] uppercase text-slate-950">
                <BlurReveal>Get in</BlurReveal>
                <div className="text-[#0072F5]"><BlurReveal delay={0.2}>Touch</BlurReveal></div>
              </h2>
              <p className="text-lg text-slate-500 max-w-lg font-medium leading-relaxed">
                Have a project in mind or need technical support? Contact us today to discuss how we can help your business grow.
              </p>
            </div>

            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-[11px] font-black tracking-[0.4em] text-slate-400 uppercase block">Our Noida Office</span>
                <div className="grid sm:grid-cols-2 gap-8">
                  {CONTACT_INFO_DISPLAY.offices.map((office) => (
                    <div key={office.city} className="group cursor-default">
                      <div className="p-6 rounded-[2rem] bg-slate-50/50 border border-slate-200 transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-[#0072F5]/30 shadow-sm">
                        <div className="flex items-center gap-4 mb-3">
                          <MapPin className="w-5 h-5 text-[#0072F5]" />
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
                  <span className="text-[11px] font-black tracking-[0.4em] text-slate-400 uppercase block">Direct Email</span>
                  <a href={`mailto:${CONTACT_INFO_DISPLAY.email}`} className="text-lg font-black tracking-tight text-slate-950 hover:text-[#0072F5] transition-colors uppercase border-b-2 border-slate-200 hover:border-[#0072F5]/30 pb-1">
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
                <h3 className="text-2xl font-black tracking-tight uppercase mb-2 text-slate-950">Send a Message</h3>
                <p className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">We typically reply within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase ml-1">
                    First Name <span className="text-red-500">*</span> :
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter First Name"
                    className={`w-full bg-slate-50 border ${errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-[#0072F5]'} rounded-2xl px-6 py-4 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#0072F5]/5 transition-all`}
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData({ ...formData, firstName: e.target.value })
                      validateField('firstName', e.target.value)
                    }}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase ml-1">
                    Last Name (Optional) :
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    className={`w-full bg-slate-50 border ${errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-[#0072F5]'} rounded-2xl px-6 py-4 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#0072F5]/5 transition-all`}
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData({ ...formData, lastName: e.target.value })
                      validateField('lastName', e.target.value)
                    }}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.lastName}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase ml-1">
                    Email ID <span className="text-red-500">*</span> :
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Please Enter Email ID"
                    className={`w-full bg-slate-50 border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-[#0072F5]'} rounded-2xl px-6 py-4 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#0072F5]/5 transition-all`}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      validateField('email', e.target.value)
                    }}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase ml-1">
                    Contact No <span className="text-red-500">*</span> :
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter Contact Number"
                    className={`w-full bg-slate-50 border ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-[#0072F5]'} rounded-2xl px-6 py-4 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#0072F5]/5 transition-all`}
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value })
                      validateField('phone', e.target.value)
                    }}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.phone}</p>
                  )}
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase ml-1">
                    Company Name (Optional) :
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Company Name"
                    className={`w-full bg-slate-50 border ${errors.company ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-[#0072F5]'} rounded-2xl px-6 py-4 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#0072F5]/5 transition-all`}
                    value={formData.company}
                    onChange={(e) => {
                      setFormData({ ...formData, company: e.target.value })
                      validateField('company', e.target.value)
                    }}
                  />
                  {errors.company && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.company}</p>
                  )}
                </div>

                {/* Select Services */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase ml-1">
                    Select Services <span className="text-red-500">*</span> :
                  </label>
                  <div className="relative">
                    <select
                      required
                      className={`w-full bg-slate-50 border ${errors.service ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-[#0072F5]'} rounded-2xl px-6 py-4 text-sm font-black focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#0072F5]/5 transition-all appearance-none cursor-pointer pr-12 ${formData.service ? 'text-slate-900' : 'text-slate-400'}`}
                      value={formData.service}
                      onChange={(e) => {
                        setFormData({ ...formData, service: e.target.value })
                        validateField('service', e.target.value)
                      }}
                    >
                      <option value="">Select a service</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Software Development">Software Development</option>
                      <option value="SEO & Digital Marketing">SEO & Digital Marketing</option>
                      <option value="IT Support & Services">IT Support & Services</option>
                      <option value="Other">Other / Custom Request</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                  {errors.service && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.service}</p>
                  )}
                </div>

                {/* Your Message */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase ml-1">
                    Write Your Inquiry <span className="text-red-500">*</span> (In Brief) :
                  </label>
                  <textarea
                    required
                    placeholder="Enter Query"
                    className={`w-full bg-slate-50 border ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-[#0072F5]'} rounded-2xl px-6 py-5 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#0072F5]/5 transition-all min-h-[140px] resize-none`}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value })
                      validateField('message', e.target.value)
                    }}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.message}</p>
                  )}
                </div>

                {/* Verification Code Captcha */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase ml-1">
                    Enter Verification Code <span className="text-red-500">*</span> :
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                    <input
                      type="text"
                      required
                      placeholder="Enter Verification Code"
                      className={`flex-1 bg-slate-50 border ${captchaError ? 'border-red-500 focus:border-red-500 ring-4 ring-red-500/5' : 'border-slate-200 focus:border-[#0072F5]'} rounded-2xl px-6 py-4 text-sm font-black text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#0072F5]/5 transition-all`}
                      value={captchaInput}
                      onChange={(e) => {
                        setCaptchaInput(e.target.value)
                        setCaptchaError(false)
                      }}
                    />
                    <div className="flex items-center gap-3">
                      {/* Captcha Canvas */}
                      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center p-1 select-none shadow-sm">
                        <canvas ref={canvasRef} width="130" height="48" className="block cursor-pointer" onClick={generateCaptcha} title="Click to refresh" />
                      </div>
                      {/* Refresh Button */}
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-200 hover:border-red-500 text-red-500 hover:text-red-600 hover:bg-red-50/50 transition-colors shadow-sm cursor-pointer"
                        title="Refresh Verification Code"
                      >
                        <RotateCw className="w-5 h-5 transition-transform active:rotate-180 duration-300" />
                      </button>
                    </div>
                  </div>
                  {captchaError && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">
                      Incorrect verification code. Please try again.
                    </p>
                  )}
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

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-2">
                  <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase self-start sm:self-center">
                    <span className="text-red-500">*</span> Fields Are Mandatory
                  </span>
                  
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative bg-slate-950 text-white px-8 py-5 rounded-2xl font-black text-xs tracking-[0.3em] uppercase group overflow-hidden transition-all active:scale-[0.98] disabled:opacity-50 min-w-[160px] w-full sm:w-auto"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          {isSubmitting ? 'SENDING...' : (
                            <>
                              Submit <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                          )}
                        </span>
                        <div className="absolute inset-0 bg-[#0072F5] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      </button>
                    </Magnetic>
                    
                    <Magnetic>
                      <a
                        href={`https://wa.me/${whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-5 rounded-2xl border-2 border-slate-200 font-black text-xs tracking-[0.2em] uppercase text-slate-950 hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all text-center flex items-center justify-center bg-white shadow-sm w-full sm:w-auto"
                      >
                        WhatsApp
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Global Presence Map (Map View) */}
        <div className="mt-32 space-y-12">
          <div className="flex items-end justify-between border-b border-slate-200 pb-8">
            <div className="space-y-4">
              <span className="text-[11px] font-black tracking-[0.4em] text-slate-400 uppercase block">Office Location</span>
              <h3 className="text-4xl font-black tracking-tight uppercase text-slate-950">Find Us on the Map</h3>
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
                <div className="absolute -inset-[1px] bg-gradient-to-br from-[#0072F5]/20 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[2px]" />
                <div className="relative bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#0072F5]/5">
                  <div className="p-8 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                    <div>
                      <h4 className="text-2xl font-black tracking-tight uppercase text-slate-950">{office.city}</h4>
                      <p className="text-[9px] font-black tracking-[0.3em] text-[#0072F5]/70 uppercase mt-1">Office Location</p>
                    </div>
                    <Magnetic>
                      <a href={office.mapUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-slate-950 text-white flex items-center justify-center hover:bg-[#0072F5] transition-all">
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
                  </div>
                  <div className="p-8 grid grid-cols-2 gap-8 bg-white">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase block">Address</span>
                      <p className="text-[11px] font-bold text-slate-600 leading-relaxed uppercase">{office.address}</p>
                    </div>
                    {office.phone && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase block">Phone Number</span>
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