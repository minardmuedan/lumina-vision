'use client'

import verifyVerificationTokenAction from '@/action/verification-token'
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp'
import { TActionReturn } from '@/schema/auth'
import { useEffect, useState } from 'react'
import ErrorMessage from './error-message'
import Loader from '@/components/loader'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function OtpForm({ tokenId }: { tokenId: string }) {
  const [inputtedValue, setInputtedValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [actionResult, setActionResult] = useState<TActionReturn>()
  const [timeLeft, setTimeLeft] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (timeLeft) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
      return () => clearInterval(intervalId)
    }
  }, [timeLeft])

  async function handleSubmit(value: string) {
    setIsSubmitting(true)
    setInputtedValue('')

    const action = await verifyVerificationTokenAction(tokenId, value)
    setIsSubmitting(false)

    if (action.type == 'success') return router.refresh()

    if (action.cause == 'not_found' || action.cause == 'expired') {
      toast.error(action.message)
      return router.refresh()
    } else {
      if (action.cause == 'limit') {
        setActionResult({ type: 'error', cause: 'limit', message: `Please wait ${action.message} second/s before trying again.` })
        setTimeLeft(Number(action.message))
      } else setActionResult(action)

      setTimeout(() => setActionResult(undefined), 2000)
    }
  }
  if (timeLeft > 0)
    return (
      <div className="flex h-10 items-center">
        <p className="text-sm text-muted-foreground">Please wait {timeLeft} second/s before trying again</p>
      </div>
    )

  if (actionResult?.type == 'error')
    return (
      <div className="flex h-10">
        <ErrorMessage actionResult={actionResult} />
      </div>
    )

  if (isSubmitting)
    return (
      <div className="flex h-10 items-center">
        <Loader />
      </div>
    )

  return (
    <InputOTP maxLength={6} onComplete={handleSubmit} onChange={(v) => setInputtedValue(v)} value={inputtedValue}>
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <InputOTPSlot key={i} index={i} className="rounded-none border border-primary/25" />
        ))}
    </InputOTP>
  )
}
