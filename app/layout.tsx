import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Vansh Bhatnagar - AI Backend Engineer & ML Systems Developer",
  description:
    "AI Backend Engineer specializing in ML systems, PyTorch, and cloud infrastructure. Open for opportunities in AI/ML engineering.",
  generator: "v0.app",
  openGraph: {
    title: "Vansh Bhatnagar - AI Backend Engineer",
    description: "AI Backend Engineer & ML Systems Developer based in Udaipur, India.",
    url: "https://vanshbhatnagar.space",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
