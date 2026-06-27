import { redis } from '@/lib/redis'
import { MapPin, Clock, Phone } from 'lucide-react'
import type { ContactContent } from '@/lib/types'

export default async function Contact() {
  const raw = await redis.get('settings_contact')
  const data = raw ? JSON.parse(raw as string) : {}
  const contact = {
    address: data.address ?? '',
    phone: data.phone ?? '',
    hours: data.hours ?? '',
    cta_title: data.cta_title ?? '',
    cta_text: data.cta_text ?? '',
  } as ContactContent

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">Visit Us</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <MapPin className="text-gold shrink-0 mt-1" size={20} />
              <div>
                <h4 className="text-gold text-sm tracking-widest uppercase mb-1">Address</h4>
                <p className="text-luxury-paper/70">{contact.address}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Clock className="text-gold shrink-0 mt-1" size={20} />
              <div>
                <h4 className="text-gold text-sm tracking-widest uppercase mb-1">Hours</h4>
                <p className="text-luxury-paper/70 whitespace-pre-line">{contact.hours}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="text-gold shrink-0 mt-1" size={20} />
              <div>
                <h4 className="text-gold text-sm tracking-widest uppercase mb-1">Phone</h4>
                <p className="text-luxury-paper/70">{contact.phone}</p>
              </div>
            </div>
          </div>
          <div className="bg-gold/5 border border-gold/10 p-10 text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-serif text-gold">{contact.cta_title}</h3>
            <p className="text-luxury-paper/60 leading-relaxed">{contact.cta_text}</p>
            <a href="https://wa.me/2349118970291" target="_blank" rel="noopener noreferrer" className="btn-gold inline-block">Book via WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  )
}
