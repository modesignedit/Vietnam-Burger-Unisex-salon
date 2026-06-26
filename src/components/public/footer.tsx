import { createClient } from '@/lib/supabase/server'

export default async function Footer() {
  const supabase = await createClient()

  const { data: settings } = await supabase
    .from('site_settings')
    .select('key, value')
    .in('section', ['footer', 'social'])

  const get = (key: string) => settings?.find((s) => s.key === key)?.value ?? ''

  return (
    <footer className="border-t border-gold/20 py-12 px-6">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <div className="text-gold font-serif text-4xl tracking-widest">
          {get('brand')}
        </div>

        <div className="flex justify-center space-x-6 text-luxury-paper/50 text-sm">
          <a href={get('tiktok')} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            TikTok
          </a>
          <a href={get('instagram')} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            Instagram
          </a>
          <a href={get('facebook')} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            Facebook
          </a>
        </div>

        <div className="text-luxury-paper/40 text-xs tracking-widest uppercase">
          {get('copyright')}
        </div>
      </div>
    </footer>
  )
}
