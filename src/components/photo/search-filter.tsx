'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import { TPhotoColor, TPhotoOrietation } from '@/schema/unsplash'
import { useRouter } from 'next/navigation'

type TOrderBy = 'relevant' | 'latest'
type TFilter = { orderBy?: TOrderBy; orientation?: TPhotoOrietation; colors?: TPhotoColor } | undefined

export default function FilterSearchPhoto({
  query,
  orderBy,
  orientation,
  colors,
}: {
  query: string
  orderBy: string
  orientation: string
  colors: string
}) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [filter, setFilter] = useState<TFilter>({
    orderBy: (orderBy as TOrderBy) ?? 'relevant',
    orientation: orientation as TPhotoOrietation,
    colors: colors as TPhotoColor,
  })

  const router = useRouter()
  function handleFilter() {
    const filterOrderBy = !filter?.orderBy ? '' : filter.orderBy == 'relevant' ? '' : `&order_by=${filter.orderBy}`
    const filterOrientation = filter?.orientation ? `&orientation=${filter.orientation}` : ''
    const filterColors = filter?.colors ? `&colors=${filter.colors}` : ''

    setIsOpenModal(false)
    return router.push(`/s?v=${query}${filterOrderBy}${filterOrientation}${filterColors}`)
  }

  const compare =
    JSON.stringify({ colors: filter?.colors, orderBy: filter?.orderBy, orientation: filter?.orientation }) ==
    JSON.stringify({ colors: colors, orderBy: orderBy ?? 'relevant', orientation: orientation })

  return (
    <Dialog defaultOpen={isOpenModal} open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpenModal(true)}>
          <p>Filter</p> <Image src="/icons/filter.svg" alt="icon" height={17} width={17} />
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-8">
        <DialogHeader>
          <DialogTitle>Customize Search</DialogTitle>
          <DialogDescription>Refine your search with custom filters to find exactly what you&apos;re looking for.</DialogDescription>
        </DialogHeader>

        <OrderBy filter={filter} setFilter={setFilter} />
        <Orientation filter={filter} setFilter={setFilter} />
        <Colors filter={filter} setFilter={setFilter} />

        <div className="flex w-full justify-end gap-2">
          <Button variant="secondary" onClick={() => setFilter(undefined)}>
            <Image src="/icons/close.svg" alt="close" height={17} width={17} />
            <p>Clear</p>
          </Button>

          <Button disabled={compare} onClick={handleFilter}>
            <p>Filter</p> <Image src="/icons/filter.svg" alt="icon" width={17} height={17} className="invert" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function OrderBy({ filter, setFilter }: { filter: TFilter; setFilter: Dispatch<SetStateAction<TFilter>> }) {
  const orderBy: { label: TOrderBy; src: string; isActive: boolean }[] = [
    { label: 'relevant', src: '/icons/tag.svg', isActive: filter?.orderBy !== 'latest' },
    { label: 'latest', src: '/icons/hour-glass.svg', isActive: filter?.orderBy == 'latest' },
  ]

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Order by:</p>
      <div className="flex flex-wrap gap-2">
        {orderBy.map((v, i) => (
          <Button
            key={i}
            variant={v.isActive ? 'default' : 'outline'}
            onClick={() =>
              setFilter((prevFilter) => ({
                orderBy: v.label,
                colors: prevFilter?.colors,
                orientation: prevFilter?.orientation,
              }))
            }
          >
            <Image src={v.src} alt="icon" width={17} height={17} className={`${v.isActive ? 'invert' : ''}`} />
            <p className="first-letter:uppercase">{v.label}</p>
          </Button>
        ))}
      </div>
    </div>
  )
}

function Orientation({ filter, setFilter }: { filter: TFilter; setFilter: Dispatch<SetStateAction<TFilter>> }) {
  const orientations: { label: TPhotoOrietation; src: string; isActive: boolean }[] = [
    { label: 'portrait', src: '/icons/portrait.png', isActive: filter?.orientation == 'portrait' },
    { label: 'landscape', src: '/icons/landscape.png', isActive: filter?.orientation == 'landscape' },
    { label: 'squarish', src: '/icons/squarish.png', isActive: filter?.orientation == 'squarish' },
  ]

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Orientation:</p>

      <ul className="flex flex-wrap gap-2">
        {orientations.map((orientation, i) => (
          <li key={i}>
            <Button
              variant={orientation.isActive ? 'default' : 'outline'}
              onClick={() =>
                setFilter((prevFilter) => ({
                  orientation: prevFilter?.orientation == orientation.label ? undefined : orientation.label,
                  orderBy: prevFilter?.orderBy,
                  colors: prevFilter?.colors,
                }))
              }
            >
              <Image src={orientation.src} alt="icon" width={19} height={19} className={`${orientation.isActive ? 'invert' : ''}`} />
              <p className="first-letter:uppercase">{orientation.label}</p>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Colors({ filter, setFilter }: { filter: TFilter; setFilter: Dispatch<SetStateAction<TFilter | undefined>> }) {
  const colors: TPhotoColor[] = ['black_and_white', 'black', 'white', 'yellow', 'orange', 'red', 'purple', 'magenta', 'green', 'teal', 'blue']

  function handleFilter(newColor: TPhotoColor) {
    setFilter((prevFilter) => ({
      colors: prevFilter?.colors == newColor ? undefined : newColor,
      orderBy: prevFilter?.orderBy,
      orientation: prevFilter?.orientation,
    }))
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Color: </p>

      <ul className="flex flex-wrap gap-2">
        {colors.map((color, i) => (
          <li key={i}>
            <Button variant={filter?.colors?.includes(color) ? 'default' : 'outline'} onClick={() => handleFilter(color)}>
              <p>{color}</p>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
