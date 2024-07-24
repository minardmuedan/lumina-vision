import { validateRequest } from '@/lib/lucia-auth/session'

export default async function Home() {
  const { user } = await validateRequest()
  if (!user) return <div>Home</div>

  return <pre>{JSON.stringify(user, undefined, 2)}</pre>
}
