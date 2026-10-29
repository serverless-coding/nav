"use client"

import { useEffect, useRef } from "react"
import { Sidebar, type SidebarProps } from "./sidebar"

interface MobileSidebarProps extends SidebarProps {
  onClose: () => void
}

export function MobileSidebar({ navItems, onClose }: MobileSidebarProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const element = dialog.current
    if (!element) return
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = "hidden"
    return () => {
      element.close()
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [])

  return (
    <dialog
      ref={dialog}
      id="mobile-category-menu"
      aria-labelledby="mobile-category-title"
      className="fixed inset-y-0 left-0 m-0 h-full max-h-full w-60 max-w-full border-0 bg-background p-0 text-foreground backdrop:bg-black/50"
      onCancel={event => { event.preventDefault(); onClose() }}
      onClick={event => {
        const bounds = event.currentTarget.getBoundingClientRect()
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
      }}
    >
      <div className="flex items-center justify-between p-4">
        <h2 id="mobile-category-title" className="font-semibold">资源分类</h2>
        <button type="button" onClick={onClose} aria-label="关闭分类菜单" className="rounded p-2 focus-visible:ring-2">关闭</button>
      </div>
      <Sidebar navItems={navItems} onNavigate={onClose} className="h-[calc(100%-5rem)]" />
    </dialog>
  )
}
