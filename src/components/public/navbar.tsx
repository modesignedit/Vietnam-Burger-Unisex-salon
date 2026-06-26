'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-luxury-black/90 backdrop-blur-md border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="text-gold font-serif text-2xl tracking-widest">
          VIETNAM BURGER
        </a>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-luxury-paper/70 hover:text-gold transition-colors text-sm tracking-widest uppercase"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://wa.me/2349118970291"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-xs"
          >
            Book Now
          </a>
        </div>

        <button className="md:hidden text-luxury-paper" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-luxury-black/95 border-t border-gold/10 px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-luxury-paper/70 hover:text-gold transition-colors text-sm tracking-widest uppercase"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://wa.me/2349118970291"
            target="_blank"
            rel="noopener noreferrer"
            className="block btn-gold text-xs text-center"
          >
            Book Appointment
          </a>
        </div>
      )}
    </nav>
  )
}
