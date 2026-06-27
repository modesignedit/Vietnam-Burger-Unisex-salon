'use client'

import { useEffect, useState } from 'react'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { getClientStorage } from '@/lib/firebase/client'
import { Trash2, ArrowUp, ArrowDown } from 'lucide-react'
import AdminLayout from '@/components/admin/admin-layout'
import ImageUpload from '@/components/admin/image-upload'
import type { GalleryItem } from '@/lib/types'

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [newAlt, setNewAlt] = useState('')

  async function loadGallery() {
    const res = await fetch('/api/data?collection=gallery')
    const data = await res.json()
    const list = (data ?? []).sort((a: GalleryItem, b: GalleryItem) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    setItems(list)
    setLoading(false)
  }

  useEffect(() => { loadGallery() }, [])

  async function persist(list: GalleryItem[]) {
    await fetch('/api/data?collection=gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list),
    })
  }

  async function handleAdd(url: string) {
    if (!url) return
    const item = { id: crypto.randomUUID(), image_url: url, alt_text: newAlt, sort_order: Date.now(), created_at: new Date().toISOString() } as GalleryItem
    const list = [...items, item]
    setItems(list)
    await persist(list)
    setAdding(false)
    setNewAlt('')
  }

  async function handleDelete(id: string) {
    const item = items.find((i) => i.id === id)
    if (item?.image_url) {
      try {
        const storagePath = item.image_url.split('/o/')[1]?.split('?')[0]
        if (storagePath) await deleteObject(storageRef(getClientStorage(), decodeURIComponent(storagePath)))
      } catch {}
    }
    const list = items.filter((i) => i.id !== id)
    setItems(list)
    await persist(list)
  }

  async function handleReorder(id: string, dir: 'up' | 'down') {
    const idx = items.findIndex((i) => i.id === id)
    if (idx === -1) return
    const swap = dir === 'up' ? idx - 1 : idx + 1
    if (swap < 0 || swap >= items.length) return
    const list = [...items]
    const temp = list[idx].sort_order
    list[idx] = { ...list[idx], sort_order: list[swap].sort_order }
    list[swap] = { ...list[swap], sort_order: temp }
    setItems(list)
    await persist(list)
  }

  if (loading) return <AdminLayout><p className="text-luxury-paper/50">Loading...</p></AdminLayout>

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-gold">Gallery</h1>
        <button onClick={() => setAdding(true)} className="btn-gold text-sm">Add Image</button>
      </div>

      {adding && (
        <div className="border border-gold/20 p-6 mb-8 space-y-4">
          <ImageUpload value="" onChange={(url) => handleAdd(url)} />
          <input placeholder="Alt text (description)" value={newAlt} onChange={(e) => setNewAlt(e.target.value)} className="w-full bg-transparent border border-gold/20 px-4 py-3 text-luxury-paper placeholder:text-luxury-paper/30 focus:outline-none focus:border-gold" />
          <button onClick={() => setAdding(false)} className="text-luxury-paper/50 text-sm hover:text-gold transition-colors">Cancel</button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="group relative border border-gold/10">
            <img src={item.image_url} alt={item.alt_text ?? ''} className="w-full aspect-[4/5] object-cover" />
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-2">
              <div className="flex space-x-2">
                <button onClick={() => handleReorder(item.id, 'up')} className="text-luxury-paper/50 hover:text-gold transition-colors"><ArrowUp size={18} /></button>
                <button onClick={() => handleReorder(item.id, 'down')} className="text-luxury-paper/50 hover:text-gold transition-colors"><ArrowDown size={18} /></button>
                <button onClick={() => handleDelete(item.id)} className="text-luxury-paper/50 hover:text-red-400 transition-colors"><Trash2 size={18} /></button>
              </div>
              {item.alt_text && <span className="text-xs text-luxury-paper/50 text-center px-2">{item.alt_text}</span>}
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && !adding && <p className="text-luxury-paper/30 text-center py-12">No images yet. Add your first gallery image.</p>}
    </AdminLayout>
  )
}
