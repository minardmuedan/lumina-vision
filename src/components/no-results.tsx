export default function NoResult({ msg = 'no result found' }: { msg?: string }) {
  return (
    <div className="flex w-full justify-center border-2 border-dashed py-10">
      <p className="text-muted-foreground">{msg}</p>
    </div>
  )
}
