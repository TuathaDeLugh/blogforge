import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/Components/Logic/sessionPro'
import Navbar from '@/Components/layout/Navbar'
import Footer from '@/Components/layout/Footer'
import Toast from '@/Components/layout/Toast'
import SessionUpdate from '@/Components/Logic/updatesession'

const font = Poppins({ subsets: ['latin'],
  weight:['100', '200', '300', '400', '500', '600', '700', '800', '900'] })


export const metadata: Metadata = {
  title: 'Blog Forge',
  description: 'BlogForge, your destination for inspired blogging. Unleash creativity with our innovative platform, where every word matters. Connect, create, and elevate your stories with us.',
  manifest:"/manifest.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
      
    <html lang="en">
      <body className={`${font.className} text-gray-700 bg-white dark:text-white dark:bg-gray-900`}>
      <SessionProvider>
        <SessionUpdate/>
        <Toast/>
        <Navbar/>
        <main className=' min-h-[93vh] md:min-h-[91vh] '>
        {children}
        </main>
        <Footer/>
      </SessionProvider>
        </body>
    </html>
  )
}
