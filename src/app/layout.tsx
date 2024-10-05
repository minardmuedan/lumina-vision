import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/navbar'
import ReactQueryProvider from '@/components/provider'

const bricolageGrotesque = Bricolage_Grotesque({ subsets: ['latin'], weight: ['300', '400'] })
const calstavier = localFont({ src: './Calstavier.ttf', variable: '--font-calstavier' })

export const metadata: Metadata = { title: 'Lumina Vision', description: 'A Fullstack Gallery browsing app made by great Minard Parilla.' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={`${bricolageGrotesque.className} ${calstavier.variable} antialiased`}>
        <ReactQueryProvider>
          <Navbar />
          <main>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
