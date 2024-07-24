import BackButton from '@/components/back-btn'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function MainNotFoundPage() {
  return (
    <>
      <Image src="/icons/404.svg" alt="404-icon" width={80} height={80} className="mb-5" />
      <h1 className="text-3xl">Page Not Found</h1>
      <p className="text-center text-muted-foreground">
        It seems we<span>&#39;</span>ve encountered a digital roadblock. Hang tight while we clear the path!
      </p>
      <div className="mt-10 flex items-center gap-2">
        <BackButton />
        <Button variant="outline" asChild>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icons/home.svg" alt="home-icon" width={19} height={19} />
            <p>Home</p>
          </Link>
        </Button>
      </div>
    </>
  )
}
