import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import FloatingButtons from '@/components/layout/floating-buttons'
import SeoPackagesSection from '@/components/features/seo-packages/seo-packages-section'

export default function SeoPackagesPage() {
    return (
        <main className="min-h-screen">
            <Header />
            <SeoPackagesSection />
            <Footer />
            <FloatingButtons />
        </main>
    )
}
