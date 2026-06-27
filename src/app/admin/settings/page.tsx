'use client'

import { useEffect, useState } from 'react'
import { ref, get, update } from 'firebase/database'

export const dynamic = 'force-dynamic'
import { getClientDb } from '@/lib/firebase/client'
import AdminLayout from '@/components/admin/admin-layout'

interface SectionField {
  key: string
  label: string
  type: 'text' | 'textarea'
}

const SECTIONS: Record<string, { label: string; fields: SectionField[] }> = {
  hero: {
    label: 'Hero',
    fields: [
      { key: 'badge', label: 'Badge', type: 'text' },
      { key: 'headline', label: 'Headline', type: 'text' },
      { key: 'subheadline', label: 'Subheadline', type: 'textarea' },
    ],
  },
  about: {
    label: 'About',
    fields: [
      { key: 'headline', label: 'Headline', type: 'text' },
      { key: 'body', label: 'Body', type: 'textarea' },
    ],
  },
  contact: {
    label: 'Contact',
    fields: [
      { key: 'address', label: 'Address', type: 'text' },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'hours', label: 'Business Hours', type: 'textarea' },
      { key: 'cta_title', label: 'CTA Title', type: 'text' },
      { key: 'cta_text', label: 'CTA Text', type: 'textarea' },
    ],
  },
  footer: {
    label: 'Footer',
    fields: [
      { key: 'brand', label: 'Brand Name', type: 'text' },
      { key: 'copyright', label: 'Copyright', type: 'text' },
    ],
  },
  social: {
    label: 'Social Links',
    fields: [
      { key: 'tiktok', label: 'TikTok URL', type: 'text' },
      { key: 'instagram', label: 'Instagram URL', type: 'text' },
      { key: 'facebook', label: 'Facebook URL', type: 'text' },
    ],
  },
}

export default function SettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function load() {
      for (const section of Object.keys(SECTIONS)) {
        const snap = await get(ref(getClientDb(), `settings/${section}`))
        const data = snap.val() ?? {}
        for (const field of SECTIONS[section].fields) {
          if (data[field.key] !== undefined) {
            setValues((prev) => ({ ...prev, [`${section}.${field.key}`]: String(data[field.key]) }))
          }
        }
      }
    }
    load()
  }, [])

  async function handleSave() {
    setSaving(true)
    for (const [section, config] of Object.entries(SECTIONS)) {
      const data: Record<string, any> = {}
      for (const field of config.fields) {
        data[field.key] = values[`${section}.${field.key}`] ?? ''
      }
      await update(ref(getClientDb(), `settings/${section}`), data)
    }
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-gold">Site Settings</h1>
        <button onClick={handleSave} disabled={saving} className="btn-gold text-sm">
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save All'}
        </button>
      </div>

      <div className="space-y-8">
        {Object.entries(SECTIONS).map(([section, config]) => (
          <div key={section} className="border border-gold/10 p-6">
            <h2 className="text-xl font-serif text-gold capitalize mb-4">{config.label}</h2>
            <div className="space-y-4">
              {config.fields.map((field) => {
                const key = `${section}.${field.key}`
                return (
                  <div key={key}>
                    <label className="block text-xs tracking-widest uppercase text-luxury-paper/40 mb-2">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea value={values[key] ?? ''} onChange={(e) => setValues({ ...values, [key]: e.target.value })} className="w-full bg-transparent border border-gold/20 px-4 py-3 text-luxury-paper focus:outline-none focus:border-gold resize-none h-24" />
                    ) : (
                      <input type="text" value={values[key] ?? ''} onChange={(e) => setValues({ ...values, [key]: e.target.value })} className="w-full bg-transparent border border-gold/20 px-4 py-3 text-luxury-paper focus:outline-none focus:border-gold" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
