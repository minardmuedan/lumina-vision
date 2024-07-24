import 'server-only'
import { eq } from 'drizzle-orm'
import { db } from '..'
import { tokenTable, userTable } from '../schema'

export async function createUserDb(
  id: string,
  oauthId: string | null,
  provider: 'credentials' | 'google' | 'github',
  name: string | null,
  email: string,
  emailVerified: boolean,
  password: string | null,
  avatarUrl: string | null,
) {
  await db.insert(userTable).values({ id, oauthId, provider, name, email, emailVerified, password, avatarUrl })
}

export async function createUserThenDeleteTokenDb(
  tokenId: string,
  id: string,
  oauthId: string | null,
  provider: 'credentials' | 'google' | 'github',
  name: string | null,
  email: string,
  emailVerified: boolean,
  password: string | null,
  avatarUrl: string | null,
) {
  await db.transaction(async (trx) => {
    await trx.insert(userTable).values({ id, oauthId, provider, name, email, emailVerified, password, avatarUrl })
    await trx.delete(tokenTable).where(eq(tokenTable.id, tokenId))
  })
}

export async function getUserByOauthIdDb(oauthId: string) {
  const user = await db.select().from(userTable).where(eq(userTable.oauthId, oauthId))
  return user[0]
}

export async function getUserByEmailDb(email: string) {
  const user = await db.select().from(userTable).where(eq(userTable.email, email))
  return user[0]
}
