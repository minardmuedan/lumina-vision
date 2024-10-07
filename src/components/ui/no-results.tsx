export function NoResult({ message }: { message: string }) {
  return (
    <div className='flex justify-center px-5 py-10 text-center'>
      <p className='text-muted-foreground'>{message}</p>
    </div>
  )
}
