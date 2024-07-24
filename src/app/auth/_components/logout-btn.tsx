'use client'

import logoutAction from '@/action/logout'
import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function LogoutBtn() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  async function handleLogout() {
    setIsSubmitting(true)
    const action = await logoutAction()
    setIsSubmitting(false)
    if (action.type === 'success') {
      toast.success('Logout successful! See you next time!')
      return router.push('/auth/login')
    }

    toast.error(action.message)
  }

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="justify-start border border-destructive/0 text-destructive transition-colors ease-in hover:border-destructive hover:bg-background hover:text-destructive"
    >
      {isSubmitting ? (
        <Loader />
      ) : (
        <>
          <Image src="/icons/logout.svg" alt="logout-icon" width={19} height={19} />
          <p>Logout</p>
        </>
      )}
    </Button>
  )
}
