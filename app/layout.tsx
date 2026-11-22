import "@/styles/globals.css"
import type { Metadata, Viewport } from "next"
import Script from "next/script"

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
    default: siteConfig.title,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
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
      name: siteConfig.shortName,
      url: siteConfig.baseUrl,
    },
  ],
  creator: siteConfig.shortName,
  publisher: siteConfig.shortName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.baseUrl,
    siteName: siteConfig.name,
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/images/nav.png", alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/nav.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    other: {
      "msvalidate.01": "B6FE76A783A1770409EC903DE2C7AC6A",
    },
  },
  icons: {
    icon: siteConfig.icon.site,
    shortcut: siteConfig.icon.site,
    apple: siteConfig.icon.site,
  },
}

// Next 14 起 themeColor 需放在 viewport 导出中
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
          <Script
            id="adsbygoogle"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3614504270218797"
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
          <Script
            id="umami"
            src="https://cloud.umami.is/script.js"
            data-website-id="24038dd3-5c82-4fff-86dd-be73d8b1731b"
            strategy="afterInteractive"
          />
        </body>
      </html>
    </>
  )
}
