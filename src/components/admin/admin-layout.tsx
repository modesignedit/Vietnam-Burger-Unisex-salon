import Sidebar from './sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-luxury-black">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
