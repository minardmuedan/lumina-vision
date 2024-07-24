'use server'

import { invalidateLuciaSession, validateRequest } from '@/lib/lucia-auth/session'
import { TActionReturn } from '@/schema/auth'

export default async function logoutAction(): Promise<TActionReturn> {
  try {
    const { session } = await validateRequest()
    if (!session) return { type: 'error', cause: 'not_found', message: 'Unauthorized Access!' }

    await invalidateLuciaSession(session.id)
    return { type: 'success' }
  } catch {
    return { type: 'error', cause: 'server_error', message: 'Something went wrong!' }
  }
}
