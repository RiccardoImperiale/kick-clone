import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.scss'
import { Header } from '@/components/header/Header'
import { SidebarCtrl } from '@/components/sidebar/SidebarCtrl'

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
                    <SidebarCtrl />
                    {children}
                </main>
                {/* <footer>footer</footer> */}
            </body>
        </html>
    )
}
