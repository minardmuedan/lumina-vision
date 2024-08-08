'use client'

import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AddAlbum } from '../album'
import NoResult from '../no-results'

export function DownloadButton({ variant, className, downloadLink }: { variant?: 'outline' | 'ghost'; className?: string; downloadLink: string }) {
  if (!downloadLink) return null
  return (
    <Button variant={variant} asChild className={className}>
      <Link href={`${downloadLink}&force=true`} target="_blank" download>
        <Image src="/icons/download.svg" alt="" width={17} height={17} />
        <p>Download</p>
      </Link>
    </Button>
  )
}

export function AddToAlbumButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <Image src="/icons/library.svg" alt="icon" height={17} width={17} />
          <p>Add to Album</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Album</DialogTitle>
          <DialogDescription>Choose an album or create a new one to organize your media</DialogDescription>
        </DialogHeader>

        {true ? (
          <div className="flex flex-col gap-2">
            {Array(3)
              .fill('')
              .map((_, i) => (
                <Button key={i} variant="outline" className="h-16 max-w-full items-start justify-start gap-4">
                  <div className="aspect-square h-full bg-sky-500"></div>

                  <div className="flex-1 text-start">
                    <p>Album #1</p>
                    <p className="max-w-40 overflow-hidden text-ellipsis text-xs text-muted-foreground">album description</p>
                  </div>

                  <p className="text-xs text-muted-foreground">41 photos</p>
                </Button>
              ))}
          </div>
        ) : (
          <NoResult msg="You don't have any album!" />
        )}
        <div className="flex justify-end">
          <AddAlbum />
        </div>
      </DialogContent>
    </Dialog>
  )
}
