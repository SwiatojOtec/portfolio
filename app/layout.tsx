import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '../contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Микола Панкрат\'єв - Project Manager & Developer',
  description: 'Портфоліо Миколи Панкрат\'єва: Project Manager з 7+ роками досвіду, Python розробник, автоматизація бізнес-процесів',
  keywords: 'project manager, python, automation, web scraping, business processes, portfolio',
  authors: [{ name: 'Микола Панкрат\'єв' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk" className="scroll-smooth">
      <body className={`${inter.className} bg-dark-400 text-white antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
} 