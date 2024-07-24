export default function UserDetailsLayout({ children, media }: { children: React.ReactNode; media: React.ReactNode }) {
  return (
    <section className="w-full border border-green-500 pt-2">
      {children}
      {media}
    </section>
  )
}
