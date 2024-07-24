import { CardContent, CardFooter } from '@/components/ui/card'
import AuthCard from '../_components/auth-card'
import OtherLoginMethods from '../_components/other-methods'
import { getJwtSessionCookie } from '@/lib/jwt-session'
import { TAuthTokenSessionLogin } from '@/schema/auth'
import LoginPasswordForm from '../_components/login-password-form'
import LoginEmailForm from '../_components/login-email-form'

export default async function LoginPage() {
  const authTokenSession = await getJwtSessionCookie<TAuthTokenSessionLogin>('lats')
  return (
    <AuthCard title="Welcome Back" description="Enter your login credentials">
      {authTokenSession?.email ? (
        <CardContent>
          <LoginPasswordForm email={authTokenSession.email} />
        </CardContent>
      ) : (
        <>
          <CardContent>
            <LoginEmailForm />
          </CardContent>
          <CardFooter className="flex-col">
            <OtherLoginMethods />
          </CardFooter>
        </>
      )}
    </AuthCard>
  )
}
