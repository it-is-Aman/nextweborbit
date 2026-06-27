// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import Image from 'next/image'
// import { Button } from '@/components/ui/button'
// import { motion, AnimatePresence } from 'framer-motion'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { ArrowUpRight, ChevronDown, AlertCircle } from 'lucide-react'
// import type { PortfolioItem as PortfolioItemType, ApiResponse, PortfolioResponse } from '@/types/api'
// import { api } from '@/frontend/lib/api-client'

// gsap.registerPlugin(ScrollTrigger)

// type Category = 'Our Product' | 'Website' | 'Application'
// const categories: Category[] = ['Our Product', 'Website', 'Application']

// // Fetch portfolio items from API
// async function fetchPortfolioItems(): Promise<PortfolioItemType[]> {
//   try {
//     const response = await api.get<ApiResponse<PortfolioResponse>>(`/api/portfolio?t=${Date.now()}`)
//     if (response.success && response.data) {
//       return response.data.items
//     }
//     throw new Error('Invalid response format')
//   } catch (error) {
//     console.error('Error fetching portfolio items:', error)
//     throw error
//   }
// }

// const PortfolioSection = () => {
//   const [selectedCategory, setSelectedCategory] = useState<Category>('Our Product')
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [portfolioItems, setPortfolioItems] = useState<PortfolioItemType[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const containerRef = useRef<HTMLDivElement>(null)
//   const itemsRef = useRef<HTMLDivElement>(null)

//   // Fetch portfolio items on mount
//   useEffect(() => {
//     const loadPortfolioItems = async () => {
//       try {
//         setIsLoading(true)
//         setError(null)
//         const items = await fetchPortfolioItems()
//         setPortfolioItems(items)
//       } catch {
//         setError('Failed to load portfolio items. Please try again.')
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     loadPortfolioItems()
//   }, [])

//   const filteredItems = portfolioItems.filter(item =>
//     item.type === selectedCategory
//   )

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Header Animation
//       gsap.fromTo('.portfolio-header',
//         { y: 50, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.portfolio-header' } }
//       )

//       // Filter Animation
//       gsap.fromTo('.filter-btn',
//         { y: 20, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)', scrollTrigger: { trigger: '.filter-container' } }
//       )

//     }, containerRef)

//     return () => ctx.revert()
//   }, [])

//   // Animate items when filter changes
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.fromTo('.portfolio-item',
//         { y: 50, opacity: 0, scale: 0.9 },
//         {
//           y: 0,
//           opacity: 1,
//           scale: 1,
//           duration: 0.6,
//           stagger: 0.05,
//           ease: 'power3.out',
//           clearProps: 'all' // Clear props to allow hover effects to work cleanly
//         }
//       )
//     }, itemsRef)

//     return () => ctx.revert()
//   }, [selectedCategory])

//   return (
//     <section ref={containerRef} className="min-h-screen bg-background py-24 px-4 md:px-8 overflow-hidden">
//       <div className="container mx-auto max-w-[1600px]">

//         {/* Header */}
//         <div className="portfolio-header flex flex-col md:flex-row items-center md:items-end justify-between mb-8 md:mb-16 gap-6 md:gap-8 text-center md:text-left">
//           <div className="space-y-2 md:space-y-4 w-full">
//             <span className="text-primary font-bold text-sm md:text-lg mb-1 md:mb-2 block tracking-wide uppercase">Selected Works</span>
//             <h1 className="text-[clamp(2.5rem,10vw,8rem)] font-black tracking-tighter leading-[0.8] opacity-90 mb-4 md:mb-8 uppercase text-foreground">Our Portfolio</h1>
//           </div>
//           <p className="text-base md:text-xl font-light opacity-80 leading-relaxed text-muted-foreground max-w-md mx-auto md:mx-0">
//             Explore our diverse collection of digital solutions, crafted with precision and creativity.
//           </p>
//         </div>

//         {/* Mobile Dropdown Filter */}
//         <div className="md:hidden mb-8 relative z-50">
//           <button
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             className="w-full max-w-[200px] px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 bg-foreground text-background flex items-center justify-between mx-auto"
//           >
//             <span>
//               {selectedCategory}
//             </span>
//             <motion.div
//               animate={{ rotate: isDropdownOpen ? 180 : 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <ChevronDown size={20} />
//             </motion.div>
//           </button>

//           <AnimatePresence>
//             {isDropdownOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.2 }}
//                 className="absolute top-full mt-2 w-full bg-background border border-border rounded-2xl shadow-lg overflow-hidden z-50"
//               >
//                 {categories.map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => {
//                       setSelectedCategory(category)
//                       setIsDropdownOpen(false)
//                     }}
//                     className={`w-full px-5 py-3 text-left text-sm font-medium transition-all duration-200 ${selectedCategory === category
//                       ? 'bg-foreground text-background'
//                       : 'bg-background text-foreground hover:bg-muted'
//                       }`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Desktop Navigation Tabs */}
//         <div className="filter-container hidden md:flex flex-wrap gap-4 mb-16">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`filter-btn px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${selectedCategory === category
//                 ? 'bg-foreground text-background border-foreground'
//                 : 'bg-transparent text-foreground border-border hover:border-blue-600 hover:bg-blue-600 hover:text-white'
//                 }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* Portfolio Grid */}
//         {isLoading ? (
//           <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {[...Array(8)].map((_, index) => (
//               <div key={index} className="bg-muted/30 rounded-2xl overflow-hidden border border-border/50 animate-pulse">
//                 <div className="aspect-[4/3] bg-muted/50" />
//                 <div className="p-6 space-y-4">
//                   <div className="h-4 bg-muted/50 rounded w-1/3" />
//                   <div className="h-6 bg-muted/50 rounded w-2/3" />
//                   <div className="h-4 bg-muted/50 rounded w-full" />
//                   <div className="h-4 bg-muted/50 rounded w-5/6" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : error ? (
//           <div className="text-center py-24">
//             <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
//             <p className="text-muted-foreground text-lg mb-6">{error}</p>
//             <Button
//               onClick={() => window.location.reload()}
//               className="bg-foreground text-background hover:bg-foreground/90"
//             >
//               Retry
//             </Button>
//           </div>
//         ) : (
//           <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredItems.map((item, index) => (
//               <div
//                 key={item.id}
//                 className="portfolio-item group relative bg-[#0a0a0a] rounded-[2rem] p-4 overflow-hidden border border-white/5 hover:border-white/10 transition-colors duration-500 flex flex-col h-full noise-bg shadow-2xl"
//               >
//                 {/* Image Container */}
//                 <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] mb-6">
//                   <div className="absolute top-4 left-4 z-20">
//                     <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
//                       <div className="w-1.5 h-1.5 rounded-full bg-white shadow-glow"></div>
//                     </div>
//                   </div>
//                   <Image
//                     src={item.imageUrl || item.preview}
//                     alt={item.name}
//                     fill
//                     className="object-cover transition-transform duration-700 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>

//                 {/* Content */}
//                 <div className="px-2 pb-2 flex flex-col flex-grow relative z-10">
//                   <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter mb-2 truncate">
//                     {item.name}
//                   </h3>

//                   <p className="text-xs sm:text-sm font-medium text-gray-500 line-clamp-2 mb-6 sm:mb-8 max-w-[95%]">
//                     {item.description}
//                   </p>

//                   <div className="mt-auto flex items-end justify-between">
//                     <Button
//                       className="bg-white text-black hover:bg-gray-200 rounded-xl px-6 py-6 font-bold tracking-wide uppercase text-xs flex items-center gap-2 transition-colors"
//                       onClick={() => window.open(item.projectLink || item.preview, '_blank')}
//                     >
//                       Discover Service
//                       <ArrowUpRight className="w-4 h-4 ml-1" />
//                     </Button>

//                     {/* Watermark Number */}
//                     <span className="text-7xl font-black text-[#151515] select-none leading-none -mb-3 -mr-3 tracking-tighter">
//                       {(index + 1).toString().padStart(2, '0')}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Empty State */}
//         {!isLoading && !error && filteredItems.length === 0 && (
//           <div className="text-center py-24">
//             <p className="text-muted-foreground text-lg">No projects found in this category.</p>
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }

// export default PortfolioSection


'use client'

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const portfolioData = [
  {
    id: 1,
    category: "Web",
    title: "Traveller",
    desc: "TrippyJiffy: Unlock India’s 4th Dimension of Travel and Discovery.",
    img: "https://trippyjiffy.com/assets/img%2017%20(1)-CmpkEblB.webp",
    url: "https://trippyjiffy.com/",
  },
  {
    id: 2,
    category: "Web",
    title: "Personalized Training",
    desc: "High-performance personalized training.",
    img: "https://optimyzlearning.com/static/media/mordernit.46e9fdf5b45689146e54.png",
    url: "https://optimyzlearning.com/",
  },
  {
    id: 3,
    category: "Web",
    title: "Project Create a Better Future",
    desc:
      "We specialize in two core areas backed by good engineering practices.",
    img: "https://www.smcsystem.com/achive4.jpg",
    url: "https://www.smcsystem.com/",
  },
  {
    id: 4,
    category: "Web",
    title: "Yoga Fitness",
    desc:
      "At YogSaathi, we believe Yoga is a way to bring balance and wellness.",
    img: "https://yogsaathi.com/assets/s4-DVhAxnJ7.jpg",
    url: "https://yogsaathi.com/",
  },
  {
    id: 5,
    category: "Web",
    title: "Business Portfolio",
    desc:
      "Committed to excellence and collaboration with leading organizations.",
    img: "https://aimascend.com/assets/banner-CqPTKrVa.jpg",
    url: "https://aimascend.com/",
  },
  {
    id: 6,
    category: "Web",
    title: "Property",
    desc: "Upcoming Infrastructure - Metro from Noida to Jewar Airport",
    img: "https://navkaarrealestate.com/uploads/1763447690689.webp",
    url: "https://navkaarrealestate.com/",
  },
  {
    id: 7,
    category: "Web",
    title: "Astrology",
    desc: "A reader will be distracted by readable content of a page.",
    img: "https://arvindrai.com/assets/about-BoRwXk-0.jpg",
    url: "https://arvindrai.com/",
  },
  {
    id: 8,
    category: "Web",
    title: "Hotel",
    desc: "Boundless comfort and refined elegance hospitality experience.",
    img: "https://avyantahotels.com/Hero.png",
    url: "https://avyantahotels.com/",
  },
]

const PortfolioSection = () => {

  const [selectedCategory] = useState("Web")
  const containerRef = useRef(null)

  useEffect(() => {

    const ctx = gsap.context(() => {

      gsap.fromTo(".portfolio-header",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )

      gsap.fromTo(".portfolio-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: .6,
          stagger: .1
        }
      )

    }, containerRef)

    return () => ctx.revert()

  }, [])

  const filteredItems = portfolioData.filter(
    item => item.category === selectedCategory
  )

  return (

    <section ref={containerRef} className="py-24 px-6 bg-black">

      <div className="max-w-[1400px] mx-auto">

        <div className="portfolio-header mb-16 text-center">

          <p className="text-blue-500 font-semibold mb-4">
            Selected Works
          </p>

          <h2 className="text-6xl font-black text-white uppercase">
            Our Portfolio
          </h2>

        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredItems.map((item, index) => (

            <div
              key={item.id}
              className="portfolio-item group bg-[#0a0a0a] rounded-3xl p-4 border border-white/10 hover:border-white/20 transition"
            >

              <div className="relative h-[240px] rounded-2xl overflow-hidden mb-6">

                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />

              </div>


              <h3 className="text-2xl font-bold text-white mb-2">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm mb-6">
                {item.desc}
              </p>


              <Button
                className="bg-white text-black hover:bg-gray-200"
                onClick={() => window.open(item.url)}
              >

                Discover Service
                <ArrowUpRight className="ml-2 w-4 h-4" />

              </Button>


              <span className="text-[70px] font-black text-[#151515] float-right -mt-10">
                {(index + 1).toString().padStart(2, "0")}
              </span>

            </div>

          ))}

        </div>

      </div>

    </section>

  )
}

export default PortfolioSection
