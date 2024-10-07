import { getPhotos } from '@/lib/unsplash/photos'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 2

  const photos = await getPhotos(page).catch((err: Error) => err.message)

  return Response.json(photos)
}
