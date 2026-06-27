'use client'

import { Target, CircleDollarSign, Headset, Rocket } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    id: 'branding',
    title: 'Branding Excellence',
    description: 'We build strong brand identities that resonate with your audience and drive business growth through strategic design and marketing.',
    icon: Target
  },
  {
    id: 'cost',
    title: 'Cost Effective',
    description: 'Get maximum value with our competitive pricing and flexible payment options designed for businesses of all sizes.',
    icon: CircleDollarSign
  },
  {
    id: 'support',
    title: '24/7 Support',
    description: 'Our dedicated technical support team is available round the clock to ensure your systems run smoothly.',
    icon: Headset
  },
  {
    id: 'innovation',
    title: 'Innovation First',
    description: 'We leverage cutting-edge technologies to deliver solutions that keep you ahead of the competition.',
    icon: Rocket
  }
]

const WhyChooseUsSection = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden font-sans">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] opacity-90 mb-8 uppercase">
              Why Choose Us
            </h2>
            <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed text-muted-foreground max-w-xl">
              We deliver exceptional IT services that drive real business results and help you stay ahead in the digital landscape.
            </p>
          </div>
          <Link href="/contact" className="inline-block">
            <button className="px-10 py-5 bg-[#003B2A] text-white rounded-full font-bold hover:bg-[#002B20] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#003B2A]/10 whitespace-nowrap">
              Start Your Project
            </button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            // Define colors based on index with a smoother opacity-like gradient and glow effect
            const colors = [
              { bg: 'bg-[#003B2A]', text: 'text-white', icon: 'text-white', desc: 'text-white/80', shadow: 'shadow-[#003B2A]/40 hover:shadow-[#003B2A]/60' }, // 100% Intensity - Deep/Vibrant
              { bg: 'bg-[#155D48]', text: 'text-white', icon: 'text-white', desc: 'text-white/80', shadow: 'shadow-[#155D48]/40 hover:shadow-[#155D48]/60' }, // ~75% Intensity - Rich Green
              { bg: 'bg-[#2F8068]', text: 'text-white', icon: 'text-white', desc: 'text-white/80', shadow: 'shadow-[#2F8068]/40 hover:shadow-[#2F8068]/60' }, // ~50% Intensity - Soft Teal/Green
              { bg: 'bg-[#E3F2EF]', text: 'text-[#003B2A]', icon: 'text-[#003B2A]', desc: 'text-[#003B2A]/70', shadow: 'shadow-[#2F8068]/10 hover:shadow-[#2F8068]/20' } // Lightest - More visible Mint
            ][index] || { bg: 'bg-gray-50', text: 'text-gray-900', icon: 'text-primary', desc: 'text-gray-500', shadow: 'shadow-gray-100' }

            return (
              <div
                key={feature.id}
                className={`flex flex-col p-8 rounded-[2.5rem] transition-all duration-500 group relative overflow-hidden ${colors.bg} ${colors.text} ${colors.shadow} shadow-lg hover:shadow-2xl`}
              >
                <div className="mb-6 transition-transform duration-500 group-hover:scale-110">
                  <feature.icon className={`w-12 h-12 stroke-[1.5] ${colors.icon}`} />
                </div>

                <h3 className="text-2xl font-black leading-none mb-4">
                  {feature.title}
                </h3>

                <p className={`mb-6 text-lg font-light opacity-80 leading-relaxed ${colors.desc}`}>
                  {feature.description}
                </p>

              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection