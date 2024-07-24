import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { CookieAttributes } from 'lucia'
import { getCookie, setCookie } from './helpers'

const secret_key = new TextEncoder().encode(process.env.SECRET_KEY)

type TJwtPayload = { [key: string]: unknown }

async function jwtEncrypt(payload: TJwtPayload) {
  try {
    const token = await new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().sign(secret_key)
    return token
  } catch {
    return null
  }
}

export async function setJwtSessionCookie<T extends TJwtPayload>(key: string, value: T, cookieAttr: CookieAttributes) {
  const token = await jwtEncrypt(value)
  if (!token) throw new Error('Invalid Token')
  setCookie(key, token, cookieAttr)
}
export async function getJwtSessionCookie<T>(key: string): Promise<T | null> {
  const et = getCookie(key)
  if (et) {
    try {
      const { payload } = await jwtVerify(et, secret_key)
      if (payload) return payload as T
    } catch {
      return null
    }
  }

  return null
}
