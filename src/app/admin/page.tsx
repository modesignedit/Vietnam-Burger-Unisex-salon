'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getAuthInstance } from '@/lib/firebase/client'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { user } = await signInWithEmailAndPassword(getAuthInstance(), email, password)
      const idToken = await user.getIdToken()

      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      })

      router.push('/admin/dashboard')
      router.refresh()
    } catch (err: any) {
      setError(err.message ?? 'Login failed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-gold font-serif text-4xl tracking-widest mb-2">VIETNAM BURGER</h1>
          <p className="text-luxury-paper/50 text-sm">Admin Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-gold/20 px-6 py-3 text-luxury-paper placeholder:text-luxury-paper/30 focus:outline-none focus:border-gold transition-colors"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-gold/20 px-6 py-3 text-luxury-paper placeholder:text-luxury-paper/30 focus:outline-none focus:border-gold transition-colors"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full disabled:opacity-40"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
