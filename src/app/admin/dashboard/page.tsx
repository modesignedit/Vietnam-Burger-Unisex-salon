'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { getDb } from '@/lib/firebase/client'
import { Scissors, Image, Settings } from 'lucide-react'
import Link from 'next/link'
import AdminLayout from '@/components/admin/admin-layout'

export default function DashboardPage() {
  const [stats, setStats] = useState({ services: 0, gallery: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      const db = getDb()
      const [svcSnap, galSnap] = await Promise.all([
        getDocs(query(collection(db, 'services'), orderBy('sort_order'))),
        getDocs(query(collection(db, 'gallery'), orderBy('sort_order'))),
      ])
      setStats({
        services: svcSnap.size,
        gallery: galSnap.size,
      })
      setLoading(false)
    }
    loadStats()
  }, [])

  const cards = [
    { label: 'Services', value: stats.services, icon: Scissors, href: '/admin/services', color: 'border-gold' },
    { label: 'Gallery', value: stats.gallery, icon: Image, href: '/admin/gallery', color: 'border-gold' },
    { label: 'Settings', value: '-', icon: Settings, href: '/admin/settings', color: 'border-gold' },
  ]

  if (loading) return <AdminLayout><p className="text-luxury-paper/50">Loading...</p></AdminLayout>

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-gold">Dashboard</h1>
        <p className="text-luxury-paper/40 text-sm mt-1">Overview of your salon site</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.href}
              href={card.href}
              className={`border ${card.color}/20 p-6 hover:bg-gold/5 transition-colors group`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon size={24} className="text-gold/60 group-hover:text-gold transition-colors" />
                <span className="text-3xl font-serif text-gold">{card.value}</span>
              </div>
              <h3 className="text-sm tracking-widest uppercase text-luxury-paper/40">{card.label}</h3>
            </Link>
          )
        })}
      </div>

      <div className="border border-gold/10 p-6">
        <h2 className="text-xl font-serif text-gold mb-4">Quick Links</h2>
        <div className="space-y-3">
          <Link href="/" className="block text-luxury-paper/50 hover:text-gold transition-colors text-sm">
            View public site →
          </Link>
          <Link href="/admin/services" className="block text-luxury-paper/50 hover:text-gold transition-colors text-sm">
            Manage services →
          </Link>
          <Link href="/admin/gallery" className="block text-luxury-paper/50 hover:text-gold transition-colors text-sm">
            Manage gallery →
          </Link>
          <Link href="/admin/settings" className="block text-luxury-paper/50 hover:text-gold transition-colors text-sm">
            Edit site settings →
          </Link>
        </div>
      </div>
    </AdminLayout>
  )
}
