'use server'

import { emailSchema, passwordSchema, TActionReturn, TAuthTokenSessionSignUp } from '@/schema/auth'
import { createVerificationTokenDb, getVerificationTokenByPayloadDb, getVerificationTokenDb, renewVerificationTokenDb } from '@/db/data-access/vt'
import { setJwtSessionCookie } from '@/lib/jwt-session'
import { createUserThenDeleteTokenDb, getUserByEmailDb } from '@/db/data-access/user'
import { limitByIdentifier } from '@/lib/limiter'
import { deleteCookie, generateCode, generateId, getIpAddress, hashPassword } from '@/lib/helpers'
import { createLuciaSession } from '@/lib/lucia-auth/session'

export default async function createAccountAction(values: unknown): Promise<TActionReturn> {
  const validatedFields = emailSchema.safeParse(values)
  if (!validatedFields.success) return { type: 'error', cause: 'invalid', message: 'Invalid Credentials!' }

  const { email } = validatedFields.data

  const ip = getIpAddress()
  const limit = limitByIdentifier(ip ?? email, 20, 180)
  if (limit.isExceed) return { type: 'error', cause: 'limit', message: `${limit.remainingSecond}` }

  try {
    const existingUser = await getUserByEmailDb(email)
    if (existingUser && existingUser.provider === 'credentials') return { type: 'error', cause: 'already_exist', message: 'Email already exist!' }

    const newId = generateId()
    const code = generateCode()

    const existingVerificationToken = await getVerificationTokenByPayloadDb(email)

    if (existingVerificationToken && existingVerificationToken.purpose !== 'changePassword') {
      await renewVerificationTokenDb(existingVerificationToken.id, newId, code) // renew existing token
    } else await createVerificationTokenDb(newId, code, email) // create a new token

    // --> delete from here
    console.log('6 DIGIT CODE: ', code)
    // !!! create email sending function here.
    // to here <--

    await setJwtSessionCookie<TAuthTokenSessionSignUp>('ats', { tokenId: newId, purpose: 'eV' }, { maxAge: 30 * 60, httpOnly: true })
    return { type: 'success' }
  } catch (err) {
    return { type: 'error', cause: 'server_error', message: 'Something went wrong!' }
  }
}

// finish the create account process
export async function createAPasswordAction(tokenId: string, values: unknown): Promise<TActionReturn> {
  const validatedFields = passwordSchema.safeParse(values)
  if (!validatedFields.success) return { type: 'error', cause: 'invalid', message: 'Invalid Credentials!' }

  const { password } = validatedFields.data

  try {
    const verificationToken = await getVerificationTokenDb(tokenId)
    if (!verificationToken || verificationToken.purpose !== 'createPassword') {
      deleteCookie('ats')
      return { type: 'error', cause: 'not_found', message: 'Unknown Token! Sign up Again' }
    }

    const isExpired = Date.now() > verificationToken.updatedAt.getTime() + 30 * 60 * 1000
    if (isExpired) {
      deleteCookie('ats')

      return { type: 'error', cause: 'expired', message: 'Expired Token! Sign up Again' }
    }

    const newId = generateId()
    const hashedPassword = await hashPassword(password)
    await createUserThenDeleteTokenDb(verificationToken.id, newId, null, 'credentials', null, verificationToken.payload, true, hashedPassword, null)

    deleteCookie('ats')
    await createLuciaSession(newId)

    return { type: 'success', message: `Success! Welcome ${verificationToken.payload}` }
  } catch (err) {
    return { type: 'error', cause: 'server_error', message: 'Something went wrong!' }
  }
}
