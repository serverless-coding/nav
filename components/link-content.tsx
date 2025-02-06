"use client";  // Add this at the top of the file
import Image from "next/image"
import { CategoryWithLinks } from "@/app/links"
import { Link as SiteLink } from "@/types/nav";
import Link from "next/link"


export function LinkItem({ link, children }: { link: SiteLink; children?: React.ReactNode }) {
  return (
    <Link
      href={link.url}
      target="_blank"
    >
      <div className="relative mb-6 flex min-h-[122px] min-w-0 cursor-pointer flex-col break-words rounded-lg border border-gray-200 p-4 shadow-md transition-all hover:-translate-y-1 hover:scale-105 hover:bg-border hover:shadow-lg xl:mb-0">
        <div className="flex items-center">
          <div className="mr-3 flex h-10 w-10 overflow-hidden rounded-full">
            {
              link.icon
                ? <Image
                  src={link.icon}
                  className="object-fill"
                  alt=""
                  width={40}
                  height={40}
                />
                : <span className="h-full w-full rounded-full bg-purple-500 text-center font-bold leading-10">{link.title.slice(0, 1)}</span>
            }
          </div>
          <span className="text-xl font-bold text-primary">{link.title}</span>
        </div>
        <div className="mt-2 line-clamp-2 text-sm text-primary">
          {link.description}
        </div>
        {children}  {/* 添加 children 渲染 */}
      </div>
    </Link>
  )
}

export function LinkContent({ navResources }: { navResources: CategoryWithLinks[] }) {
  return (
    <div className="w-full pt-4">
      <div className="mx-auto w-full px-4 md:px-6">
        {
          navResources.map((category) => {
            return (
              <div id={category.id} key={category.id} className="mb-12">
                <div className="my-4">
                  <h1 className="mb-2 text-2xl font-bold text-primary/80 sm:text-3xl">{category.title}</h1>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                  {
                    category.links.map((link) => (
                      <LinkItem key={link.id} link={link}>
                        {link.page && (
                          <a
                            href={`/pages/${link.page}`}
                            className="absolute right-2 top-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="查看详情"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                            </svg>
                          </a>
                        )}
                      </LinkItem>
                    ))
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
