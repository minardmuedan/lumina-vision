/** /api- */
export async function fetcher<T>(url: string) {
  try {
    const res = await fetch(`/api${url}`)
    if (!res.ok) {
      throw await res.json()
    }
    const data = (await res.json()) as T
    return data
  } catch (err) {
    if (err instanceof Error) throw err
    if (typeof err === 'string') throw new Error(err)
    throw new Error('Something went wrong fetching the data')
  }
}
