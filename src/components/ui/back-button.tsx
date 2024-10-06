'use client'

import { useRouter } from 'next/navigation'
import { Button } from './button'
import Icon from '../icon'

export default function BackButton() {
  const router = useRouter()
  return (
    <Button variant='secondary' onClick={() => router.back()}>
      <Icon icon='return' />
      back
    </Button>
  )
}
