import 'server-only'

export async function unsplashFetch<T>(url: string) {
  try {
    const res = await fetch(`https://api.unsplash.com${url}`, {
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
    })

    if (!res.ok) {
      const err: { errors: string[] } = await res.json()
      throw err?.errors?.[0]
    }

    return (await res.json()) as T
  } catch (err) {
    if (typeof err === 'string') throw new Error(err)
    if (err instanceof Error) throw err
    throw new Error('Something went wrong')
  }
}
