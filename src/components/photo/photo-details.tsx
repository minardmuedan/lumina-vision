import Tags from '@/components/tags'
import { Button } from '@/components/ui/button'
import { TCollection } from '@/schema/collection'
import { TFullPhoto } from '@/schema/photo'
import Image from 'next/image'
import Link from 'next/link'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { EllipsisVerticalIcon } from 'lucide-react'
import { DownloadButton } from './photo-btn'
import PhotoRelatedCollectionSection from '../collection/photo-related-collections'

export default function PhotoDetails({ photo }: { photo: TFullPhoto }) {
  const photoNavLinks = [
    { title: 'Add to Like', src: '/icons/heart-picture.svg' },
    { title: 'Add to Library', src: '/icons/library.svg' },
    { title: 'Share', src: '/icons/share.svg' },
  ]

  return (
    <>
      <div className="mx-auto mb-4 w-full md:w-fit">
        <header className="mb-3 flex items-center justify-between gap-2">
          <Link href={`/user/${photo.user.username}`} className="flex items-center gap-2 underline-offset-2 hover:underline">
            <Image src={photo.user.profile_image.medium} alt="profile_image" width={32} height={32} />
            <p>{photo.user.name}</p>
          </Link>

          <div className="flex items-center gap-2">
            <DownloadButton variant="outline" downloadLink={photo.links.download} />

            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" aria-label="menu-btn">
                  <EllipsisVerticalIcon size={19} />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-56 space-y-1 p-1">
                {photoNavLinks.map((navlink, i) => (
                  <Button key={i} variant="ghost" className="w-full justify-start">
                    <Image src={navlink.src} alt="icon" width={17} height={17} />
                    <p>{navlink.title}</p>
                  </Button>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        </header>

        <Image
          src={photo.urls.raw}
          alt={photo.alt_description}
          width={photo.width}
          height={photo.height}
          style={{ backgroundColor: photo.color }}
          className="w-full md:h-dvh md:max-h-[45rem] md:w-fit"
        />
      </div>

      <Tags tags={photo.tags} />

      <PhotoRelatedCollectionSection relatedCollections={photo.related_collections.results} />
    </>
  )
}
