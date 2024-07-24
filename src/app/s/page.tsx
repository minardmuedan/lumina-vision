import Header from '@/components/page-header'
import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

export default function SearchResultPage({ searchParams }: { searchParams: { v: string } }) {
  const navlinks = [
    { src: '/icons/double-picture.svg', label: 'Photos', href: '/' },
    { src: '/icons/collection.svg', label: 'Collections', href: '/collections' },
    { src: '/icons/heart-picture.svg', label: 'Liked Photos', href: '/liked-photos' },
  ]

  if (!searchParams.v)
    return (
      <div className="space-y-14">
        <Header title="Find What Matters to You" description="Discover relevant results with a quick keyword search" className="text-center" />
        <SearchInput placeholder="Search" />
      </div>
    )

  return (
    <div className="w-full space-y-14">
      <SearchInput placeholder="Search" />
      <Header title={searchParams.v} description={`Search result for ${searchParams.v}`} />
      <nav className="mb-5 flex items-center gap-3">
        {navlinks.map((v, i) => (
          <Button key={i} variant={i > 0 ? 'outline' : 'default'} asChild>
            <Link href={`/s?v=${searchParams.v}${v.href}`} scroll={false}>
              <Image src={v.src} alt="icon" width={19} height={19} className={`${i > 0 ? '' : 'invert'}`} />
              <p>{v.label}</p>
            </Link>
          </Button>
        ))}
      </nav>

      <Suspense fallback={'loading'}></Suspense>
    </div>
  )
}
