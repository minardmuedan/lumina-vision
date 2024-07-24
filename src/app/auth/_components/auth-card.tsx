import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
  title: string
  description: string
  children: React.ReactNode
}

export default function AuthCard({ title, description, children }: Props) {
  return (
    <Card className="w-full border-0 shadow-none sm:max-w-[26rem] md:border md:shadow-sm">
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {children}
    </Card>
  )
}
