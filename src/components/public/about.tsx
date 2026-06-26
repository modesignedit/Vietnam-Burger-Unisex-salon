import { adminDb } from '@/lib/firebase/admin'
import type { AboutContent } from '@/lib/types'

export default async function About() {
  const doc = await adminDb.collection('site_settings').doc('about').get()
  const data = doc.data()
  const about = {
    headline: data?.headline ?? '',
    body: data?.body ?? '',
    features: data?.features ?? [],
  } as AboutContent

  const features = Array.isArray(about.features) ? about.features : []

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-7xl font-serif text-gold leading-tight">
            {about.headline}
          </h2>
          <p className="text-luxury-paper/70 leading-relaxed">
            {about.body}
          </p>

          <div className="space-y-6">
            {features.map((f, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-px h-16 bg-gold/20 shrink-0" />
                <div>
                  <h4 className="text-gold font-semibold tracking-widest text-sm uppercase mb-1">
                    {f.title}
                  </h4>
                  <p className="text-luxury-paper/50 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <img
            src="https://picsum.photos/seed/urban-grooming/800/1000"
            alt="Elite grooming at Vietnam Burger"
            className="w-full h-auto object-cover"
          />
          <div className="absolute -top-4 -left-4 w-24 h-24 border-l border-t border-gold/30" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-gold/30" />
        </div>
      </div>
    </section>
  )
}
