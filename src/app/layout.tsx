import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import { Toaster } from '@/components/ui/sonner'

const mainFont = Bricolage_Grotesque({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LuminaVision',
  description: 'A gallery browsing app made by Minard Parilla, images from Unsplash.com',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={mainFont.className}>
        <Toaster richColors position="top-right" closeButton />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
