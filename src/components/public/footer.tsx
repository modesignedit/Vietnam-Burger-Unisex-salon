import { redis } from '@/lib/redis'

export default async function Footer() {
  const [footerRaw, socialRaw] = await Promise.all([
    redis.get('settings_footer'),
    redis.get('settings_social'),
  ])

  const footer = (footerRaw ? JSON.parse(footerRaw as string) : {}) as { brand?: string; copyright?: string }
  const social = (socialRaw ? JSON.parse(socialRaw as string) : {}) as { tiktok?: string; instagram?: string; facebook?: string }

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
