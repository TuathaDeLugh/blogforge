import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/Components/layout/Navebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-black bg-white dark:text-slate-200 dark:bg-gray-900`}>
        <Navbar/>
        <main className=''>

        {children}
        </main>
        </body>
    </html>
  )
}
