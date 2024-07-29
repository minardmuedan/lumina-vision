'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navlinks() {
  const navlinks = ['/', '/gallery', '/collections', '/topics']
  const pathName = usePathname()

  return (
    <nav className="flex gap-8">
      {navlinks.map((navlink, i) => (
        <Link
          href={navlink}
          key={i}
          className={`px-1 underline-offset-2 ${pathName == `${navlink}` ? 'text-foreground underline' : 'text-muted-foreground'}`}
        >
          {i == 0 ? 'home' : navlink.slice(1)}
        </Link>
      ))}
    </nav>
  )
}
