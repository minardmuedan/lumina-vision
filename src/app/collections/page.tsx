import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import { GridWrapperUl } from '@/components/wrapper'
import Image from 'next/image'

export default async function CollectionsPage() {
  await new Promise((res) => setTimeout(res, 5000))

  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <SearchInput placeholder="Search for a collection..." className="flex-1" />
        <Button className="gap-2">
          <p>Filter</p>
          <Image src="/icons/filter.svg" alt="filter-icon" width={19} height={19} className="invert" />
        </Button>
      </div>

      <GridWrapperUl>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <li key={i}>
              <div className="aspect-[2/1] w-full bg-sky-500"></div>
            </li>
          ))}
      </GridWrapperUl>
    </div>
  )
}
