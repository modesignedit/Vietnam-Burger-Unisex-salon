import type { Service, GalleryItem, HeroContent, AboutContent, ContactContent, FooterContent, SocialLinks } from './types'

export const heroContent: HeroContent = {
  badge: 'Premium Unisex Salon',
  headline: 'Vietnam Burger',
  subheadline: 'Where urban edge meets elite prestige. Discover the new standard of unisex grooming in the heart of the city.',
}

export const services: Service[] = [
  { id: '1', name: 'Signature V-Burger Fade', price: 5000, description: 'Precision fade with our signature V-cut detail. The definitive urban classic.', category: 'Hair', image_url: null, sort_order: 1, created_at: '' },
  { id: '2', name: 'Artisan Knotless Braids', price: 15000, description: 'Handcrafted knotless braids — lightweight, natural flow, and built to last.', category: 'Beauty', image_url: null, sort_order: 2, created_at: '' },
  { id: '3', name: 'Neon Urban Tint', price: 8000, description: 'Vibrant fashion colors that pop. From electric blues to fiery reds — make a statement.', category: 'Hair', image_url: null, sort_order: 3, created_at: '' },
  { id: '4', name: 'Executive Beard Sculpt', price: 3500, description: 'Precision beard shaping, hot towel treatment, and premium oils for the distinguished gentleman.', category: 'Grooming', image_url: null, sort_order: 4, created_at: '' },
]

export const gallery: GalleryItem[] = [
  { id: '1', image_url: 'https://picsum.photos/seed/v-fade/800/1000', alt_text: 'Signature V-Burger Fade', sort_order: 1, created_at: '' },
  { id: '2', image_url: 'https://picsum.photos/seed/v-braids/800/1000', alt_text: 'Artisan Knotless Braids', sort_order: 2, created_at: '' },
  { id: '3', image_url: 'https://picsum.photos/seed/v-tint/800/1000', alt_text: 'Neon Urban Tint', sort_order: 3, created_at: '' },
]

export const aboutContent: AboutContent = {
  headline: 'Where Craft Meets Culture',
  body: 'Vietnam Burger is more than a salon — it\'s a lifestyle. Born from the vibrant streets and refined for the modern elite, we fuse bold urban aesthetics with precision craftsmanship. Every visit is an experience — from the scent of premium products to the rhythm of curated sounds.',
  features: [
    { title: 'Elite Craftsmanship', desc: 'Every cut, every style, executed with surgical precision by master barbers and stylists who live and breathe the craft.' },
    { title: 'Signature Experience', desc: 'From the moment you step in, expect nothing less than luxury. Premium products, curated playlists, and a vibe that transcends the ordinary.' },
    { title: 'Bold Identity', desc: 'We don\'t just follow trends — we set them. Walk out with a look that commands attention and speaks volumes.' },
  ],
}

export const contactContent: ContactContent = {
  address: '123 Urban Avenue, Lagos, Nigeria',
  phone: '+234 911 897 0291',
  hours: 'Mon – Sat: 9AM – 8PM\nSun: 12PM – 6PM',
  cta_title: 'Book Your Session',
  cta_text: 'Ready to transform your look? Reach out via WhatsApp and let\'s craft something exceptional together.',
}

export const footerContent: FooterContent = {
  brand: 'VIETNAM BURGER',
  copyright: '© 2024 Vietnam Burger. All rights reserved.',
}

export const socialLinks: SocialLinks = {
  tiktok: 'https://tiktok.com/@vietnamburger',
  instagram: 'https://instagram.com/vietnamburger',
  facebook: 'https://facebook.com/vietnamburger',
}
