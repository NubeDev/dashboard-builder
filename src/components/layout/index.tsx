import React from 'react'
import { Toaster } from 'src/shadcn/components/ui/sonner'

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
