'use client'

import { resendVerificationTokenAction } from '@/action/verification-token'
import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function ResendToken({ tokenId }: { tokenId: string }) {
  const [isResending, setIsResending] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  const router = useRouter()
  async function handleOnClick() {
    setIsResending(true)
    const action = await resendVerificationTokenAction(tokenId)
    setIsResending(false)

    if (action.type == 'success') {
      return toast.success('Sent! Check your email inbox')
    }

    if (action.cause == 'limit') {
      setTimeLeft(Number(action.message))
      toast(`Please wait briefly, before resending again`)
    } else {
      toast.error(action.message)
      if (action.cause == 'not_found') router.refresh()
    }
  }

  useEffect(() => {
    if (timeLeft) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
      return () => clearInterval(intervalId)
    }
  }, [timeLeft])

  return (
    <div className="flex w-full items-center justify-center gap-1">
      <p className="text-sm text-muted-foreground">
        didn<span>&#39;</span>t recieve any code?
      </p>
      <Button
        variant="ghost"
        onClick={handleOnClick}
        disabled={timeLeft > 0 ?? isResending}
        className="size-fit p-0 font-normal text-primary/75 underline underline-offset-2 transition-colors ease-in-out hover:bg-background hover:text-primary md:no-underline md:hover:underline"
      >
        {timeLeft > 0 ? (
          `resend in ${timeLeft} seconds`
        ) : isResending ? (
          <div className="px-2">
            <Loader />
          </div>
        ) : (
          'resend'
        )}
      </Button>
    </div>
  )
}
