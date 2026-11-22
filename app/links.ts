import { siteConfig } from '@/config/site';
import type { Link as SiteLink } from "@/types/nav";
import linksData from '@/data/links.json';

// 默认图标
const _defaultIcon = siteConfig.icon.default

// 分类标题 -> 稳定的英文 slug（用于锚点 id，构建间保持不变，可被外部引用）
const CATEGORY_SLUGS: Record<string, string> = {
  "最热": "hot",
  "Article": "article",
  "AI编程": "ai-coding",
  "AI聊天": "ai-chat",
  "AI写作": "ai-writing",
  "AI搜索": "ai-search",
  "AI绘画": "ai-image",
  "音视频": "audio-video",
  "AI办公": "ai-office",
  "AI设计": "ai-design",
  "AI营销": "ai-marketing",
  "AI学习": "ai-learning",
  "文档": "docs",
  "工具": "tools",
  "云服务": "cloud",
  "前端": "frontend",
  "远程": "remote",
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getCategorySlug(title: string, index: number): string {
  return CATEGORY_SLUGS[title] || slugify(title) || `cat-${index + 1}`
}

class category implements CategoryWithLinks {
  id: string;
  icon: string;
  title: string;
  description: string;
  rank: number;
  links: SiteLink[];

  constructor(title: string, icon: string, links: any[], index: number) {
    this.id = getCategorySlug(title, index)
    let url = ""
    if (links.length > 0) {
      url = links[0].url
    }
    this.icon = icon || getSiteIcon(url) || _defaultIcon
    this.title = title
    this.links = links.map((link, i) =>
      new siteLink(link.title, link.url, link.icon, link.description, link.page, link.subject, `${this.id}-${i + 1}`, title)
    )
    // 按 JSON 中的顺序排序，保持稳定
    this.rank = index
    this.description = `${title}相关的精选工具与资源`
  }
}

class siteLink implements SiteLink {
  id: string
  icon: string
  url: string
  title: string
  description: string
  rank: number | null
  public: boolean
  cid: string
  page?: string;
  subject?: string | string[];

  constructor(title: string, url: string, icon: string, description: string, page: string, subject: string | string[] | undefined, id: string, categoryTitle: string) {
    this.id = id
    this.icon = icon || getSiteIcon(url) || _defaultIcon
    this.url = url
    this.title = title
    // 缺失描述时使用可读的兜底文案，避免输出随机字符串
    this.description = (description || '').trim() || `${title} - ${categoryTitle}类精选工具`
    this.rank = 0
    this.public = true
    this.cid = ""
    this.page = page
    this.subject = subject
  }
}

function getDomainFromUrl(url: string): string {
  try {
    const { protocol, hostname } = new URL(url);
    return `${protocol}//${hostname}`;
  } catch (error) {
    console.error('Invalid URL:', url);
    return '';
  }
}

function getSiteIcon(url: string): string {
  const site = getDomainFromUrl(url);
  if (!site) return '';
  // 相对路径：线上由 edgeone.json 转发到谷歌图标服务，本地由 next.config.mjs 的 rewrites 转发
  return `/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=48&url=${encodeURIComponent(site)}`;
}

// 从 JSON 文件构建导航数据
function buildNavData(): CategoryWithLinks[] {
  return linksData.data.map((cat, index) =>
    new category(cat.title, cat.icon, cat.links, index)
  );
}

// 获取导航链接
export default async function getNavLinks(): Promise<CategoryWithLinks[]> {
  return buildNavData();
}

// 服务端筛选：按关键字和 subject 过滤，供首页直接渲染到 HTML
export function filterNavLinks(navResources: CategoryWithLinks[], q = "", subject = ""): CategoryWithLinks[] {
  const query = q.trim().toLowerCase()
  const sub = subject.trim().toLowerCase()
  if (!query && !sub) return navResources
  const match = (s: string | undefined) => (s || "").toLowerCase().includes(query)
  return navResources
    .map(cat => ({
      ...cat,
      links: cat.links.filter(l => {
        const byText = !query || match(l.title) || match(l.description) || match(l.url)
        let bySubject = true
        if (sub) {
          const s = l.subject
          if (!s) bySubject = false
          else if (Array.isArray(s)) bySubject = s.some(x => (x || '').toLowerCase() === sub)
          else bySubject = s.toLowerCase() === sub
        }
        return byText && bySubject
      })
    }))
    .filter(cat => cat.links.length > 0)
}

export interface CategoryWithLinks {
  id: string;
  icon: string;
  title: string;
  description: string;
  rank: number;
  links: SiteLink[];
  page?: string;
}
