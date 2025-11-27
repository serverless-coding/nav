"use client"
import { useMemo } from "react"
import { CategoryWithLinks } from "./links"
import { LinkContent } from "@/components/link-content"
import { useSearchParams } from "next/navigation"

export function IndexContent({ navResources }: { navResources: CategoryWithLinks[] }) {
  const params = useSearchParams()!
  const q = params?.get("q") || ""

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return navResources
    const match = (s: string | undefined) => (s || "").toLowerCase().includes(query)
    return navResources
      .map(cat => ({
        ...cat,
        links: cat.links.filter(l => match(l.title) || match(l.description) || match(l.url))
      }))
      .filter(cat => cat.links.length > 0)
  }, [q, navResources])

  return <LinkContent navResources={filtered} />
}
