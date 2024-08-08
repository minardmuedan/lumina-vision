'use server'

import { createAlbumDb, getAlbum } from '@/db/data-access/album'
import { generateId } from '@/lib/helpers'
import { validateRequest } from '@/lib/lucia-auth/session'
import { TActionReturn } from '@/schema/auth'
import { cache } from 'react'

export async function createAlbumAction(title: string, description: string): Promise<TActionReturn> {
  if (title === '' || title === undefined) return { type: 'error', cause: 'invalid', message: 'Invalid Credentials!' }

  try {
    const { user } = await validateRequest()
    if (!user?.id) return { type: 'error', cause: 'unauthorized', message: 'Unauthorized User!' }
    const isExistingAlbum = await getAlbum(title)
    if (isExistingAlbum) return { type: 'error', cause: 'already_exist', message: 'Album title already exist!' }

    const newId = generateId()
    await createAlbumDb(newId, user.id, title, description)

    return { type: 'success' }
  } catch {
    return { type: 'error', cause: 'server_error', message: 'Something went wrong!' }
  }
}
