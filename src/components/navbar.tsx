import Image from 'next/image'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { validateRequest } from '@/lib/lucia-auth/session'
import Navlinks from './client-sub-component'
import LogoutBtn from '@/app/auth/_components/logout-btn'
import { Button } from './ui/button'

export default async function Navbar() {
  const { user } = await validateRequest()
  return (
    <header className="h-14 border-b">
      <div className="container flex h-full items-center justify-between px-10">
        <Link href="/">
          <p className="px-1 font-medium">minard</p>
        </Link>

        <Image src="/icons/menu.svg" alt="menu-icon" width={19} height={19} className="md:hidden" />

        <div className="hidden items-center gap-20 md:flex">
          <Navlinks />

          <div className="flex items-center gap-5">
            <Image src="/icons/search.svg" alt="search" width={19} height={19} />

            {user ? (
              <Sheet>
                <SheetTrigger aria-label="open-sheet">
                  <Avatar>
                    <AvatarImage src={`${user.avatarUrl}`} />
                    <AvatarFallback>{user.username?.slice(0, 2) ?? user.email.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader className="flex-row items-center gap-2">
                    <Avatar>
                      <AvatarImage src={`${user.avatarUrl}`} />
                      <AvatarFallback>{user.username?.slice(0, 2) ?? user.email.slice(0, 2)}</AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium">{user.email}</p>
                      {user.username && <p className="text-sm text-muted-foreground">{user.username}</p>}
                    </div>
                  </SheetHeader>

                  <div className="mt-4 flex flex-col gap-1 border-t pt-4">
                    <Button variant="ghost" className="w-full justify-start">
                      <Image src="/icons/user.png" alt="profile" width={19} height={19} />
                      <p>Profile</p>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Image src="/icons/library.svg" alt="library" width={19} height={19} />
                      <p>Library</p>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Image src="/icons/settings.svg" alt="settings" width={19} height={19} />
                      <p>Account Settings</p>
                    </Button>

                    <LogoutBtn />
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger aria-label="open-menu" className="w-fit p-1">
                  <Image src="/icons/user.png" alt="user-icon" width={19} height={19} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/auth/create">Create An Account</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
