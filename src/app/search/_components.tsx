import Icon from '@/components/icon'
import { pagePadding } from '@/components/pages'
import BackButton from '@/components/ui/back-button'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { Suspense } from 'react'

type TProps = { query: string | undefined; activePath: 'photos' | 'collections' | 'users' }

export function SearchPageWrapper({ children, query, activePath }: TProps & { children: React.ReactNode }) {
  return (
    <div className={pagePadding}>
      <BackButton />

      <div className='py-10'>
        <p className='text-lg sm:text-2xl md:text-3xl'>
          Search Result for <span className='font-normal'>{`"${query}"`}</span>
        </p>
      </div>
      <SearchNavbar query={query} activePath={activePath} />

      <Suspense>{children}</Suspense>
    </div>
  )
}

export function SearchNavbar({ query, activePath }: TProps) {
  return (
    <nav className='flex gap-1'>
      {(['photos', 'collections', 'users'] as const).map((link, i) => {
        const isActive = activePath === link
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
