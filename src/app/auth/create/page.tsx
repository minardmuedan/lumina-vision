import { CardContent, CardFooter } from '@/components/ui/card'

import AuthCard from '../_components/auth-card'
import OtherLoginMethods from '../_components/other-methods'
import CreateAccountForm from '../_components/signup-form'
import OtpForm from '../_components/otp-form'
import { getJwtSessionCookie } from '@/lib/jwt-session'
import { TAuthTokenSessionSignUp } from '@/schema/auth'
import CreatePasswordForm from '../_components/create-password-form'
import ResendToken from '../_components/resend-token'

export default async function CreateAccountPage() {
  const authTokenSession = await getJwtSessionCookie<TAuthTokenSessionSignUp>('ats')
  if (authTokenSession) {
    if (authTokenSession.purpose == 'chP') return <p>change password</p>
    if (authTokenSession.purpose == 'crP') return <CreatePasswordPage tokenId={authTokenSession.tokenId} />
    return <OtpFormPage tokenId={authTokenSession.tokenId} />
  }

  return (
    <AuthCard title="Create An Account" description="Start your journey with us">
      <CardContent>
        <CreateAccountForm />
      </CardContent>
      <CardFooter className="flex-col">
        <OtherLoginMethods />
      </CardFooter>
    </AuthCard>
  )
}

function OtpFormPage({ tokenId }: { tokenId: string }) {
  return (
    <AuthCard title="Enter Code" description="Check email for verification code">
      <CardContent className="flex flex-col items-center justify-center">
        <OtpForm tokenId={tokenId} />
      </CardContent>
      <CardFooter>
        <ResendToken tokenId={tokenId} />
      </CardFooter>
    </AuthCard>
  )
}

function CreatePasswordPage({ tokenId }: { tokenId: string }) {
  return (
    <AuthCard title="Create A Password" description="Finish setting up your account">
      <CardContent>
        <CreatePasswordForm tokenId={tokenId} />
      </CardContent>
    </AuthCard>
  )
}
