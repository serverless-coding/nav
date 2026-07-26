import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ]
}
