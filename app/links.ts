import { siteConfig } from '@/config/site';
import type { Link as SiteLink } from "@/types/nav";
import { randomInt, randomUUID } from 'crypto';
import linksData from '@/data/links.json';

// 默认图标
const _defaultIcon = siteConfig.icon.default

class category implements CategoryWithLinks {
  id: string;
  icon: string;
  title: string;
  description: string;
  rank: number;
  links: SiteLink[];

  constructor(title: string, icon: string, links: any[]) {
    this.id = randomUUID()
    this.icon = icon || _defaultIcon
    this.title = title
    this.links = links.map(link => new siteLink(link.title, link.url, link.icon, link.description))
    this.rank = randomInt(100)
    this.description = randomUUID()
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

  constructor(title: string, url: string, icon: string, description: string) {
    this.id = randomUUID()
    this.icon = icon || _defaultIcon
    this.url = url
    this.title = title
    this.description = description || randomUUID()
    this.rank = 0
    this.public = true
    this.cid = ""
  }
}

// 从 JSON 文件构建导航数据
function buildNavData(): CategoryWithLinks[] {
  return linksData.data.map(cat => 
    new category(cat.title, cat.icon, cat.links)
  );
}

// 获取导航链接
export default async function getNavLinks(): Promise<CategoryWithLinks[]> {
  return buildNavData();
}

export interface CategoryWithLinks {
  id: string;
  icon: string;
  title: string;
  description: string;
  rank: number;
  links: SiteLink[];
}