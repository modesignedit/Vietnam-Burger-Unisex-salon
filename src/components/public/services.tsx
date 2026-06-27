import { adminDb } from '@/lib/firebase/admin'
import type { Service } from '@/lib/types'

export default async function Services() {
  const snap = await adminDb.ref('services').get()
  const raw = snap.val() ?? {}
  const services = Object.entries(raw)
    .map(([id, data]) => ({ id, ...data as any } as Service))
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

  if (!services.length) return null

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group border border-gold/10 hover:border-gold transition-colors p-8 space-y-4">
              <div className="text-xs tracking-[0.3em] uppercase text-gold/40">
                {service.category}
              </div>
              <h3 className="text-2xl font-serif text-luxury-paper group-hover:text-gold transition-colors">
                {service.name}
              </h3>
              <p className="text-sm text-luxury-paper/60 leading-relaxed">
                {service.description}
              </p>
              <div className="text-3xl font-serif text-gold">
                ₦{service.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
