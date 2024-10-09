'use client'

import Icon from '@/components/icon'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export function SearchQuery() {
  const searchParams = useSearchParams()
  return (
    <p className='text-2xl md:text-3xl'>
      Search Result for <span className='font-normal'>{`"${searchParams.get('query')}"`}</span>
    </p>
  )
}

export function SearchNavbar() {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const query = searchParams.get('query')

  return (
    <nav className='mb-3 flex gap-1'>
      {(['photos', 'collections', 'users'] as const).map((link, i) => {
        const isActive = i == 0 ? pathname === `/search` : pathname.includes(`/${link}`)
        return (
          <Link key={i} href={`/search${i == 0 ? '' : `/${link}`}?query=${query}`} className={buttonVariants({ variant: isActive ? 'default' : 'ghost' })}>
            <Icon icon={link} white={isActive} />
            <p className='first-letter:uppercase'>{link}</p>
          </Link>
        )
      })}
    </nav>
  )
}

export function SearchNoResult() {
  return (
    <div className='flex h-[calc(100dvh-20rem)] flex-col items-center justify-center gap-2 text-center *:max-w-[700px]'>
      <h1 className='font-calstavier text-3xl sm:text-4xl md:text-5xl'>Find What Matters to You</h1>
      <p className='text-sm text-muted-foreground md:text-base'>Discover relevant results with a quick keyword search</p>
    </div>
  )
}
