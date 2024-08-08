import BackButton from '@/components/back-btn'
import SearchInput from '@/components/search-input'
import { TagsLoadingFallback } from '@/components/tags'
import { Skeleton } from '@/components/ui/skeleton'

export default function UserDetailsPage() {
  const user = {
    name: 'Maxim Berg',
    bio: ' As a digital designer, I try to surround myself and others with beauty in the digital world. In my spare time, I try to capture the beauty of the real world.',
    location: 'Amsterdam, Netherlands',
    tags: ['Landscape Images & Pictures', 'Hq Background Images', , 'HD Wallpapers', 'Travel Images', '3d Art'],
  }

  const tags: { title: string; type: 'search' }[] = user.tags.map((tag) => ({ title: tag!, type: 'search' }))
  return (
    <div className="loading-page">
      <BackButton variant="ghost" className="mb-2" disabled />
      <SearchInput placeholder="Search for different user" searchFor="users" className="mb-20" disabled />

      <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:items-start">
        <Skeleton className="size-32" />

        <div className="w-full flex-1 sm:max-w-[700px]">
          <Skeleton className="mb-1 h-9 w-52" />
          {Array(3)
            .fill('')
            .map((_, i) => (
              <Skeleton key={i} className={`mb-0.5 h-6 ${i == 2 ? 'w-2/3' : 'w-full'}`} />
            ))}

          <Skeleton className="mt-5 h-6 w-52" />
        </div>

        <ul className="flex flex-col gap-2">
          <li>
            <Skeleton className="h-5 w-28" />
          </li>
          <li>
            <Skeleton className="h-5 w-28" />
          </li>
        </ul>
      </div>

      <div className="mt-10 flex flex-col items-center gap-2">
        <Skeleton className="h-5 w-14" />
        <TagsLoadingFallback />
      </div>

      <div className="mt-20 flex items-center gap-2">
        {Array(3)
          .fill('')
          .map((_, i) => (
            <Skeleton key={i} className="h-10 w-28" />
          ))}
      </div>
    </div>
  )
}
