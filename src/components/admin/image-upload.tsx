'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X } from 'lucide-react'

export default function ImageUpload({
  value,
  onChange,
}: {
  value: string
  onChange: (url: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `gallery/${Date.now()}.${ext}`

    const { error } = await supabase.storage.from('images').upload(path, file)
    if (error) {
      console.error('Upload failed:', error)
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage.from('images').getPublicUrl(path)
    onChange(urlData.publicUrl)
    setUploading(false)
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative inline-block">
          <img src={value} alt="Preview" className="h-24 w-24 object-cover border border-gold/20" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex items-center justify-center h-24 border border-dashed border-gold/20 cursor-pointer hover:border-gold transition-colors">
          {uploading ? (
            <span className="text-luxury-paper/50 text-sm">Uploading...</span>
          ) : (
            <div className="flex items-center space-x-2 text-luxury-paper/50 text-sm">
              <Upload size={16} />
              <span>Upload Image</span>
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      )}
    </div>
  )
}
