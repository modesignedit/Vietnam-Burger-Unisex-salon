'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react'
import AdminLayout from '@/components/admin/admin-layout'
import ImageUpload from '@/components/admin/image-upload'
import type { Service } from '@/lib/types'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<{ open: boolean; edit?: Service }>({ open: false })

  async function loadServices() {
    const res = await fetch('/api/data?collection=services')
    const data = await res.json()
    const list = (data ?? []).sort((a: Service, b: Service) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    setServices(list)
    setLoading(false)
  }

  useEffect(() => { loadServices() }, [])

  async function persist(list: Service[]) {
    await fetch('/api/data?collection=services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list),
    })
  }

  async function handleSave(form: Partial<Service>) {
    let list: Service[]
    if (modal.edit) {
      list = services.map((s) => (s.id === modal.edit!.id ? { ...s, ...form } : s))
    } else {
      const item = { ...form, id: crypto.randomUUID(), created_at: new Date().toISOString() } as Service
      list = [...services, item]
    }
    setServices(list)
    await persist(list)
    setModal({ open: false })
  }

  async function handleDelete(id: string) {
    const list = services.filter((s) => s.id !== id)
    setServices(list)
    await persist(list)
  }

  async function handleReorder(id: string, dir: 'up' | 'down') {
    const idx = services.findIndex((s) => s.id === id)
    if (idx === -1) return
    const swap = dir === 'up' ? idx - 1 : idx + 1
    if (swap < 0 || swap >= services.length) return
    const list = [...services]
    const temp = list[idx].sort_order
    list[idx] = { ...list[idx], sort_order: list[swap].sort_order }
    list[swap] = { ...list[swap], sort_order: temp }
    setServices(list)
    await persist(list)
  }

  if (loading) return <AdminLayout><p className="text-luxury-paper/50">Loading...</p></AdminLayout>

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-gold">Services</h1>
        <button onClick={() => setModal({ open: true })} className="btn-gold text-sm flex items-center space-x-2">
          <Plus size={16} />
          <span>Add Service</span>
        </button>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="border border-gold/10 p-6 flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-gold font-serif text-xl">{service.name}</h3>
              <p className="text-luxury-paper/50 text-sm mt-1">{service.category} — ₦{service.price.toLocaleString()}</p>
              {service.description && <p className="text-luxury-paper/40 text-xs mt-1">{service.description}</p>}
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => handleReorder(service.id, 'up')} className="text-luxury-paper/30 hover:text-gold transition-colors"><ArrowUp size={18} /></button>
              <button onClick={() => handleReorder(service.id, 'down')} className="text-luxury-paper/30 hover:text-gold transition-colors"><ArrowDown size={18} /></button>
              <button onClick={() => setModal({ open: true, edit: service })} className="text-luxury-paper/30 hover:text-gold transition-colors"><Pencil size={18} /></button>
              <button onClick={() => handleDelete(service.id)} className="text-luxury-paper/30 hover:text-red-400 transition-colors"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
        {services.length === 0 && <p className="text-luxury-paper/30 text-center py-12">No services yet. Add your first service.</p>}
      </div>

      {modal.open && (
        <ServiceModal service={modal.edit} onSave={handleSave} onClose={() => setModal({ open: false })} />
      )}
    </AdminLayout>
  )
}

function ServiceModal({ service, onSave, onClose }: { service?: Service; onSave: (form: Partial<Service>) => void; onClose: () => void }) {
  const [name, setName] = useState(service?.name ?? '')
  const [price, setPrice] = useState(service?.price ?? 0)
  const [description, setDescription] = useState(service?.description ?? '')
  const [category, setCategory] = useState(service?.category ?? 'Hair')
  const [imageUrl, setImageUrl] = useState(service?.image_url ?? '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave({ name, price, description, category, image_url: imageUrl, sort_order: service?.sort_order ?? Date.now() })
  }

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100]">
      <div className="bg-luxury-black border border-gold/20 w-full max-w-lg p-8">
        <h2 className="text-2xl font-serif text-gold mb-6">{service ? 'Edit Service' : 'Add Service'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input placeholder="Service Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent border border-gold/20 px-4 py-3 text-luxury-paper placeholder:text-luxury-paper/30 focus:outline-none focus:border-gold" required />
          <input type="number" placeholder="Price (NGN)" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full bg-transparent border border-gold/20 px-4 py-3 text-luxury-paper placeholder:text-luxury-paper/30 focus:outline-none focus:border-gold" required />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-transparent border border-gold/20 px-4 py-3 text-luxury-paper placeholder:text-luxury-paper/30 focus:outline-none focus:border-gold resize-none h-24" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-luxury-black border border-gold/20 px-4 py-3 text-luxury-paper focus:outline-none focus:border-gold">
            <option value="Hair">Hair</option>
            <option value="Beauty">Beauty</option>
            <option value="Grooming">Grooming</option>
          </select>
          <ImageUpload value={imageUrl} onChange={setImageUrl} />
          <div className="flex space-x-4 pt-4">
            <button type="submit" className="btn-gold flex-1">{service ? 'Update' : 'Create'}</button>
            <button type="button" onClick={onClose} className="border border-gold/20 text-luxury-paper/70 px-8 py-3 hover:border-gold transition-colors">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
