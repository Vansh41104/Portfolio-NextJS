import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vansh Bhatnagar | AI/ML Engineer &  Developer",
  description:
    "Portfolio of Vansh Bhatnagar, a full-stack developer and machine learning engineer specializing in AI systems and scalable backends.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background antialiased`}>
          {children}
      </body>
    </html>
  )
}

