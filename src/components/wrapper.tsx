export function GridWrapperUl({ children }: { children: React.ReactNode }) {
  return <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:gap-5 lg:grid-cols-4">{children}</ul>
}
