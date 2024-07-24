'use client'

import { ChangeEvent, FormEvent, useState } from 'react'

import { passwordSchema, TActionReturn, TPassword } from '@/schema/auth'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import ErrorMessage from './error-message'
import Loader from '@/components/loader'
import zxcvbn from 'zxcvbn'
import { createAPasswordAction } from '@/action/create-account'
import { toast } from 'sonner'

export default function CreatePasswordForm({ tokenId }: { tokenId: string }) {
  const [values, setValues] = useState({ password: '' })
  const [typeError, setTypeError] = useState(passwordSchema.safeParse({ password: '' }).error?.flatten().fieldErrors.password)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordScore, setPasswordScore] = useState(0)
  const [actionResult, setActionResult] = useState<TActionReturn>()

  const router = useRouter()

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const inputtedValue = e.target.value
    setValues({ password: inputtedValue })
    setPasswordScore(zxcvbn(inputtedValue).score)
    const validateFields = passwordSchema.safeParse({ password: inputtedValue })
    setTypeError(validateFields.error?.flatten().fieldErrors.password)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    const action = await createAPasswordAction(tokenId, values)
    setIsSubmitting(false)
    setActionResult(action)

    if (action.type == 'success') {
      toast.success(action.message ?? 'Success! Welcome')
      return router.push('/')
    }

    if (action.cause == 'not_found' || action.cause == 'expired') {
      toast.error(action.message)
      router.refresh
    } else {
      setTimeout(() => setActionResult(undefined), 2000)
    }
  }
  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <Input type="text" placeholder="********" onChange={handleOnChange} value={values.password} />

        <ul className="flex gap-2">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <li
                key={i}
                className={`h-1 flex-1 ${i >= passwordScore ? 'bg-accent' : passwordScore == 1 ? 'bg-destructive' : passwordScore == 2 ? 'bg-orange-500' : passwordScore == 3 ? 'bg-yellow-500' : 'bg-green-500'}`}
              ></li>
            ))}
        </ul>

        <p
          className={`text-sm ${values.password == '' ? 'text-muted-foreground' : passwordScore <= 1 ? 'text-destructive' : passwordScore == 2 ? 'text-orange-500' : passwordScore == 3 ? 'text-yellow-500' : 'text-green-500'}`}
        >
          {!values.password
            ? 'Create a strong password'
            : passwordScore <= 1
              ? 'Very Weak! 💤'
              : passwordScore == 2
                ? 'Weak! 😓'
                : passwordScore == 3
                  ? 'Fair 😐'
                  : 'Strong 💪'}
        </p>
      </div>

      {typeError && (
        <ul className="list-inside list-disc text-sm">
          {typeError.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}

      <div className="space-y-2">
        <ErrorMessage actionResult={actionResult} />

        <Button type="submit" disabled={typeError != undefined ?? isSubmitting ?? actionResult?.type == 'success'} className="w-full">
          {typeError != undefined ? (
            'Meet Password Strength Requirements'
          ) : actionResult?.type == 'success' ? (
            'redirecting...'
          ) : isSubmitting ? (
            <Loader className="invert" />
          ) : (
            'Complete Signup!'
          )}
        </Button>
      </div>
    </form>
  )
}
