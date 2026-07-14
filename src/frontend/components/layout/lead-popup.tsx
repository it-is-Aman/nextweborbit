'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Phone, Mail, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import { api } from '@/frontend/lib/api-client'
import type { ApiResponse } from '@/types/api'

interface ContactFormResponse {
  message: string
  submissionId: string | null
}

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [apiError, setApiError] = useState<string | null>(null)

  useEffect(() => {
    // Check if the user has already dismissed or submitted the popup
    const popupStatus = localStorage.getItem('nextweborbit_lead_popup_status')
    if (!popupStatus) {
      // Show the popup after 2 seconds delay for a better user experience
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('nextweborbit_lead_popup_status', 'dismissed')
  }

  const validate = () => {
    const newErrors: typeof errors = {}
    if (!name.trim()) {
      newErrors.name = 'Name is required'
    }

    const cleanPhone = phone.replace(/\D/g, '')
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits'
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setApiError(null)

    const cleanPhone = phone.replace(/\D/g, '')

    try {
      // Mapping the 3 fields to match contact schema requirements
      const response = await api.post<ApiResponse<ContactFormResponse>>('/api/contact', {
        firstName: name.trim(),
        lastName: '',
        email: email.trim().toLowerCase(),
        phone: cleanPhone,
        company: 'Popup Lead',
        service: 'Free Quote Request',
        message: 'Lead submission from homepage popup. Please follow up on this query.'
      })

      if (response.success) {
        setSubmitStatus('success')
        localStorage.setItem('nextweborbit_lead_popup_status', 'submitted')
        // Automatically close the popup after 2.5 seconds
        setTimeout(() => {
          setIsOpen(false)
        }, 2500)
      } else {
        setSubmitStatus('error')
        setApiError(response.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setSubmitStatus('error')
      setApiError(err instanceof Error ? err.message : 'Connection error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
          >
            {/* Left Section: Image Side */}
            <div className="w-full md:w-1/2 relative min-h-[220px] md:min-h-[480px] bg-slate-900 flex flex-col justify-end p-8 text-white">
              <Image
                src="/images/company/our-portfolio.png"
                alt="About NextWebOrbit"
                fill
                className="object-cover opacity-60"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent pointer-events-none" />

              {/* Tag / Pill */}
              <span className="absolute top-6 left-6 px-4 py-1.5 bg-[#FF6A00] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg z-10">
                Exclusive Offer
              </span>

              {/* Content Overlay */}
              <div className="relative z-10 space-y-2">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight uppercase">
                  Scale Your Business Online
                </h3>
                <p className="text-sm text-slate-300 font-medium leading-relaxed">
                  Get a customized digital strategy & project quote instantly!
                </p>
              </div>
            </div>

            {/* Right Section: Form Side */}
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center relative bg-white text-slate-900">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer z-20"
                aria-label="Close popup"
              >
                <X className="w-4 h-4" />
              </button>

              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center space-y-4 py-8"
                >
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-950 uppercase">Thank You!</h4>
                  <p className="text-sm text-slate-500 font-medium max-w-xs">
                    Your request has been submitted successfully. Our team will get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <div className="flex flex-col justify-center h-full">
                  {/* Top Notification Pill */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-[#E01A5F] text-[11px] font-bold w-fit mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#E01A5F] animate-pulse" />
                    148 Businesses Growing With Us This Week
                  </div>

                  {/* Heading */}
                  <h4 className="text-2xl md:text-3xl font-black text-slate-950 leading-tight mb-2 uppercase">
                    Unlock Free Growth Audit
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mb-6">
                    Just 10 seconds to fill. No spam, promise.
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div className="space-y-1">
                      <div className={`flex items-center gap-3 px-4 py-3 bg-slate-50/50 border ${errors.name ? 'border-rose-500' : 'border-slate-200 focus-within:border-[#0072F5]'} rounded-2xl transition-all`}>
                        <User className="w-4 h-4 text-slate-400 shrink-0" />
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value)
                            if (errors.name) setErrors(prev => ({ ...prev, name: undefined }))
                          }}
                          className="w-full bg-transparent border-none outline-none text-sm text-slate-800 placeholder-slate-400"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-[10px] text-rose-500 font-bold ml-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-1">
                      <div className={`flex items-center gap-3 px-4 py-3 bg-slate-50/50 border ${errors.phone ? 'border-rose-500' : 'border-slate-200 focus-within:border-[#0072F5]'} rounded-2xl transition-all`}>
                        <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                        <input
                          type="tel"
                          placeholder="Phone Number (10 Digits)"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value)
                            if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }))
                          }}
                          className="w-full bg-transparent border-none outline-none text-sm text-slate-800 placeholder-slate-400"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-[10px] text-rose-500 font-bold ml-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1">
                      <div className={`flex items-center gap-3 px-4 py-3 bg-slate-50/50 border ${errors.email ? 'border-rose-500' : 'border-slate-200 focus-within:border-[#0072F5]'} rounded-2xl transition-all`}>
                        <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            if (errors.email) setErrors(prev => ({ ...prev, email: undefined }))
                          }}
                          className="w-full bg-transparent border-none outline-none text-sm text-slate-800 placeholder-slate-400"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-[10px] text-rose-500 font-bold ml-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-[#FF6A00] hover:bg-[#E05B00] disabled:bg-slate-300 text-white font-extrabold text-sm uppercase rounded-2xl transition-all shadow-[0_8px_30px_rgba(255,106,0,0.3)] hover:shadow-[0_8px_35px_rgba(255,106,0,0.45)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] select-none"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Get Free Proposal Now'
                      )}
                    </button>

                    {submitStatus === 'error' && (
                      <p className="text-xs text-rose-500 font-bold text-center mt-2 flex items-center justify-center gap-1.5">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {apiError || 'Submission failed. Please try again.'}
                      </p>
                    )}
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
