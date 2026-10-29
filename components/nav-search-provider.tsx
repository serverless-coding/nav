"use client"

import { createContext, Suspense, useContext, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import type { CategoryWithLinks } from "@/app/links"
import { filterNavResources, type NavSearch } from "@/lib/nav-search"

const NavSearchContext = createContext<{
  search: NavSearch
  categories: CategoryWithLinks[]
} | null>(null)

function SearchParamsSync({ onChange }: { onChange: (search: NavSearch) => void }) {
  const params = useSearchParams()
  const q = params?.get("q") || ""
  const subject = params?.get("subject") || ""
  useEffect(() => onChange({ q, subject }), [q, subject, onChange])
  return null
}

export function NavSearchProvider({ categories, children }: { categories: CategoryWithLinks[], children: React.ReactNode }) {
  const [search, setSearch] = useState<NavSearch>({ q: "", subject: "" })
  const filtered = useMemo(() => filterNavResources(categories, search), [categories, search])
  return (
    <NavSearchContext.Provider value={{ search, categories: filtered }}>
      <Suspense fallback={null}><SearchParamsSync onChange={setSearch} /></Suspense>
      {children}
    </NavSearchContext.Provider>
  )
}

export function useNavSearch() {
  const context = useContext(NavSearchContext)
  if (!context) throw new Error("Navigation search requires NavSearchProvider")
  return context
}
