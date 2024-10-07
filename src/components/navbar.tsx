'use client'

import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Input } from './ui/input'

export default function Navbar() {
  const pathname = usePathname()
  const navlinks = ['/', '/gallery', '/collections', '/topics']

  return (
    <header className='sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b bg-background px-10'>
      <Link href='/'>Minard</Link>

      <div className='hidden items-center gap-20 lg:flex'>
        <nav className='flex gap-10'>
          {navlinks.map((href, index) => (
            <Link key={index} href={href} className={pathname === href ? 'font-normal underline' : 'text-muted-foreground'}>
              {index == 0 ? 'home' : href.slice(1)}
            </Link>
          ))}
        </nav>

        <div className='relative'>
          <Input id='searchInput' placeholder='Type here to find something new...' className='bg-accent pr-8' />
          <SearchIcon size={16} className='stroke-1.5 absolute right-3 top-1/2 -translate-y-1/2' />
        </div>
      </div>
    </header>
  )
}
