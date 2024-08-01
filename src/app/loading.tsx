import { NoScroll } from '@/components/client-sub-component'
import Loader from '@/components/loader'

export default function MainLoadingPage() {
  return (
    <NoScroll className="flex min-h-dvhMinusNav items-center">
      <Loader />
    </NoScroll>
  )
}
