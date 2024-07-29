'use client'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { RemoveScroll } from 'react-remove-scroll'
import { Button } from './ui/button'
import Image from 'next/image'

export function GridWrapperUl({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ul className={cn('grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:gap-5 lg:grid-cols-4', className)}>{children}</ul>
}

export function ModalWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <RemoveScroll className="fixed inset-0 z-50 overflow-y-auto">
      <div onClick={() => router.back()} className="w-full bg-black/10 pt-[30dvh] backdrop-blur-md">
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal container relative mx-auto w-full animate-pop-up bg-background p-20 px-3 md:px-8 lg:px-20"
        >
          <Button size="icon" variant="ghost" aria-label="close-modal" onClick={() => router.back()} className="absolute right-1 top-1">
            <Image src="/icons/close.svg" alt="close-icon" width={19} height={19} />
          </Button>
          {children}
        </div>
      </div>
    </RemoveScroll>
  )
}
