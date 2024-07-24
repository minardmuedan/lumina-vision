import { lucia } from '.'
import { getJwtSessionCookie, setJwtSessionCookie } from '../jwt-session'
import { cache } from 'react'
import { TLuciaAuthTokenSession } from '@/schema/auth'
import { getIpAddress } from '../helpers'

export async function createLuciaSession(userId: string) {
  const session = await lucia.createSession(userId, { ipAddress: getIpAddress() })
  const sessionCookie = lucia.createSessionCookie(session.id)
  await setJwtSessionCookie<TLuciaAuthTokenSession>(sessionCookie.name, { id: sessionCookie.value }, sessionCookie.attributes)
}

export const validateRequest = cache(async () => {
  const cookieSession = await getJwtSessionCookie<TLuciaAuthTokenSession>(lucia.sessionCookieName)
  if (!cookieSession?.id) return { session: null, user: null }
  const { session, user } = await lucia.validateSession(cookieSession.id)
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id)
      await setJwtSessionCookie<TLuciaAuthTokenSession>(sessionCookie.name, { id: sessionCookie.value }, sessionCookie.attributes)
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      await setJwtSessionCookie<TLuciaAuthTokenSession>(sessionCookie.name, { id: sessionCookie.value }, sessionCookie.attributes)
    }
  } catch {}
  return { session, user }
})

export async function invalidateLuciaSession(sessionId: string) {
  await lucia.invalidateSession(sessionId)

  const sessionCookie = lucia.createBlankSessionCookie()
  await setJwtSessionCookie<TLuciaAuthTokenSession>(sessionCookie.name, { id: sessionCookie.value }, sessionCookie.attributes)
}
