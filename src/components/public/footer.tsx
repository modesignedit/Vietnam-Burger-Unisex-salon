import { footerContent, socialLinks } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 py-12 px-6">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <div className="text-gold font-serif text-4xl tracking-widest">
          {footerContent.brand}
        </div>
        <div className="flex justify-center space-x-6 text-luxury-paper/50 text-sm">
          <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">TikTok</a>
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Instagram</a>
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Facebook</a>
        </div>
        <div className="text-luxury-paper/40 text-xs tracking-widest uppercase">
          {footerContent.copyright}
        </div>
      </div>
    </footer>
  )
}
