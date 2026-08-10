import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScroll } from "@/components/SmoothScroll"
import { profile } from "@/content"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

const siteUrl = "https://vansh410.vercel.app"
const fullName = `${profile.firstName} ${profile.lastName}`
const description =
  "AI Software Engineer building production agentic AI systems, LLM services and RAG pipelines with LangGraph, LangChain and MCP. Based in Bengaluru, open to relocation and remote."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${fullName} — ${profile.title}`,
    template: `%s — ${fullName}`,
  },
  description,
  keywords: [
    "AI Software Engineer",
    "Agentic AI",
    "LangGraph",
    "LangChain",
    "Model Context Protocol",
    "RAG",
    "LLM",
    "FastAPI",
    "Bengaluru",
  ],
  authors: [{ name: fullName, url: siteUrl }],
  creator: fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: fullName,
    title: `${fullName} — ${profile.title}`,
    description,
    url: siteUrl,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${fullName} — ${profile.title}`,
    description,
    creator: "@vanshbh041",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // suppressHydrationWarning is required: next-themes writes the theme class
    // on <html> before React hydrates, so server and client markup differ here.
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
