'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import createAccountAction from '@/action/create-account'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailSchema, TActionReturn, TEmail } from '@/schema/auth'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import ErrorMessage from './error-message'
import Loader from '@/components/loader'
import { useGlobalSubmitDisabler } from '@/lib/zustand-context'

export default function CreateAccountForm() {
  const [actionResult, setActionResult] = useState<TActionReturn>()
  const [timeLeft, setTimeLeft] = useState(0)

  const form = useForm<TEmail>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  })
  const router = useRouter()
  const { isDisable, setIsDisable } = useGlobalSubmitDisabler()
  async function onSubmit(values: TEmail) {
    setIsDisable(true)
    setActionResult(undefined)

    const action = await createAccountAction(values)
    setIsDisable(false)
    if (action.type == 'success') {
      setActionResult(action)
      return router.refresh()
    }

    if (action.cause == 'limit') {
      setActionResult({ ...action, message: `Please wait ${action.message} second/s before trying again` })
      setTimeLeft(Number(action.message))
    } else setActionResult(action)
    setTimeout(() => setActionResult(undefined), 3000)
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
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  {...field}
                  className="border-0 border-b border-foreground/50 focus-visible:border-foreground focus-visible:ring-0"
                />
              </FormControl>
              <FormDescription>This will be your login method</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <ErrorMessage actionResult={actionResult} />

          <Button type="submit" disabled={(actionResult != undefined || isDisable) ?? timeLeft > 0 ?? form.formState.isSubmitting} className="w-full">
            {timeLeft > 0 ? (
              `Wait ${timeLeft} seconds before submitting again`
            ) : form.formState.isSubmitting ? (
              <Loader className="invert" />
            ) : actionResult?.type == 'success' ? (
              'redirecting...'
            ) : (
              'Create Account'
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-normal text-foreground underline underline-offset-2">
              Login
            </Link>
          </p>
        </div>
      </form>
    </Form>
  )
}
