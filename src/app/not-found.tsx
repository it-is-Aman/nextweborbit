import Link from 'next/link'
import { Arvo } from 'next/font/google'
import { FloatingButtons, Footer, Header } from '@/frontend/components'

const arvo = Arvo({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export default function NotFound() {
  return (
    <div>
      <Header />
      <section className={`${arvo.className} py-10 bg-white min-h-[85vh] flex items-center justify-center text-neutral-800`}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">

            {/* Background image container for 404 */}
            <div
              className="h-[400px] bg-center bg-no-repeat flex items-start justify-center"
              style={{
                backgroundImage: `url('/images/404_not-found-gif.gif')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <h1 className="text-center text-[80px] font-bold text-neutral-800 mt-5">
                404
              </h1>
            </div>

            {/* Content box overlapping the background */}
            <div className="-mt-12 md:-mt-16 space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold">
                Look like you're lost
              </h3>

              <p className="text-neutral-500 font-light text-base md:text-lg">
                the page you are looking for not available!
              </p>

              <Link
                href="/"
                className="inline-block bg-[#39ac31] text-white font-bold uppercase tracking-wider text-sm px-6 py-3 rounded-md hover:bg-[#2e8a27] active:scale-[0.98] transition-all shadow-md hover:shadow-lg"
              >
                Go to Home
              </Link>
            </div>

          </div>
        </div>
      </section>
      <Footer />
      <FloatingButtons />
    </div>
  )
}
