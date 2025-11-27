"use client"
import { useMemo } from "react"
import { CategoryWithLinks } from "./links"
import { LinkContent } from "@/components/link-content"
import { useSearchParams } from "next/navigation"

export function IndexContent({ navResources }: { navResources: CategoryWithLinks[] }) {
  const params = useSearchParams()!
  const q = params?.get("q") || ""
  const subject = params?.get("subject") || ""

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    const sub = subject.trim().toLowerCase()
    const match = (s: string | undefined) => (s || "").toLowerCase().includes(query)
    return navResources
      .map(cat => ({
        ...cat,
        links: cat.links.filter(l => {
          const byText = !query || match(l.title) || match(l.description) || match(l.url)
          const bySubject = (() => {
            if (!sub) return true
            const s = l.subject
            if (!s) return false
            if (Array.isArray(s)) {
              return s.some(x => (x || '').toLowerCase() === sub)
            }
            return (s || '').toLowerCase() === sub
          })()
          return byText && bySubject
        })
      }))
      .filter(cat => cat.links.length > 0)
  }, [q, subject, navResources])

  return <LinkContent navResources={filtered} activeSubject={subject} activeQuery={q} />
}
