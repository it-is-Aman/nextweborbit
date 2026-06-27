import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import FloatingButtons from '@/components/layout/floating-buttons'
import DigitalSection from '@/components/features/digital-marketing/digital-section'

export default function DigitalMarketingPage() {
    return (
        <main className="min-h-screen">
            <Header />
            <DigitalSection />
            <Footer />
            <FloatingButtons />
        </main>
    )
}
