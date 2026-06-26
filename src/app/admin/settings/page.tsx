'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import AdminLayout from '@/components/admin/admin-layout'
import type { SupabaseClient } from '@supabase/supabase-js'

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

export default function SettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = useRef<SupabaseClient | null>(null)

  function getSupabase() {
    if (!supabase.current) supabase.current = createClient()
    return supabase.current
  }

  useEffect(() => {
    async function load() {
      const { data } = await getSupabase().from('site_settings').select('*')
      if (data) {
        const map: Record<string, string> = {}
        data.forEach((s) => {
          const val = s.value
          map[`${s.section}.${s.key}`] = typeof val === 'string' ? val : JSON.stringify(val)
        })
        setValues(map)
      }
    }
    load()
  }, [])

  async function handleSave() {
    setSaving(true)
    for (const field of FIELDS) {
      const key = `${field.section}.${field.key}`
      const raw = values[key] ?? ''
      const value = field.type === 'json' ? JSON.parse(raw || '[]') : raw
      await getSupabase().from('site_settings').upsert(
        { section: field.section, key: field.key, value },
        { onConflict: 'section, key' }
      )
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
