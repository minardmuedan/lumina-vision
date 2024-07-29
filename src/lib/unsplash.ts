import 'server-only'
import { TCollection, TCollections } from '@/schema/collection'
import { TFullPhoto, TPhotos, TRelatedPhotos } from '@/schema/photo'
import { TFullUser } from '@/schema/user'

export async function getPhotos(page = 1, order_by: 'oldest' | 'popular' | 'latest' = 'latest') {
  const photos = await unsplashFetch<TPhotos>(`/photos?page=${page}&order_by=${order_by}`)
  return photos
}

export async function getPhoto(slug: string) {
  const photo = await unsplashFetch<TFullPhoto>(`/photos/${slug}`)
  return photo
}

export async function getPhotoRelatedPhotos(slug: string) {
  const photos = await unsplashFetch<TRelatedPhotos>(`/photos/${slug}/related`)
  return photos
}

export async function getCollections(page = 1) {
  const collections = await unsplashFetch<TCollections>(`/collections?per_page=20&page=${page}`)
  return collections
}

export async function getCollectionDetails(id: string) {
  const collection = await unsplashFetch<TCollection>(`/collections/${id}`)
  return collection
}
export async function getCollectionPhotos(id: string, page = 1, orientation?: 'landscape' | 'portrait' | 'squarish') {
  const url = `/collections/${id}/photos?per_page=20&page=${page}${orientation != undefined ? `&orientation=${orientation}` : ''}`
  const collectionPhotos = await unsplashFetch<TPhotos>(url)
  return collectionPhotos
}

export async function getUser(username: string) {
  const user = await unsplashFetch<TFullUser>(`/users/${username}`)
  return user
}

//

//
async function unsplashFetch<T>(url: string) {
  try {
    const res = await fetch(`https://api.unsplash.com${url}`, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
      next: { revalidate: 60 * 60 * 24 },
    })
    if (!res.ok) return null
    const data = await res.json()
    if (!data) return null
    return data as T
  } catch (err) {
    console.log('UNSPLASH ERRRRRRR:', err)
    return null
  }
}
