'use server'

import { getUserByEmailDb } from '@/db/data-access/user'
import { deleteCookie, getIpAddress, setCookie, verifyPassword } from '@/lib/helpers'
import { setJwtSessionCookie } from '@/lib/jwt-session'
import { limitByIdentifier } from '@/lib/limiter'
import { github, google } from '@/lib/lucia-auth/providers'
import { createLuciaSession } from '@/lib/lucia-auth/session'
import { emailSchema, loginSchema, TActionReturn, TAuthTokenSessionLogin } from '@/schema/auth'
import { generateCodeVerifier, generateState } from 'arctic'
import { redirect } from 'next/navigation'

export async function emailRedirectAction(values: unknown): Promise<TActionReturn> {
  const validatedFields = emailSchema.safeParse(values)
  if (!validatedFields.success) return { type: 'error', cause: 'invalid', message: 'Invalid Credentials!' }

  const ip = getIpAddress()
  const limit = limitByIdentifier(ip ?? validatedFields.data.email, 6, 180)
  if (limit.isExceed) return { type: 'error', cause: 'limit', message: `${limit.remainingSecond}` }

  await setJwtSessionCookie<TAuthTokenSessionLogin>('lats', { email: validatedFields.data.email }, { maxAge: 30 * 60, httpOnly: true })
  return { type: 'success' }
}

export async function loginAction(values: unknown): Promise<TActionReturn> {
  const validatedFields = loginSchema.safeParse(values)
  if (!validatedFields.success) return { type: 'error', cause: 'invalid', message: 'Invalid Credentials!' }

  const { email, password: inputtedPassword } = validatedFields.data

  const limit = limitByIdentifier(email)
  if (limit.isExceed) return { type: 'error', cause: 'limit', message: `${limit.remainingSecond}` }

  try {
    const user = await getUserByEmailDb(email)
    if (!user || user.provider !== 'credentials' || !user.emailVerified || !user.password)
      return { type: 'error', cause: 'not_found', message: 'No matching user found' }

    const comparePassword = await verifyPassword(user.password, inputtedPassword)
    if (!comparePassword) return { type: 'error', cause: 'incorrect', message: 'Incorrect email or password. Please try again' }

    deleteCookie('lats')
    await createLuciaSession(user.id)
    return { type: 'success', message: "Welcome back! You're logged in" }
  } catch {
    return { type: 'error', cause: 'server_error', message: 'Something went wrong!' }
  }
}

//
// other sign in providers
//
export async function signInWithGoogle() {
  await new Promise((res) => setTimeout(res, 5000))
  const state = generateState()
  const codeVerifier = generateCodeVerifier()
  const url = await google.createAuthorizationURL(state, codeVerifier, { scopes: ['profile', 'email'] })

  cookiesStateSetter('google_oauth_state', state)
  cookiesStateSetter('code_verifier', codeVerifier)
  return redirect(url.toString())
}

export async function signInWithGithub() {
  await new Promise((res) => setTimeout(res, 5000))

  const state = generateState()
  const url = await github.createAuthorizationURL(state, {
    scopes: ['user:email'],
  })

  cookiesStateSetter('github_oauth_state', state)
  return redirect(url.toString())
}

function cookiesStateSetter(key: string, value: string) {
  setCookie(key, value, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  })
}
