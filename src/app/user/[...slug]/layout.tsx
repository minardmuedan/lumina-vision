export default function UserLayout({ children, media }: { children: React.ReactNode; media: React.ReactNode }) {
  return (
    <section className="container min-h-dvhMinusNav w-full space-y-5 py-5">
      {children}
      {media}
    </section>
  )
}
