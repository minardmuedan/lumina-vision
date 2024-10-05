import CollectionsLoadingFallback from '@/components/collections/loading-fallback'

export default function CollectionsLoading() {
  return (
    <div className='px-2 py-3 md:px-10 lg:px-20'>
      <CollectionsLoadingFallback count={20} />
    </div>
  )
}
