import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import FloatingButtons from '@/components/layout/floating-buttons'
// import GallerySection from '@/components/features/gallery/gallery-section'

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Header />
      {/* <GallerySection /> */}
      <Footer />
      <FloatingButtons />
    </main>
  )
}