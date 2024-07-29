'use server'

import { getPhotos } from '@/lib/unsplash'

export default async function getMorePhotosAction(page: number, order_by?: 'oldest' | 'popular' | 'latest') {
  return await getPhotos(page, order_by)
}
