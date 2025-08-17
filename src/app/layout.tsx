import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.scss'
import { Header } from '@/components/header/Header'
import { Sidebar } from '@/components/sidebar/Sidebar'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Kick Clone',
    description: 'Streaming platform project',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <Header />
                <main>
                    <Sidebar />
                    {children}
                </main>
                {/* <footer>footer</footer> */}
            </body>
        </html>
    )
}
