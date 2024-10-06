import { getCollections } from '@/lib/unsplash/collections'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 2

  const photos = await getCollections(page)

  return Response.json(photos)
}
