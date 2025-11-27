import Image from "next/image"
import { CategoryWithLinks } from "@/app/links"
import { Link as SiteLink } from "@/types/nav";
import NextLink from "next/link"
import { Icons } from "./icons";

export function LinkItem({ link }: { link: SiteLink }) {
  return (
    <div className="relative mb-6 flex min-h-[122px] min-w-0 cursor-pointer flex-col break-words p-4 shadow-md transition-all hover:-translate-y-1 hover:scale-105 hover:bg-border hover:shadow-lg xl:mb-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <NextLink href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center" aria-label={link.title}>
            <div className="mr-3 flex h-10 w-10 overflow-hidden rounded-full">
              {link.icon ? (
                <Image
                  src={link.icon}
                  className="object-fill"
                  alt=""
                  width={40}
                  height={40}
                />
              ) : (
                <span className="h-full w-full rounded-full bg-purple-500 text-center font-bold leading-10">
                  {link.title.slice(0, 1)}
                </span>
              )}
            </div>
            <span className="text-xl font-bold text-primary">{link.title}</span>
          </NextLink>
        </div>
        {link.page && (
          <NextLink href={`/page/${link.page.replace(".md", "")}`} className="absolute top-2 right-2">
            <Icons.book className="h-4 w-4" />
          </NextLink>
        )}
      </div>
      <div className="mt-2 line-clamp-2 text-sm text-primary">
        <span>{link.description}</span>
      </div>
    </div>
  );
}

export function LinkContent({ navResources, activeSubject, activeQuery }: { navResources: CategoryWithLinks[], activeSubject?: string, activeQuery?: string }) {

  return (
    <div className="w-full pt-4">
      <div className="mx-auto w-full px-4 md:px-6">
        {
          navResources.map((category) => {
            return (
              <div id={category.id} key={category.id} className="mb-12">
                <div className="my-4">
                  <div className="flex items-center flex-wrap gap-2">
                    <h1 className="mb-2 text-2xl font-bold text-primary/80 sm:text-3xl mr-3">{category.title}</h1>
                    {Array.from(new Set(category.links.flatMap(l => Array.isArray(l.subject) ? l.subject : [(l.subject || '').trim()]).filter(Boolean))).map((sub) => (
                      <NextLink
                        key={sub}
                        href={`/?${new URLSearchParams({ ...(activeQuery ? { q: activeQuery } : {}), subject: sub }).toString()}`}
                        className={`px-4 py-1.5 text-xs md:text-sm rounded-full transition-all duration-200 border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${activeSubject === sub ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/20 focus-visible:ring-white/70 focus-visible:ring-offset-blue-700' : 'text-muted-foreground bg-transparent hover:bg-muted/50 hover:text-foreground focus-visible:ring-blue-500/40 focus-visible:ring-offset-background'}`}
                        aria-label={`筛选 ${sub}`}
                      >
                        {sub}
                      </NextLink>
                    ))}
                    {(activeSubject) && (
                      <NextLink
                        href={`/?${new URLSearchParams({ ...(activeQuery ? { q: activeQuery } : {}) }).toString()}`}
                        className={`ml-2 px-4 py-1.5 text-xs md:text-sm rounded-full transition-all duration-200 border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-muted-foreground bg-transparent hover:bg-muted/50 hover:text-foreground focus-visible:ring-blue-500/40 focus-visible:ring-offset-background`}
                        aria-label={`清除筛选`}
                      >
                        清除筛选
                      </NextLink>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                  {
                    category.links.map((link) => (
                      <LinkItem link={link} key={link.id} />
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
