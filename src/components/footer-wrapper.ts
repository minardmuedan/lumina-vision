'use client'

import { usePathname } from 'next/navigation'

export default function FooterWrapper({ children }: { children: React.ReactNode }) {
  const infniteScrollPages = ['/gallery', '/collections', '/topics']
  const pathname = usePathname()

  if (infniteScrollPages.includes(pathname) || pathname.startsWith('/search')) return null
  return children
}
