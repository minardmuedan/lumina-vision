import { GalleryLoadingFallback } from '@/app/gallery/loading'
import BackButton from '@/components/back-btn'
import SearchInput from '@/components/search'
import { TagsLoadingFallback } from '@/components/tags'
import { Skeleton } from '@/components/ui/skeleton'

export default function UserDetailsLoadingFallback() {
  return (
    <div className="max-h-[calc(100dvh-4rem)] overflow-hidden">
      <BackButton disabled variant="ghost" />
      <SearchInput disabled placeholder="Search for a different user ..." className="mt-2 w-full" />
      <div className="user-details my-20 space-y-12">
        <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:items-start">
          <Skeleton className="size-32" />
          <UserTextDetails />
          <UserSocialMedia />
        </div>

        <TagsLoadingFallback />
      </div>

      <div className="user-media space-y-5">
        <nav className="flex w-full items-center gap-3 overflow-x-auto">
          {[105.39, 134.16, 145.41].map((v, i) => (
            <Skeleton key={i} style={{ width: `${v}px` }} className={`h-10 ${i == 0 ? 'bg-primary/15' : ''}`} />
          ))}
        </nav>

        <GalleryLoadingFallback />
      </div>
    </div>
  )
}

function UserTextDetails() {
  return (
    <div className="flex w-full max-w-[700px] flex-1 flex-col items-center md:items-start">
      <div className="mb-2 flex w-fit gap-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-12" />
      </div>

      <div className="description mb-7 w-full space-y-1">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className={`h-6 ${i == 2 ? 'mx-auto w-3/4 md:mx-0' : 'w-full'}`} />
          ))}
      </div>

      <Skeleton className="h-6 w-52" />
    </div>
  )
}

function UserSocialMedia() {
  return (
    <ul className="socmed flex gap-6 sm:flex-col">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <li key={i}>
            <Skeleton className="h-5 w-24" />
          </li>
        ))}
    </ul>
  )
}
