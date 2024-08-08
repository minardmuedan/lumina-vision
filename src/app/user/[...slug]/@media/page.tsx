import InfiniteScrollCollections from '@/components/collection/inifinite-scroll-collections'
import { getUserCollections, getUserLikes, getUserPhotos } from '@/lib/unsplash'
import NoResult from '@/components/no-results'
import dynamic from 'next/dynamic'

const InfiniteScrollGallery = dynamic(() => import('@/components/photo/infinite-scroll-gallery'), { ssr: false })

export default async function UserMediaPage({ params }: { params: { slug: string[] } }) {
  if (params.slug[1] == 'collections') {
    const collections = await getUserCollections(params.slug[0])
    if (!collections || collections.length < 1) return <NoResult msg="No user collection found!" />
    const fetchMoreUserCollection = async (page: number) => {
      'use server'
      return await getUserCollections(params.slug[0], page)
    }
    return <InfiniteScrollCollections initialCollections={collections} fetchMoreFn={fetchMoreUserCollection} />
  }

  if (params.slug[1] == 'likes') {
    const likedPhotos = await getUserLikes(params.slug[0])
    if (!likedPhotos || likedPhotos.length < 1) return <NoResult msg="No user liked photo found!" />
    const fetchMoreUserLikedPhoto = async (page: number) => {
      'use server'
      return await getUserLikes(params.slug[0], page)
    }
    return <InfiniteScrollGallery initialPhotos={likedPhotos} fetchMoreFn={fetchMoreUserLikedPhoto} />
  }

  const photos = await getUserPhotos(params.slug[0])
  if (!photos || photos.length < 1) return <NoResult msg="No user photo found!" />
  const fetchMoreUserPhotos = async (page: number) => {
    'use server'
    return await getUserPhotos(params.slug[0], page)
  }
  return <InfiniteScrollGallery initialPhotos={photos} fetchMoreFn={fetchMoreUserPhotos} />
}
