import { getCollectionPhotos } from '@/lib/unsplash/collections'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { searchParams } = req.nextUrl
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 2

  const photos = await getCollectionPhotos(params.id, page)

  return Response.json(photos)
}
