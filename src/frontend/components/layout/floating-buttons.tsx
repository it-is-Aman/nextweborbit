'use client'

import Link from 'next/link'
import { MessageCircle, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { CONTACT_INFO } from '@/constants'

const FloatingButtons = () => {
  const whatsappNumber = CONTACT_INFO.phone[0]?.value.replace(/[^0-9]/g, '') || '+91-8588900105'

  return (
    <>
      {/* WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 w-[clamp(3.5rem,6vw,4rem)] h-[clamp(3.5rem,6vw,4rem)] bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] z-[100] overflow-hidden group"
        aria-label="WhatsApp"
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
        <motion.div
          animate={{ rotate: [0, 8, -8, 8, -8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
          className="relative z-10 w-3/5 h-3/5"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full drop-shadow-md"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 1.1 1.1 0 0 1 1.1 1.1h0a1.1 1.1 0 0 1-1.1 1.1A6.3 6.3 0 1 0 17.5 14a1.1 1.1 0 1 1 2.2 0c0 .5-.1 1-.3 1.5M16 8l-2 2h0m0 0l-1 1h0m2-1c.5-.5 1-1 1-2a2 2 0 1 0-4 0c0 1 .5 1.5 1 2s1 1 1 1.5.5.5 1 .5 1-.5 1-1z"
              className="hidden" // Just a fallback, better to use a real path
            />
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.032c0 2.12.554 4.189 1.605 6.006L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.635 0 12.032-5.396 12.035-12.032a11.762 11.762 0 00-3.418-8.481"
              fill="white"
              stroke="none"
            />
          </svg>
        </motion.div>
      </motion.a>

      {/* whatsapp contact button */}
      <motion.div
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[100]"
      >
        <Link
          href="/contact"
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-8 rounded-l-lg shadow-lg flex flex-col items-center justify-center gap-2 min-h-[120px]"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Phone className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" />
          </motion.div>
          <span className="text-[clamp(0.65rem,1.5vw,0.75rem)] font-semibold" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            Contact Us
          </span>
        </Link>
      </motion.div>
    </>
  )
}

export default FloatingButtons

