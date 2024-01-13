import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/Components/layout/Navbar'
// import StateProvider from '@/Components/layout/StateProvider'
import Footer from '@/Components/layout/Footer'

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
    // <StateProvider>
      
    <html lang="en">
      <body className={`${inter.className} text-black bg-white dark:text-white dark:bg-gray-900`}>
        <Navbar/>
        <main className=' min-h-screen'>

        {children}
        </main>
        <Footer/>
        </body>
    </html>
    // </StateProvider>
  )
}
