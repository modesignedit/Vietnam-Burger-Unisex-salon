import Navbar from '@/components/public/navbar'
import Hero from '@/components/public/hero'
import Services from '@/components/public/services'
import Gallery from '@/components/public/gallery'
import About from '@/components/public/about'
import Contact from '@/components/public/contact'
import Footer from '@/components/public/footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
