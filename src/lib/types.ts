export interface Service {
  id: string
  name: string
  price: number
  description: string | null
  category: string | null
  image_url: string | null
  sort_order: number | null
  created_at: string
}

export interface GalleryItem {
  id: string
  image_url: string
  alt_text: string | null
  sort_order: number | null
  created_at: string
}

export interface HeroContent {
  badge: string
  headline: string
  subheadline: string
}

export interface AboutContent {
  headline: string
  body: string
  features: { title: string; desc: string }[]
}

export interface ContactContent {
  address: string
  phone: string
  hours: string
  cta_title: string
  cta_text: string
}

export interface SocialLinks {
  tiktok: string
  instagram: string
  facebook: string
}

export interface FooterContent {
  brand: string
  copyright: string
}
