import { pagePadding } from '@/components/pages'
import BackButton from '@/components/ui/back-button'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={pagePadding}>
      <BackButton />
      {children}
    </div>
  )
}
