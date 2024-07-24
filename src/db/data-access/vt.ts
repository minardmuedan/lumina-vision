import 'server-only'
import { eq } from 'drizzle-orm'
import { db } from '..'
import { tokenTable } from '../schema'

export async function createVerificationTokenDb(id: string, token: string, payload: string) {
  await db.insert(tokenTable).values({
    id,
    token,
    payload,
    purpose: 'emailVerification',
  })
}

export async function getVerificationTokenDb(id: string) {
  const vt = await db
    .select()
    .from(tokenTable)
    .where((vt) => eq(vt.id, id))

  return vt[0]
}

export async function getVerificationTokenByPayloadDb(payload: string) {
  const vt = await db
    .select()
    .from(tokenTable)
    .where((vt) => eq(vt.payload, payload))

  return vt[0]
}

export async function renewVerificationTokenDb(tokenId: string, newId: string, token: string) {
  await db
    .update(tokenTable)
    .set({
      id: newId,
      token,
      purpose: 'emailVerification',
      updatedAt: new Date(),
    })
    .where(eq(tokenTable.id, tokenId))
}

export async function updateVerificationTokenToCreatePasswordDb(id: string) {
  await db
    .update(tokenTable)
    .set({
      purpose: 'createPassword',
      updatedAt: new Date(),
    })
    .where(eq(tokenTable.id, id))
}

export async function deleteVerificationTokenDb(id: string) {
  await db.delete(tokenTable).where(eq(tokenTable.id, id))
}
