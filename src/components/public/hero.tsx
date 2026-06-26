import { createClient } from '@/lib/supabase/server'
import type { HeroContent } from '@/lib/types'

export default async function Hero() {
  const supabase = await createClient()

  const { data: settings } = await supabase
    .from('site_settings')
    .select('key, value')
    .eq('section', 'hero')

  const get = (key: string) => settings?.find((s) => s.key === key)?.value ?? ''
  const hero = { badge: get('badge'), headline: get('headline'), subheadline: get('subheadline') } as HeroContent

  const bgUrl = 'https://picsum.photos/seed/salon-hero/1920/1080?blur=2'

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/60 via-transparent to-luxury-black" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 space-y-8">
        <span className="inline-block text-xs tracking-[0.5em] uppercase text-gold/50 border border-gold/30 px-6 py-2">
          {hero.badge}
        </span>
        <h1 className="text-7xl md:text-9xl font-serif text-gold leading-tight tracking-tighter">
          {hero.headline}
        </h1>
        <p className="text-lg md:text-xl text-luxury-paper/70 max-w-2xl mx-auto leading-relaxed">
          {hero.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/2349118970291"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Book Your Transformation
          </a>
          <a
            href="#services"
            className="border border-gold/30 text-gold px-8 py-3 uppercase tracking-widest text-sm hover:bg-gold/5 transition-colors"
          >
            Explore Services
          </a>
        </div>
      </div>
    </section>
  )
}
