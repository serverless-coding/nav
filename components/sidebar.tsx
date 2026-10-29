"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Category } from "@/types/nav"
import { useNavSearch } from "./nav-search-provider"

export interface SidebarProps {
  className?: string
  navItems: Pick<Category, "title" | "icon" | "id">[]
  onNavigate?: () => void
}

export function Sidebar({ className, navItems, onNavigate }: SidebarProps) {
  const [activeTabId, setActiveTabId] = useState("")
  const { categories } = useNavSearch()
  const visible = new Set(categories.map(category => category.id))
  return (
    <nav aria-label="资源分类" className={cn("h-full w-60 overflow-y-auto bg-background px-6 pb-6 pt-4 font-semibold", className)}>
      <div className="space-y-1">
        {navItems.filter(category => visible.has(category.id)).map(category => (
          <a
            key={category.id}
            href={`#${category.id}`}
            aria-current={activeTabId === category.id ? "location" : undefined}
            className={cn("flex items-center gap-2 rounded-lg p-2 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", activeTabId === category.id && "bg-muted text-primary")}
            onClick={event => {
              const target = document.getElementById(category.id)
              if (!target) {
                event.preventDefault()
                return
              }
              setActiveTabId(category.id)
              onNavigate?.()
              // Native fragment navigation also works without JavaScript.
            }}
          >
            <Image src={category.icon} alt="" width={20} height={20} />
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">{category.title}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}
