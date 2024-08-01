'use client'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import Image from 'next/image'
import { NoScroll } from './client-sub-component'

export function GridWrapperUl({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ul className={cn('grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:gap-5 lg:grid-cols-4', className)}>{children}</ul>
}

export function ModalWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <NoScroll noIsolation>
      <div onClick={() => router.back()} className="fixed inset-0 z-50 w-full overflow-y-auto bg-black/10 pt-[30dvh] backdrop-blur-md">
        <div onClick={(e) => e.stopPropagation()} className="modal container relative mx-auto w-full bg-background p-20 px-3 md:px-8 lg:px-20">
          <Button size="icon" variant="ghost" aria-label="close-modal" onClick={() => router.back()} className="absolute right-1 top-1">
            <Image src="/icons/close.svg" alt="close-icon" width={19} height={19} />
          </Button>
          {children}
        </div>
      </div>
    </NoScroll>
  )
}
