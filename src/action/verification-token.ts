'use server'

import { getVerificationTokenDb, renewVerificationTokenDb, updateVerificationTokenToCreatePasswordDb } from '@/db/data-access/vt'
import { deleteCookie, generateCode } from '@/lib/helpers'
import { setJwtSessionCookie } from '@/lib/jwt-session'
import { limitByIdentifier } from '@/lib/limiter'
import { TActionReturn, TAuthTokenSessionSignUp } from '@/schema/auth'

export default async function verifyVerificationTokenAction(tokenId: string, values: string): Promise<TActionReturn> {
  const limit = limitByIdentifier(tokenId, 5, 60)
  if (limit.isExceed) return { type: 'error', cause: 'limit', message: `${limit.remainingSecond}` }

  try {
    const verificationToken = await getVerificationTokenDb(tokenId)
    if (!verificationToken) {
      deleteCookie('ats')
      return { type: 'error', cause: 'not_found', message: 'Unknown Token! Sign up Again' }
    }

    const isExpired = Date.now() > verificationToken.updatedAt.getTime() + 30 * 60 * 1000
    if (isExpired) {
      deleteCookie('ats')
      return { type: 'error', cause: 'expired', message: 'Expired Token! Sign up Again' }
    }

    if (values !== verificationToken.token) return { type: 'error', cause: 'incorrect', message: 'Incorrect Code' }

    await updateVerificationTokenToCreatePasswordDb(verificationToken.id)
    await setJwtSessionCookie<TAuthTokenSessionSignUp>('ats', { tokenId: verificationToken.id, purpose: 'crP' }, { maxAge: 30 * 60, httpOnly: true })
    return { type: 'success' }
  } catch {
    return { type: 'error', cause: 'server_error', message: 'Something went wrong!' }
  }
}

export async function resendVerificationTokenAction(tokenId: string): Promise<TActionReturn> {
  const limit = limitByIdentifier(`resend-${tokenId}`, 1)
  if (limit.isExceed) return { type: 'error', cause: 'limit', message: `${limit.remainingSecond}` }

  try {
    const verificationToken = await getVerificationTokenDb(tokenId)
    if (!verificationToken) {
      deleteCookie('ats')
      return { type: 'error', cause: 'not_found', message: 'Unknown Token! Sign up Again' }
    }

    const code = generateCode()
    await renewVerificationTokenDb(tokenId, tokenId, code)
    await setJwtSessionCookie<TAuthTokenSessionSignUp>('ats', { tokenId, purpose: 'eV' }, { maxAge: 30 * 60, httpOnly: true })

    // TODO: resend code to email function
    console.log('NEW VERIFICATION CODE: ', code)

    return { type: 'success' }
  } catch {
    return { type: 'error', cause: 'server_error', message: 'Something went wrong!' }
  }
}
