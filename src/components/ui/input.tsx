'use client'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { SearchIcon } from 'lucide-react'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-normal file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export default function SearchInputForm({ className }: { className?: string }) {
  const router = useRouter()

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        router.push(`/search?query=${e.currentTarget['searchInput'].value}`)
      }}
      className={cn('relative', className)}
    >
      <Input id='searchInput' placeholder='Type here to find something new...' className='bg-accent pr-8' />
      <SearchIcon size={16} className='stroke-1.5 absolute right-3 top-1/2 -translate-y-1/2' />
    </form>
  )
}

export { Input }
