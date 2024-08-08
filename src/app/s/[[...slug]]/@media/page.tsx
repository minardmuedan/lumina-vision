import InfiniteScrollCollections from '@/components/collection/inifinite-scroll-collections'
import NoResult from '@/components/no-results'
import FilterSearchPhoto from '@/components/photo/search-filter'
import InfiniteScrollUsers from '@/components/users'
import { getSearchCollections, getSearchPhotos, getSearchUsers } from '@/lib/unsplash'
import dynamic from 'next/dynamic'

const InfiniteScrollGallery = dynamic(() => import('@/components/photo/infinite-scroll-gallery'), { ssr: false })

export default async function SearchResultMediaPage({
  params: { slug },
  searchParams: { v, order_by, orientation, colors },
}: {
  params: { slug: string[] | undefined }
  searchParams: { v: string; order_by: string; orientation: string; colors: string }
}) {
  if (slug && slug[0] === 'collections') {
    const collections = await getSearchCollections(v)
    if (!collections?.results || collections.results.length < 1) return <NoResult msg="No collection found!" />

    const fetchMoreSearchCollections = async (page: number) => {
      'use server'
      const newCollections = await getSearchCollections(v, page)
      if (!newCollections?.results) return null
      return newCollections.results
    }
    return <InfiniteScrollCollections initialCollections={collections.results} fetchMoreFn={fetchMoreSearchCollections} />
  }

  if (slug && slug[0] === 'users') {
    const users = await getSearchUsers(v)
    if (!users?.results || users.results.length < 1) return <NoResult msg="No user found!" />

    const fetchMoreSearchUsers = async (page: number) => {
      'use server'
      const newUser = await getSearchUsers(v, page)
      if (!newUser?.results) return null
      return newUser.results
    }
    return <InfiniteScrollUsers initialUsers={users.results} fetchMoreFn={fetchMoreSearchUsers} />
  }

  const photos = await getSearchPhotos(v, undefined, order_by ?? undefined, colors ?? undefined, orientation ?? undefined)
  if (!photos?.results) {
    const haveSearchParams = order_by || colors || orientation ? true : false

    return (
      <>
        {haveSearchParams && (
          <div className="flex w-full justify-end">
            <FilterSearchPhoto query={v} orderBy={order_by} orientation={orientation} colors={colors} />
          </div>
        )}
        <NoResult msg="No photo found!" />
      </>
    )
  }

  const fetchMorePhotos = async (page: number) => {
    'use server'
    const newPhotos = await getSearchPhotos(v, page, order_by ?? undefined, colors ?? undefined, orientation ?? undefined)
    if (!newPhotos?.results) return null
    return newPhotos.results
  }

  return (
    <>
      <div className="flex w-full justify-end">
        <FilterSearchPhoto query={v} orderBy={order_by} orientation={orientation} colors={colors} />
      </div>

      <InfiniteScrollGallery initialPhotos={photos.results} fetchMoreFn={fetchMorePhotos} />
    </>
  )
}
