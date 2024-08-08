import type { Metadata } from 'next'
import { Bricolage_Grotesque, Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import { Toaster } from '@/components/ui/sonner'
import localFont from 'next/font/local'

const mainFont = Bricolage_Grotesque({ subsets: ['latin'], weight: ['300', '400', '500'] })
const calstavier = localFont({ src: '/Calstavier.ttf', variable: '--font-calstavier' })

export const metadata: Metadata = {
  title: 'Lumina Vision',
  description: 'A gallery browsing app made by Minard Parilla, images from Unsplash.com',
}

export default function RootLayout({ children, modal }: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${mainFont.className} ${calstavier.variable}`}>
        <Toaster richColors position="top-right" closeButton />
        <Navbar />
        {modal}
        <main>{children}</main>
      </body>
    </html>
  )
}
