import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import { getPhotos } from '@/lib/unsplash'
import NoResult from '@/components/no-results'
import { InfinitScrollPhotos } from '@/components/load-more'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export default async function GalleryPage({ searchParams }: { searchParams: { order_by: 'oldest' | 'popular' | 'latest' } }) {
  // await new Promise((res) => setTimeout(res, 5000))

  const photos = await getPhotos(undefined, searchParams.order_by)
  const orderByNavLinks = [
    { label: 'Latest', href: '/gallery' },
    { label: 'Popularity', href: '/gallery?order_by=popular' },
    { label: 'Oldest', href: '/gallery?order_by=oldest' },
  ]

  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <SearchInput placeholder="Search for a photo..." className="w-full" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button disabled={!photos} variant="outline">
              <p>Filter</p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {orderByNavLinks.map((navlink, i) => (
              <DropdownMenuItem key={i} asChild>
                <a href={navlink.href} className="text-sm">
                  {navlink.label}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {photos ? <InfinitScrollPhotos initialPhotos={photos} orderBy={searchParams.order_by} /> : <NoResult msg="no photo found" />}
    </div>
  )
}
