import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import { Toaster } from 'react-hot-toast'

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main content */}
      <div className="lg:pl-64 transition-all duration-300">
        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </div>
  )
}

