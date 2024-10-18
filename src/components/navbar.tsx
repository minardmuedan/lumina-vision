'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { buttonVariants } from './ui/button'
import SearchInputForm from './ui/input'
import Image from 'next/image'

export default function Navbar() {
  const pathname = usePathname()
  const navlinks = ['/', '/gallery', '/collections', '/topics']

  return (
    <header className='sticky top-0 z-30 flex w-full flex-col justify-between gap-4 border-b bg-background px-4 py-4 sm:px-8 md:h-14 md:flex-row md:items-center md:px-10 md:py-0'>
      <div className='flex items-center justify-between gap-10'>
        <Link href='/'>
          <div className='flex items-center gap-2'>
            <p className='font-normal'>Lumina</p>
            <Image src='/logo.svg' alt='lumina vision logo' height={16} width={56} />
          </div>
        </Link>
        <SearchInputForm className='md:hidden' />
      </div>

      <div className='flex items-center gap-10'>
        <nav className='flex flex-1 justify-between sm:gap-4'>
          {navlinks.map((href, index) => {
            const isActive = pathname === href
            return (
              <Link
                key={index}
                href={href}
                className={cn(buttonVariants({ variant: isActive ? 'default' : 'ghost' }), `w-full ${isActive ? '' : 'text-muted-foreground'}`)}
              >
                {index == 0 ? 'home' : href.slice(1)}
              </Link>
            )
          })}
        </nav>
        <SearchInputForm className='hidden md:block' />
      </div>
    </header>
  )
}
