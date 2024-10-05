/** /api- */
export async function fetcher<T>(url: string) {
  const res = await fetch(`/api${url}`)
  if (!res.ok) {
    throw new Error('Something went wrong!')
  }
  const data = (await res.json()) as T
  return data
}
