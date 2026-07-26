import { siteConfig } from "@/config/site"

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    url: siteConfig.baseUrl,
    description: siteConfig.description,
    inLanguage: "zh-CN",
    author: {
      "@type": "Organization",
      name: siteConfig.author,
      url: siteConfig.baseUrl,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
