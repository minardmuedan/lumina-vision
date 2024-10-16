import InfiniteScrollGallery from '@/components/photos/infinite-scroll'
import { getSearchPhotos } from '@/lib/unsplash/search'
import { SearchNoResult } from './_components'

type Props = { searchParams: { query: string } }

export const generateMetadata = ({ searchParams: { query } }: Props) => {
  return {
    title: `Search Results for '${query}' - Image Gallery`,
    description: `Find images matching your search for '${query}'.`,
  }
}

export default async function SearchPhotosPage({ searchParams: { query } }: Props) {
  const { total, photos } = await getSearchPhotos(query, 1)
  if (!photos.length) return <SearchNoResult />

  return (
    <>
      <p className='mb-2 text-center text-sm text-muted-foreground'>{total} photos</p>

      <InfiniteScrollGallery
        initialPhotos={photos}
        queryKey={[`search-${query}-photos`]}
        apiEndpoint={`/unsplash/search/photos?query=${query}`}
        hasSearchParams
        max={total}
      />
    </>
  )
}
