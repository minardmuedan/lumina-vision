'use client'

import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const navlinks = ['/', '/gallery', '/collections', '/topics']

  return (
    <header className='sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b bg-background px-10'>
      <Link href='/'>Minard</Link>

      <div className='hidden items-center gap-20 lg:flex'>
        <nav className='flex gap-10'>
          {navlinks.map((href, index) => (
            <Link key={index} href={href} className={pathname === href ? 'font-normal underline' : 'text-muted-foreground'}>
              {index == 0 ? 'home' : href.slice(1)}
            </Link>
          ))}
        </nav>

        <div className='flex h-9 w-80 items-center justify-between rounded-md border border-border bg-accent px-3 text-sm text-muted-foreground'>
          Type here to find something new...
          <SearchIcon size={16} className='stroke-1.5' />
        </div>
      </div>
    </header>
  )
}
