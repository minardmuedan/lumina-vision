import { getUnsplashPhotos } from '@/lib/unsplash/photos'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1

  const photos = await getUnsplashPhotos(page)

  return Response.json(photos)
}
