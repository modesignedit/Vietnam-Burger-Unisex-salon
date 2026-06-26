import { adminDb } from '@/lib/firebase/admin'

export default async function Footer() {
  const [footerSnap, socialSnap] = await Promise.all([
    adminDb.collection('site_settings').doc('footer').get(),
    adminDb.collection('site_settings').doc('social').get(),
  ])

  const footer = footerSnap.data() ?? {}
  const social = socialSnap.data() ?? {}

  return (
    <footer className="border-t border-gold/20 py-12 px-6">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <div className="text-gold font-serif text-4xl tracking-widest">
          {footer.brand ?? ''}
        </div>

        <div className="flex justify-center space-x-6 text-luxury-paper/50 text-sm">
          <a href={social.tiktok ?? ''} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            TikTok
          </a>
          <a href={social.instagram ?? ''} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            Instagram
          </a>
          <a href={social.facebook ?? ''} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            Facebook
          </a>
        </div>

        <div className="text-luxury-paper/40 text-xs tracking-widest uppercase">
          {footer.copyright ?? ''}
        </div>
      </div>
    </footer>
  )
}
