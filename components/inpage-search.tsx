"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, Clapperboard, Film, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// 数据结构保持不变
const SEARCH_DATA = [
  {
    name: "搜索",
    icon: Search,
    child: [
      { name: "站内", id: "internal", url: "" },
      { name: "Bing", id: "bing", url: "https://cn.bing.com/search?q=" },
      { name: "Google", id: "google", url: "https://www.google.com/search?q=" },
      { name: "360", id: "so", url: "https://www.so.com/s?q=" },
    ]
  },
  {
    name: "影视",
    icon: Clapperboard,
    child: [
      { name: "全网", id: "bingall", url: "https://www.bing.com/search?q=$q%20site:hdmoli.com%20OR%20site:czzy.top%20OR%20site:ddys.art" },
      { name: "厂长资源", id: "czzy", url: "https://www.czzymovie.com/?q=" },
      { name: "低端影视", id: "ddys", url: "https://ddys.io/search?q=" },
    ]
  },
  {
    name: "资料",
    icon: Film,
    child: [
      { name: "豆瓣", id: "douban", url: "https://search.douban.com/movie/subject_search?search_text=" },
      { name: "IMDb", id: "imdb", url: "https://www.imdb.com/find/?q=" },
      { name: "TMDB", id: "tmdb", url: "https://www.themoviedb.org/search?query=" },
    ]
  }
]

export default function InpageSearch() {
  const router = useRouter()
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [activeChildIndex, setActiveChildIndex] = useState(0)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const currentTab = SEARCH_DATA[activeTabIndex]
  const currentChild = currentTab.child[activeChildIndex]

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index)
    setActiveChildIndex(0)
    inputRef.current?.focus()
  }

  const handleSearch = (e?: React.FormEvent, multi: boolean = false) => {
    e?.preventDefault()
    const q = query.trim()
    if (!q) return

    if (multi) {
      let count = 0
      currentTab.child.forEach((item) => {
        if (count >= 5) return
        if (item.id !== 'internal') {
          const targetUrl = item.url.includes('$q') ? item.url.replace('$q', encodeURIComponent(q)) : item.url + encodeURIComponent(q)
          window.open(targetUrl, "_blank")
          count++
        }
      })
      return
    }

    if (currentChild.id === "internal") {
      router.push(`/?q=${encodeURIComponent(q)}`)
    } else {
      const targetUrl = currentChild.url.includes('$q')
        ? currentChild.url.replace('$q', encodeURIComponent(q))
        : currentChild.url + encodeURIComponent(q)
      window.open(targetUrl, "_blank")
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSearch(undefined, e.ctrlKey || e.metaKey)
    }
  }

  return (
    <div className="w-full px-4 mb-6">
      {/*
         1. 移除了 border 类，仅保留 shadow-sm
         2. 背景保持 bg-white (dark模式 bg-card)
      */}
      <div className="mx-auto max-w-3xl bg-white dark:bg-card rounded-xl shadow-sm p-5 md:p-6 transition-all hover:shadow-md">

        {/*
           顶部 Tab 按钮组
           - justify-center: 确保水平居中
        */}
        <div className="flex items-center justify-center gap-3 mt-4 mb-1.5">
          {SEARCH_DATA.map((tab, index) => {
            const isActive = activeTabIndex === index
            const Icon = tab.icon
            return (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={cn(
                  // 基础样式
                  "flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  // 样式逻辑：
                  // isActive: 深色蓝渐变背景 + 白色文字 + 蓝色光晕投影 (仿照参考网站)
                  // !isActive: 灰色文字 + 悬停微灰背景
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 focus-visible:ring-white/70 focus-visible:ring-offset-blue-700"
                    : "text-muted-foreground bg-transparent hover:bg-muted/50 hover:text-foreground focus-visible:ring-blue-500/40 focus-visible:ring-offset-background"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </div>

        {/* 输入框区域 */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            // 提示语合并在 placeholder 中
            placeholder="请输入搜索关键词,Ctrl + Enter 可同时打开多个网站"
            className="w-full h-11 px-4 pr-10 rounded-lg border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-shadow"
          />
          <button
            onClick={(e) => handleSearch(e)}
            className="absolute right-2 top-1.5 p-1.5 text-muted-foreground hover:text-blue-600 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowRight className="w-5 h-10" />
          </button>
        </div>

        {/*
           底部子源按钮组
           - justify-center: 确保水平居中
           - gap-3: 增加一点间距
        */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-1.5">
          {currentTab.child.map((item, index) => {
            const isActive = activeChildIndex === index
            return (
              <button
                key={item.id}
                onClick={() => setActiveChildIndex(index)}
                className={cn(
                  // 基础样式：稍小的内边距
                  "px-4 py-1.5 text-xs md:text-sm rounded-full transition-all duration-200 border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  // 选中逻辑：与顶部 Tab 保持视觉一致，使用深色渐变
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/20 focus-visible:ring-white/70 focus-visible:ring-offset-blue-700"
                    : "text-muted-foreground bg-transparent hover:bg-muted/50 hover:text-foreground focus-visible:ring-blue-500/40 focus-visible:ring-offset-background"
                )}
              >
                {item.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
