import Icon from '../icon'
import { Button } from './button'

export function InfiniteScrollLoader() {
  return (
    <div className='flex w-full justify-center py-10'>
      <Icon icon='loader' className='animate-spin' />
    </div>
  )
}

export function InfiniteScrollError({ message, refetch }: { message: string; refetch: () => void }) {
  return (
    <div className='flex flex-col items-center gap-2 py-5'>
      <p>{message}</p>
      <Button onClick={refetch}>Retry</Button>
    </div>
  )
}
