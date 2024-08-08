import Image from 'next/image'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'
import { redirect } from 'next/navigation'

type Props = {
  placeholder: string
  className?: string
  disabled?: boolean
  searchFor?: 'photos' | 'collections' | 'users' | 'topic'
}

export default function SearchInput({ searchFor = 'photos', placeholder, className, disabled = false }: Props) {
  return (
    <div className={cn('relative', className)}>
      <form
        action={async (formData) => {
          'use server'
          const searchInput = formData.get('search')
          return redirect(`/s${searchFor == 'photos' ? '' : `/${searchFor}`}?v=${searchInput}`)
        }}
      >
        <Input type="search" name="search" placeholder={placeholder} disabled={disabled} className="peer pl-8" />
      </form>
      <Image
        src="/icons/search.svg"
        alt="search-icon"
        width={19}
        height={19}
        className="absolute left-0 top-1/2 -translate-y-1/2 opacity-50 transition-opacity ease-in peer-focus:opacity-100"
      />
    </div>
  )
}
