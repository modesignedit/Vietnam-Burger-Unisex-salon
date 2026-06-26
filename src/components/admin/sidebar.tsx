'use client'

import { LayoutDashboard, Scissors, Image, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Services', href: '/admin/services', icon: Scissors },
  { label: 'Gallery', href: '/admin/gallery', icon: Image },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await signOut(auth)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
    router.refresh()
  }

  return (
    <aside className="w-64 bg-luxury-black border-r border-gold/10 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gold/10">
        <Link href="/admin/dashboard" className="text-gold font-serif text-xl tracking-widest">
          VIETNAM BURGER
        </Link>
        <p className="text-luxury-paper/30 text-xs mt-1 tracking-widest uppercase">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 text-sm transition-colors ${
                active
                  ? 'text-gold bg-gold/5 border-l-2 border-gold'
                  : 'text-luxury-paper/50 hover:text-gold hover:bg-gold/5'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gold/10">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 text-sm text-luxury-paper/50 hover:text-red-400 transition-colors w-full"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
