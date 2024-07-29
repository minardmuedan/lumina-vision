import { cn } from '@/lib/utils'

export default function Header({ title, description, className }: { title: string; description: string; className?: string }) {
  return (
    <header className={cn('max-w-[700px] space-y-2', className)}>
      <h1 className="font-calstavier text-3xl sm:text-4xl md:text-5xl">{title}</h1>
      {description && <p className="text-sm text-muted-foreground md:text-base">{description}</p>}
    </header>
  )
}
