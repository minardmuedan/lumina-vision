'use server'

import { db } from '..'
import { albumTable } from '../schema'
import { eq } from 'drizzle-orm'
import { cache } from 'react'

export async function createAlbumDb(id: string, addedBy: string, title: string, description: string) {
  await db.insert(albumTable).values({ id, addedBy, title, description })
}

export async function getAlbum(title: string) {
  const album = await db.select().from(albumTable).where(eq(albumTable.title, title))
  return album[0]
}

export async function getAllAlbum(userId: string) {
  const albums = await db.select().from(albumTable).where(eq(albumTable.addedBy, userId))
  return albums
}
