import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar"
import { ClerkProvider } from "@clerk/nextjs"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "LinkedIn Clone",
  description: "A clean LinkedIn clone with Next.js 14, Clerk, and Tailwind CSS",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
          <Navbar />
          <div className=" md:bg-[#F4F2EE] flex-1 w-full pt-16"> {/* ✅ offset for fixed navbar */}
            <main className="max-w-6xl mx-auto">
              {children}
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
