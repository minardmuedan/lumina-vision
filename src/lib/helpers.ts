import 'server-only'
import { CookieAttributes, generateIdFromEntropySize } from 'lucia'
import { cookies, headers } from 'next/headers'
import { alphabet, generateRandomString } from 'oslo/crypto'
import { hash, compare } from 'bcrypt'

export function getIpAddress() {
  const forwardedFor = headers().get('x-forwarded-for')

  return (forwardedFor ? forwardedFor.split(',')[0].trim() : headers().get('x-real-ip')) ?? null
}

export function generateId() {
  return generateIdFromEntropySize(10)
}

export function generateCode() {
  return generateRandomString(6, alphabet('0-9'))
}

export async function hashPassword(password: string) {
  const saltRounds = 10
  return await hash(password, saltRounds)
}

export async function verifyPassword(hashedPassword: string, password: string) {
  return await compare(hashedPassword, password)
}

export function setCookie(key: string, value: string, attr: CookieAttributes) {
  cookies().set(key, value, attr)
}
export function getCookie(key: string) {
  return cookies().get(key)?.value ?? null
}
export function deleteCookie(key: string) {
  return cookies().delete(key)
}
