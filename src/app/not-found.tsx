import Icon from '@/components/icon'
import BackButton from '@/components/ui/back-button'
import { buttonVariants } from '@/components/ui/button'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <section className='flex min-h-[calc(100dvh-121px)] flex-col items-center justify-center px-2 py-10 md:min-h-dvhMinusNav md:px-10 lg:px-20'>
      <Icon icon='404' size={80} />

      <h1 className='mt-10 text-2xl md:text-4xl'>Page Not Found</h1>
      <p className='mb-8 mt-1 text-muted-foreground'>404 Error: The page took a detour and got lost.</p>

      <div className='flex gap-2'>
        <BackButton />
        <Link href='/' className={buttonVariants()} replace>
          <HomeIcon strokeWidth={1.4} size={16} />
          <p>Home</p>
        </Link>
      </div>
    </section>
  )
}
