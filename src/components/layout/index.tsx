import React from 'react'
import { Toaster } from '@/shadcn/components/sonner'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex">
      {children}
      <Toaster />
    </div>
  )
}

export default Layout
