import { siteConfig } from "@/config/site"
import JsonLd from "./JsonLd"

// 全站：WebSite + Organization，并声明站内搜索（SearchAction）
export default function SEOJsonLd() {
  const base = siteConfig.baseUrl
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: siteConfig.shortName,
        url: base,
        logo: `${base}${siteConfig.icon.site}`,
        sameAs: [siteConfig.links.github].filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: siteConfig.name,
        alternateName: [siteConfig.shortName, "AI工具箱"],
        url: base,
        description: siteConfig.description,
        inLanguage: "zh-CN",
        publisher: { "@id": `${base}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${base}/?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  }
  return <JsonLd data={data} />
}
