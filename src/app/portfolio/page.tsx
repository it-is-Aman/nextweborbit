import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import FloatingButtons from '@/components/layout/floating-buttons'
import PortfolioSection from '@/components/features/portfolio/portfolio-section'

export default function PortfolioPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <PortfolioSection />
      <Footer />
      <FloatingButtons />
    </main>
  )
}

