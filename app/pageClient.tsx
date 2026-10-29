"use client"

import { LinkContent } from "@/components/link-content"
import { useNavSearch } from "@/components/nav-search-provider"

export function IndexContent() {
  const { search, categories } = useNavSearch()
  return <LinkContent navResources={categories} activeSubject={search.subject} activeQuery={search.q} />
}
