import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import FloatingButtons from '@/components/layout/floating-buttons'
import WebsiteSection from '@/components/features/website-development/website-section'

export default function WebsiteDevelopmentPage() {
    return (
        <main className="min-h-screen">
            <Header />
            <WebsiteSection />
            <Footer />
            <FloatingButtons />
        </main>
    )
}
