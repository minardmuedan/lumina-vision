'use client'

import { usePathname } from 'next/navigation'

export default function FooterWrapper({ children }: { children: React.ReactNode }) {
  const infniiteScrollPages = ['/', '/gallery', '/collections', '/topics']
  const pathname = usePathname()

  if (infniiteScrollPages.includes(pathname)) return null
  return children
}
