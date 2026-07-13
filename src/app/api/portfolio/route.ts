import { NextResponse } from 'next/server'
import { getPortfolioItems } from '@/frontend/lib/hygraph'

const FALLBACK_PORTFOLIO = [
  {
    id: "1",
    category: "Web",
    title: "Traveller",
    description: "TrippyJiffy: Unlock India’s 4th Dimension of Travel and Discovery.",
    coverImage: { url: "https://trippyjiffy.com/assets/img%2017%20(1)-CmpkEblB.webp" },
    projectUrl: "https://trippyjiffy.com/",
  },
  {
    id: "2",
    category: "Web",
    title: "Personalized Training",
    description: "High-performance personalized training.",
    coverImage: { url: "https://optimyzlearning.com/static/media/mordernit.46e9fdf5b45689146e54.png" },
    projectUrl: "https://optimyzlearning.com/",
  },
  {
    id: "3",
    category: "Web",
    title: "Project Create a Better Future",
    description: "We specialize in two core areas backed by good engineering practices.",
    coverImage: { url: "https://www.smcsystem.com/achive4.jpg" },
    projectUrl: "https://www.smcsystem.com/",
  },
  {
    id: "4",
    category: "Web",
    title: "Yoga Fitness",
    description: "At YogSaathi, we believe Yoga is a way to bring balance and wellness.",
    coverImage: { url: "https://yogsaathi.com/assets/s4-DVhAxnJ7.jpg" },
    projectUrl: "https://yogsaathi.com/",
  },
  {
    id: "5",
    category: "Web",
    title: "Business Portfolio",
    description: "Committed to excellence and collaboration with leading organizations.",
    coverImage: { url: "https://aimascend.com/assets/banner-CqPTKrVa.jpg" },
    projectUrl: "https://aimascend.com/",
  },
  {
    id: "6",
    category: "Web",
    title: "Property",
    description: "Upcoming Infrastructure - Metro from Noida to Jewar Airport",
    coverImage: { url: "https://navkaarrealestate.com/uploads/1763447690689.webp" },
    projectUrl: "https://navkaarrealestate.com/",
  },
  {
    id: "7",
    category: "Web",
    title: "Astrology",
    description: "A reader will be distracted by readable content of a page.",
    coverImage: { url: "https://arvindrai.com/assets/about-BoRwXk-0.jpg" },
    projectUrl: "https://arvindrai.com/",
  },
  {
    id: "8",
    category: "Web",
    title: "Hotel",
    description: "Boundless comfort and refined elegance hospitality experience.",
    coverImage: { url: "https://avyantahotels.com/Hero.png" },
    projectUrl: "https://avyantahotels.com/",
  }
];

export async function GET() {
  try {
    const items = await getPortfolioItems()
    if (!items || items.length === 0) {
      return NextResponse.json({ success: true, items: FALLBACK_PORTFOLIO })
    }
    return NextResponse.json({ success: true, items })
  } catch (error) {
    console.error('Failed to get portfolio data:', error)
    return NextResponse.json({ success: true, items: FALLBACK_PORTFOLIO })
  }
}
