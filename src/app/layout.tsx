// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
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
  description: 'Discover top internships at leading companies. Get hired with InternAdda - Your gateway to professional success. Free ATS checker, resume builder, and career guidance.',
  keywords: 'internships, jobs, career, students, freshers, intern, internship search, internship portal',
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
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'InternAdda',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InternAdda - Find Your Dream Internship',
    description: 'Discover top internships at leading companies. Powered by Upforge.org',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
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
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
