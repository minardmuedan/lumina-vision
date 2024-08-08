import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import SearchInput from '@/components/search-input'
import Header from '@/components/page-header'
import { getSearchCollections, getSearchPhotos, getSearchUsers } from '@/lib/unsplash'
import { cache } from 'react'

export default async function SearchResultPage({
  params: { slug },
  searchParams: { v, order_by, colors, orientation },
}: {
  params: { slug: string[] | undefined }
  searchParams: { v: string; order_by: string; orientation: string; colors: string }
}) {
  if (!v)
    return (
      <div className="space-y-14">
        <Header title="Find What Matters to You" description="Discover relevant results with a quick keyword search" className="text-center" />
        <SearchInput placeholder="Search" />
      </div>
    )

  const getMedia = cache(async () => {
    const [photos, collections, users] = await Promise.all([
      getSearchPhotos(v, undefined, order_by ?? undefined, colors ?? undefined, orientation ?? undefined),
      getSearchCollections(v),
      getSearchUsers(v),
    ])
    return [photos, collections, users]
  })

  const [photos, collections, users] = await getMedia()
  const navlinks = [
    {
      src: '/icons/double-picture.svg',
      label: 'Photos',
      qty: photos?.total,
      href: `/s?v=${v}`,
      isActive: slug ? (slug[0] == 'collections' || slug[0] == 'users' ? false : true) : true,
    },
    {
      src: '/icons/collection.svg',
      label: 'Collections',
      qty: collections?.total,
      href: `/s/collections?v=${v}`,
      isActive: slug && slug[0] == 'collections',
    },
    { src: '/icons/photographer.svg', label: 'Users', qty: users?.total, href: `/s/users?v=${v}`, isActive: slug && slug[0] == 'users' },
  ]

  return (
    <div className="w-full space-y-14">
      <SearchInput
        placeholder={`Search for ${slug ? (slug[0] == 'collections' ? 'collection' : slug[0] == 'users' ? 'user' : 'photo') : 'photo'} ...`}
        searchFor={slug ? (slug[0] == 'collections' ? 'collections' : slug[0] == 'users' ? 'users' : 'photos') : 'photos'}
      />
      <Header title={v} description={`Search result for ${v}`} />

      <nav className="flex w-full items-center gap-3 overflow-x-auto">
        {navlinks.map((navlink, i) => (
          <Button key={i} variant={navlink.isActive ? 'default' : 'ghost'} asChild>
            <Link href={navlink.href} scroll={false}>
              <Image src={navlink.src} alt="icon" width={19} height={19} className={`${navlink.isActive ? 'invert' : 'opacity-75'}`} />
              <p className={`${navlink.isActive ? '' : 'text-muted-foreground'}`}>
                {navlink.label} {navlink.qty}
              </p>
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  )
}
