import Navbar from '@/components/public/navbar'
import Footer from '@/components/public/footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero, Services, Gallery, About, Contact sections will be added in Task 5 */}
        <section id="home" className="min-h-screen flex items-center justify-center bg-luxury-black">
          <div className="text-center space-y-4">
            <h1 className="text-gold font-serif text-6xl md:text-9xl tracking-tighter">VIETNAM BURGER</h1>
            <p className="text-luxury-paper/50 text-lg">Loading content...</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
