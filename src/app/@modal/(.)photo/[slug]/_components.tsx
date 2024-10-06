'use client'
import { usePathname, useRouter } from 'next/navigation'
import { RemoveScroll } from 'react-remove-scroll'

export default function ModalWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathName = usePathname()
  if (!pathName.startsWith('/photo/')) return null

  return (
    <RemoveScroll>
      <section onClick={() => router.back()} className='fixed inset-0 z-50 overflow-y-auto bg-black/20 pt-60'>
        <div onClick={e => e.stopPropagation()} className='min-h-[calc(100dvh-15rem)] bg-background px-5 py-10 sm:px-10'>
          {children}
        </div>
      </section>
    </RemoveScroll>
  )
}
