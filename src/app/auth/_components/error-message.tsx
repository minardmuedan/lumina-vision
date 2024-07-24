import { TActionReturn } from '@/schema/auth'
import Image from 'next/image'

export default function ErrorMessage({ actionResult }: { actionResult: TActionReturn | undefined }) {
  if (actionResult?.type === 'error')
    return (
      <div className="animate-pop-up flex items-center justify-center gap-2">
        <Image src="/icons/warning.svg" alt="warning-icon" width={17} height={17} />
        <p className="font-normal text-destructive first-line:text-sm">{actionResult.message}</p>
      </div>
    )

  return null
}
