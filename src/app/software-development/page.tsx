import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import FloatingButtons from '@/components/layout/floating-buttons'
import SoftwareDevelopmentSection from '@/components/features/software-development/software-development-section'

export default function SoftwareDevelopmentPage() {
    return (
        <main className="min-h-screen">
            <Header />
            <SoftwareDevelopmentSection />
            <Footer />
            <FloatingButtons />
        </main>
    )
}
