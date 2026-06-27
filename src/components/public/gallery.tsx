import { adminDb } from '@/lib/firebase/admin'
import type { GalleryItem } from '@/lib/types'

export default async function Gallery() {
  const snap = await adminDb.ref('gallery').get()
  const raw = snap.val() ?? {}
  const images = Object.entries(raw)
    .map(([id, data]) => ({ id, ...data as any } as GalleryItem))
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

  const displayImages = images.length
    ? images
    : [
        { id: '1', image_url: 'https://picsum.photos/seed/v-fade/800/1000', alt_text: 'Signature V-Burger Fade', sort_order: 1, created_at: '' },
        { id: '2', image_url: 'https://picsum.photos/seed/v-braids/800/1000', alt_text: 'Artisan Knotless Braids', sort_order: 2, created_at: '' },
        { id: '3', image_url: 'https://picsum.photos/seed/v-tint/800/1000', alt_text: 'Neon Urban Tint', sort_order: 3, created_at: '' },
      ] as GalleryItem[]

  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">The Gallery</h2>
        <p className="text-center text-luxury-paper/50 mb-16 text-sm tracking-widest uppercase">
          Visual Excellence
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayImages.map((image) => (
            <div key={image.id} className="group relative overflow-hidden aspect-[4/5]">
              <img src={image.image_url} alt={image.alt_text ?? ''} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-luxury-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-gold text-sm tracking-widest uppercase">{image.alt_text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
