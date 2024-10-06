import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/navbar'
import ReactQueryProvider from '@/components/provider'
import ErrorBoundary from '@/components/error-boundary'

const bricolageGrotesque = Bricolage_Grotesque({ subsets: ['latin'], weight: ['300', '400'] })
const calstavier = localFont({ src: './Calstavier.ttf', variable: '--font-calstavier' })

export const metadata: Metadata = { title: 'Lumina Vision', description: 'A Gallery browsing app made by great Minard Parilla.' }

export default function RootLayout({ children, modal }: TLayoutProps) {
  return (
    <html lang='en'>
      <body className={`${bricolageGrotesque.className} ${calstavier.variable} antialiased`}>
        <ReactQueryProvider>
          {modal}
          <Navbar />
          <main>
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  )
}

type TLayoutProps = Readonly<{ children: React.ReactNode; modal: React.ReactNode }>
