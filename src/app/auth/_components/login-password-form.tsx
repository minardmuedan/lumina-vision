'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginPasswordSchema, TActionReturn, TLoginPassword } from '@/schema/auth'
import Loader from '@/components/loader'
import ErrorMessage from './error-message'
import { loginAction } from '@/action/login'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'

export default function LoginForm({ email }: { email: string }) {
  const [isHidden, setIsHidden] = useState(true)
  const [actionResult, setActionResult] = useState<TActionReturn>()
  const [timeLeft, setTimeLeft] = useState(0)

  const form = useForm<TLoginPassword>({
    resolver: zodResolver(loginPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const router = useRouter()
  async function onSubmit(values: TLoginPassword) {
    setActionResult(undefined)

    const action = await loginAction({
      email,
      password: values.password,
    })
    setActionResult(action)

    if (action.type == 'success') {
      toast.success(action.message)
      return router.refresh()
    }
    if (action.cause == 'limit') {
      setTimeLeft(Number(action.message))
      setActionResult({ ...action, message: `Please wait ${action.message} second/s before trying again` })
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={isHidden ? 'password' : 'text'} placeholder="********" {...field} className="pr-9" />
                  <button
                    type="button"
                    onClick={() => setIsHidden(!isHidden)}
                    className="hiv absolute right-2 top-1/2 -translate-y-1/2 p-1 transition-colors ease-out hover:bg-accent"
                  >
                    {isHidden ? (
                      <Image src="/icons/view-eye-show.svg" alt="eye-on" width={17} height={17} />
                    ) : (
                      <Image src="/icons/view-eye-hide.svg" alt="eye-off" width={17} height={17} />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <ErrorMessage actionResult={actionResult} />

          <Button type="submit" disabled={(actionResult !== undefined || timeLeft > 0) ?? form.formState.isSubmitting} className="w-full">
            {timeLeft > 0 ? (
              `Wait ${timeLeft} seconds before submitting again`
            ) : form.formState.isSubmitting ? (
              <Loader className="invert" />
            ) : actionResult?.type == 'success' ? (
              'redirecting...'
            ) : (
              'Continue'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
