"use client"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Category } from "@/types/nav"

export interface SidebarProps {
  className?: string,
  navItems: Pick<Category, "title" | "icon" | "id">[],
  onNavigate?: () => void,
  activeId?: string,
}

export function Sidebar({ className, navItems, onNavigate, activeId }: SidebarProps) {
  const [activeTabId, setActiveTabId] = useState(activeId || "");

  // 链接指向分类静态页（爬虫可读）；在首页时拦截为平滑滚动到对应锚点
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (window.location.pathname !== "/") return; // 非首页：正常跳转到分类页
    const ele = document.getElementById(id);
    if (!ele) return; // 首页筛选后没有该分类：跳转到分类页
    e.preventDefault();
    setActiveTabId(id);
    const offsetPosition = ele.getBoundingClientRect().top + window.scrollY - 75;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
    onNavigate?.();
  }

  return (
    <nav aria-label="分类导航" className="after:h-[calc(100vh - 65px)] block min-h-screen w-60 flex-row flex-nowrap bg-gray-50 font-semibold sm:bg-background sm:px-6 sm:pb-6">
      <div className="flex-start relative z-40 flex h-auto w-full flex-1 flex-col overflow-y-auto overflow-x-hidden rounded pt-4 opacity-100">
        <div className="flex list-none flex-col md:min-w-full md:flex-col">
          <div className={cn("flex-none pb-12", className)}>
            <div className="space-y-4 pb-4">
              <div className="py-2">
                <ul className="space-y-1">
                  {navItems.map((category) => {
                    return (
                      <li key={category.id}>
                        <a
                          href={`/category/${category.id}`}
                          onClick={(e) => handleClick(e, category.id)}
                          className={`block cursor-pointer rounded-lg hover:bg-gray-100 hover:text-purple-500 ${activeTabId === category.id ? "bg-gray-100 text-purple-500" : "text-primary"}`}
                        >
                          <div className="scale relative mb-2 flex items-center gap-2 rounded-r-lg p-2 transition-colors ease-in-out before:transition-colors hover:no-underline sm:border-l-0 sm:pl-6 sm:before:absolute sm:before:left-[-5px] sm:before:top-[2px] sm:before:h-[calc(100%-4px)] sm:before:w-[10px] sm:before:rounded-full sm:before:transition-colors">
                            <div className="relative flex shrink-0">
                              <Image
                                src={category.icon}
                                alt={`${category.title}分类图标`}
                                className="block"
                                width={20}
                                height={20}
                                unoptimized
                              />
                            </div>
                            <span className="overflow-hidden text-ellipsis whitespace-nowrap">{category.title}</span>
                          </div>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
