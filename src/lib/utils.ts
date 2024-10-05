import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { TUnsplashPhoto } from './unsplash/schema/photo'

export type TPrettify<T> = { [K in keyof T]: T[K] } & {}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPhoto = (photo: TUnsplashPhoto) => ({
  id: photo?.id,
  slug: photo?.slug,
  src: photo?.urls?.raw,
  alt: photo?.alt_description || photo?.slug?.split('-').join(' '),
  height: photo?.height,
  width: photo?.width,
  color: photo?.color,
  blurHash: photo?.blur_hash,
  downloadLink: photo?.links?.download ? photo?.links?.download + '&force=true' : null,
})
