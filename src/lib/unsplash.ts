import 'server-only'
import { TCollection, TCollections, TSearchCollections } from '@/schema/collection'
import { TFullPhoto, TPhotos, TRelatedPhotos, TSearchPhotos } from '@/schema/photo'
import { TFullUser, TSearchUser } from '@/schema/user'
import { TOrderBy, TPhotoOrietation } from '@/schema/unsplash'

export async function getPhotos(page = 1, order_by: TOrderBy = 'latest') {
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

export async function getUserPhotos(username: string, page = 1, order_by: TOrderBy = 'latest', orientation?: TPhotoOrietation) {
  const userPhotos = await unsplashFetch<TPhotos>(
    `/users/${username}/photos?page=${page}&order_by=${order_by}${orientation != undefined ? `&orientation=${orientation}` : ''}`,
  )
  return userPhotos
}

export async function getUserLikes(username: string, page = 1, order_by: TOrderBy = 'latest', orientation?: TPhotoOrietation) {
  const userPhotos = await unsplashFetch<TPhotos>(
    `/users/${username}/likes?page=${page}&order_by=${order_by}${orientation != undefined ? `&orientation=${orientation}` : ''}`,
  )
  return userPhotos
}

export async function getUserCollections(username: string, page = 1) {
  const userPhotos = await unsplashFetch<TCollections>(`/users/${username}/collections?page=${page}`)
  return userPhotos
}

export async function getSearchPhotos(query: string, page = 1, order_by: string = 'relevant', color?: string, orientation?: string) {
  const photoColor = color ? `&color=${color}` : ''
  const photoOrientation = orientation ? `&orientation=${orientation}` : ''

  const searchPhotos = await unsplashFetch<TSearchPhotos>(
    `/search/photos?query=${query}&page=${page}&order_by=${order_by}${photoColor}${photoOrientation}`,
  )
  return searchPhotos
}

export async function getSearchCollections(query: string, page = 1) {
  const searchCollections = await unsplashFetch<TSearchCollections>(`/search/collections?query=${query}&page=${page}`)
  return searchCollections
}

export async function getSearchUsers(query: string, page = 1) {
  const searchUsers = await unsplashFetch<TSearchUser>(`/search/users?query=${query}&page=${page}`)
  return searchUsers
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
