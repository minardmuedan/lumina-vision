'use client'

import { signInWithGithub, signInWithGoogle } from '@/action/login'
import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { useGlobalSubmitDisabler } from '@/lib/zustand-context'
import Image from 'next/image'
import { useState } from 'react'

export default function OtherLoginMethods() {
  const [isSubmitting, setIsSubmitting] = useState({ google: false, github: false })
  const { isDisable, setIsDisable } = useGlobalSubmitDisabler()

  async function handleSubmit(provider: 'google' | 'github') {
    setIsDisable(true)

    if (provider === 'google') {
      setIsSubmitting({ google: true, github: false })
      await signInWithGoogle()
    }

    if (provider === 'github') {
      setIsSubmitting({ google: false, github: true })
      await signInWithGithub()
    }

    setIsSubmitting({ google: false, github: false })
    setIsDisable(false)
  }

  return (
    <div className="w-full">
      <div className="relative mb-6 flex w-full items-center justify-center after:absolute after:left-0 after:top-1/2 after:w-full after:-translate-y-1/2 after:border-b">
        <p className="z-10 bg-background px-3 text-sm text-muted-foreground md:px-2">
          or <span className="hidden md:inline">continue with</span>
        </p>
      </div>

      <div className="flex w-full flex-col items-center gap-2 md:flex-row">
        <Button
          variant="outline"
          disabled={isDisable}
          className="w-full gap-2 bg-accent py-6 hover:bg-accent/75"
          onClick={() => handleSubmit('google')}
        >
          {isSubmitting.google ? (
            <Loader />
          ) : (
            <>
              <Image src="/google.svg" alt="google-icon" width={18} height={18} />
              <p>
                <span className="text-muted-foreground md:hidden">Continue with </span>Google
              </p>
            </>
          )}
        </Button>
        <Button variant="outline" disabled={isDisable} className="w-full gap-2 py-6" onClick={() => handleSubmit('github')}>
          {isSubmitting.github ? (
            <Loader />
          ) : (
            <>
              <Image src="/github.svg" alt="github-icon" width={18} height={18} />
              <p>
                <span className="text-muted-foreground md:hidden">Continue with </span>Github
              </p>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
