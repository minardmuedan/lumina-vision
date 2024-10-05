'use client'

import { Button } from '@/components/ui/button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className='flex min-h-dvhMinusNav flex-col items-center justify-center'>
      <h2>{error.message}</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
