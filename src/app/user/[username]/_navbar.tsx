'use client'

import Icon from '@/components/icon'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type TProps = { username: string; totalPhotos: number; totalCollections: number; totalLikes: number }

export default function UserNavbar({ username, totalPhotos, totalCollections, totalLikes }: TProps) {
  const navlinks = ['photos', 'collections', 'likes'] as const
  const total = [totalPhotos, totalCollections, totalLikes]

  const pathname = usePathname()

  return (
    <nav className='mb-3 flex max-w-full items-center justify-center gap-1 overflow-x-auto sm:justify-start'>
      {navlinks.map((link, i) => {
        const isActive = i === 0 ? pathname === `/user/${username}` : pathname.includes(`/${link}`)
        return (
          <Link key={i} href={`/user/${username}/${i === 0 ? '' : link}`} className={buttonVariants({ variant: isActive ? 'default' : 'ghost' })}>
            <Icon icon={link} white={isActive} />
            <p className='first-letter:uppercase'>
              {link} {total[i]}
            </p>
          </Link>
        )
      })}
    </nav>
  )
}

export function UserNavbarLoadingFallback() {
  const navlinks = ['photos', 'collections', 'likes'] as const

  return (
    <nav className='flex items-center gap-1'>
      {navlinks.map((link, i) => (
        <Skeleton key={i} className={cn(buttonVariants({ variant: i == 0 ? 'default' : 'ghost' }), `${i == 0 ? '' : 'opacity-50'}`)}>
          <Icon icon={link} white={i == 0} />
          <p className='first-letter:uppercase'>{link}</p>
        </Skeleton>
      ))}
    </nav>
  )
}
