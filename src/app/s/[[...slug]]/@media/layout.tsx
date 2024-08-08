import { Suspense } from 'react'
import SearchResultMediaLoadingFallback from './loading'

export default function SearchResultMediaLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<SearchResultMediaLoadingFallback />}>{children}</Suspense>
}
