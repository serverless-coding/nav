import "@/styles/globals.css"
import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import SEOJsonLd from "@/components/SEOJsonLd"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: "ProgramNotes程序导航 - AI工具、开发工具、程序员资源导航",
    template: "%s - ProgramNotes程序导航",
  },
  description:
    "ProgramNotes程序导航，精选AI工具、编程开发工具、效率工具、设计资源和技术社区，为程序员提供高质量互联网资源导航。",
  keywords: [
    "程序员导航",
    "AI工具导航",
    "开发者工具",
    "编程资源",
    "在线工具",
    "效率工具",
    "人工智能工具",
  ],
  authors: [
    {
      name: "ProgramNotes",
    },
  ],
  creator: "ProgramNotes",
  openGraph: {
    title: "ProgramNotes程序导航 - AI工具和开发资源大全",
    description: "发现优秀AI工具、开发工具和程序员资源。",
    url: siteConfig.baseUrl,
    siteName: "ProgramNotes",
    locale: "zh_CN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: siteConfig.icon.site,
    shortcut: siteConfig.icon.site,
    apple: siteConfig.icon.site,
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="zh-CN" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <SEOJsonLd />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <TailwindIndicator />
            <Toaster />
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </>
  )
}
