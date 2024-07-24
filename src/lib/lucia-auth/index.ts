import { db } from '@/db'
import { Lucia } from 'lucia'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { sessionTable, userTable } from '@/db/schema'

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.name,
      email: attributes.email,
      avatarUrl: attributes.avatarUrl,
      provider: attributes.provider,
    }
  },
  getSessionAttributes: (attributes) => {
    return {
      ip: attributes.ipAddress,
    }
  },
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
    DatabaseSessionAttributes: DatabaseSessionAttributes
  }
}
interface DatabaseUserAttributes {
  name: string | null
  email: string
  avatarUrl: string | null
  provider: 'credentials' | 'google' | 'github'
}
interface DatabaseSessionAttributes {
  ipAddress: string | null
}
