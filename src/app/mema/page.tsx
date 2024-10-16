import { getPhoto } from '@/lib/unsplash/photos'
export default async function MemaPage() {
  const { src, alt, color, blurHash } = await getPhoto('o7kmhDSSnbQ')
  const photo = { src, alt, color, blurHash }

  return <pre>{JSON.stringify(photo, undefined, 2)}</pre>
}
