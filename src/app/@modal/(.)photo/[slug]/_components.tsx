'use client'
import Icon from '@/components/icon'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { RemoveScroll } from 'react-remove-scroll'

export default function ModalWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathName = usePathname()
  if (!pathName.startsWith('/photo/')) return null

  return (
    <RemoveScroll>
      <section onClick={() => router.back()} className='fixed inset-0 z-50 overflow-y-auto bg-black/20 pt-60'>
        <div onClick={e => e.stopPropagation()} className='relative min-h-[calc(100dvh-15rem)] bg-background px-5 py-10 sm:px-10'>
          <div className='absolute right-2 top-2 flex justify-end'>
            <Button variant='ghost' size='icon' onClick={() => router.back()}>
              <Icon icon='close' /> <span className='sr-only'>close photo modal</span>
            </Button>
          </div>
          {children}
        </div>
      </section>
    </RemoveScroll>
  )
}
