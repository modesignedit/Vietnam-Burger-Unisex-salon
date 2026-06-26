'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import AdminLayout from '@/components/admin/admin-layout'

interface SettingField {
  section: string
  key: string
  label: string
  type: 'text' | 'textarea' | 'json'
}

const FIELDS: SettingField[] = [
  { section: 'hero', key: 'badge', label: 'Badge', type: 'text' },
  { section: 'hero', key: 'headline', label: 'Headline', type: 'text' },
  { section: 'hero', key: 'subheadline', label: 'Subheadline', type: 'textarea' },
  { section: 'about', key: 'headline', label: 'About Headline', type: 'text' },
  { section: 'about', key: 'body', label: 'About Body', type: 'textarea' },
  { section: 'about', key: 'features', label: 'Features (JSON)', type: 'json' },
  { section: 'contact', key: 'address', label: 'Address', type: 'text' },
  { section: 'contact', key: 'phone', label: 'Phone', type: 'text' },
  { section: 'contact', key: 'hours', label: 'Business Hours', type: 'textarea' },
  { section: 'contact', key: 'cta_title', label: 'CTA Title', type: 'text' },
  { section: 'contact', key: 'cta_text', label: 'CTA Text', type: 'textarea' },
  { section: 'footer', key: 'brand', label: 'Brand Name', type: 'text' },
  { section: 'footer', key: 'copyright', label: 'Copyright', type: 'text' },
  { section: 'social', key: 'tiktok', label: 'TikTok URL', type: 'text' },
  { section: 'social', key: 'instagram', label: 'Instagram URL', type: 'text' },
  { section: 'social', key: 'facebook', label: 'Facebook URL', type: 'text' },
]

const SECTION_DOCS: Record<string, string> = {
  hero: 'hero',
  about: 'about',
  contact: 'contact',
  footer: 'footer',
  social: 'social',
}

export default function SettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function load() {
      const sections = [...new Set(FIELDS.map((f) => f.section))]
      const map: Record<string, string> = {}
      for (const section of sections) {
        const snap = await getDoc(doc(db, 'site_settings', SECTION_DOCS[section]))
        const data = snap.data()
        if (data) {
          for (const field of FIELDS.filter((f) => f.section === section)) {
            const val = data[field.key]
            map[`${section}.${field.key}`] = val !== undefined ? (typeof val === 'string' ? val : JSON.stringify(val)) : ''
          }
        }
      }
      setValues(map)
    }
    load()
  }, [])

  async function handleSave() {
    setSaving(true)
    const sections = [...new Set(FIELDS.map((f) => f.section))]
    for (const section of sections) {
      const data: Record<string, unknown> = {}
      for (const field of FIELDS.filter((f) => f.section === section)) {
        const key = `${section}.${field.key}`
        const raw = values[key] ?? ''
        data[field.key] = field.type === 'json' ? JSON.parse(raw || '[]') : raw
      }
      await setDoc(doc(db, 'site_settings', SECTION_DOCS[section]), data, { merge: true })
    }
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const grouped = FIELDS.reduce<Record<string, SettingField[]>>((acc, f) => {
    if (!acc[f.section]) acc[f.section] = []
    acc[f.section].push(f)
    return acc
  }, {})

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-gold">Site Settings</h1>
        <button onClick={handleSave} disabled={saving} className="btn-gold text-sm">
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save All'}
        </button>
      </div>

      <div className="space-y-8">
        {Object.entries(grouped).map(([section, fields]) => (
          <div key={section} className="border border-gold/10 p-6">
            <h2 className="text-xl font-serif text-gold capitalize mb-4">{section}</h2>
            <div className="space-y-4">
              {fields.map((field) => {
                const key = `${field.section}.${field.key}`
                return (
                  <div key={key}>
                    <label className="block text-xs tracking-widest uppercase text-luxury-paper/40 mb-2">
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={values[key] ?? ''}
                        onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                        className="w-full bg-transparent border border-gold/20 px-4 py-3 text-luxury-paper focus:outline-none focus:border-gold resize-none h-24"
                      />
                    ) : field.type === 'json' ? (
                      <textarea
                        value={values[key] ?? ''}
                        onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                        className="w-full bg-transparent border border-gold/20 px-4 py-3 text-luxury-paper font-mono text-sm focus:outline-none focus:border-gold resize-none h-32"
                      />
                    ) : (
                      <input
                        type="text"
                        value={values[key] ?? ''}
                        onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                        className="w-full bg-transparent border border-gold/20 px-4 py-3 text-luxury-paper focus:outline-none focus:border-gold"
                      />
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
