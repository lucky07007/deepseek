// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ChatbotButton } from '@/components/Chatbot'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'InternAdda - Find Your Dream Internship | Powered by Upforge.org',
  description: 'Discover top internships at leading companies. Get hired with InternAdda - Your gateway to professional success.',
  keywords: 'internships, jobs, career, students, freshers, intern',
  authors: [{ name: 'InternAdda', url: 'https://internadda.com' }],
  creator: 'InternAdda',
  publisher: 'Upforge.org',
  metadataBase: new URL('https://internadda.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://internadda.com',
    siteName: 'InternAdda',
    title: 'InternAdda - Find Your Dream Internship',
    description: 'Discover top internships at leading companies. Powered by Upforge.org',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InternAdda - Find Your Dream Internship',
    description: 'Discover top internships at leading companies. Powered by Upforge.org',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
          <ChatbotButton />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
