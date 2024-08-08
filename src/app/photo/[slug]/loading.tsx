import BackButton from '@/components/back-btn'
import SearchInput from '@/components/search-input'
import { TagsLoadingFallback } from '@/components/tags'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { EllipsisVerticalIcon } from 'lucide-react'
import Image from 'next/image'
export default function PhotoDetailsLoadingFallback() {
  return (
    <>
      <BackButton disabled variant="ghost" className="mb-2" />
      <SearchInput disabled placeholder="Search for different photo..." className="mb-10" />
      <PhotoDetailsLoadingFallbackWithoutSearch />
    </>
  )
}

export function PhotoDetailsLoadingFallbackWithoutSearch() {
  return (
    <>
      <div className="loading-page mx-auto">
        <header className="mb-3 flex items-center justify-between gap-2">
          <div className="user flex items-center gap-2">
            <Skeleton className="size-8" />
            <Skeleton className="h-6 w-24" />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" disabled>
              <p>Download</p>
              <Image src="/icons/download.svg" alt="download-icon" width={19} height={19} />
            </Button>

            <Button size="icon" aria-label="menu-btn" disabled>
              <EllipsisVerticalIcon size={19} />
            </Button>
          </div>
        </header>
        <Skeleton className="mb-5 aspect-square w-full lg:max-h-[100dvh]" />
      </div>

      <TagsLoadingFallback />

      <section className="mt-20">
        <p className="mb-3 font-calstavier text-2xl">Related Collection</p>
        <ul className="flex flex-col gap-8 md:flex-row lg:gap-14">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <li key={i} className="flex-1">
                <div className="mb-3 flex aspect-[10/6.1] gap-2">
                  <Skeleton className="flex-1" />
                  <div className="flex flex-1 flex-col gap-2">
                    {Array(2)
                      .fill(0)
                      .map((_, i2) => (
                        <Skeleton key={i2} className="flex-1" />
                      ))}
                  </div>
                </div>
                <Skeleton className="mb-1 h-6 w-32" />
                <Skeleton className="mb-5 h-5 w-24" />

                <TagsLoadingFallback className="justify-start" quantity={3} />
              </li>
            ))}
        </ul>
      </section>
    </>
  )
}
