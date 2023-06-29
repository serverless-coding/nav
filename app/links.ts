import { siteConfig } from '@/config/site';
import type { Link as SiteLink } from '@prisma/client';
import { randomInt, randomUUID } from 'crypto';


// 默认图标
const _defaultIcon = siteConfig.icon.default

class category implements CategoryWithLinks {
  id: string;
  icon: string;
  title: string;
  description: string;
  rank: number;
  links: SiteLink[];

  constructor(title: string, icon: string, links: SiteLink[]) {
    this.id = randomUUID()
    this.icon = icon == "" ? _defaultIcon : icon
    this.title = title
    this.links = links
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
  status: number
  createdAt: Date
  updatedAt: Date
  cid: string

  constructor(title: string, url: string, icon: string, description: string) {
    this.id = randomUUID()
    this.icon = icon == "" ? _defaultIcon : icon
    this.url = url
    this.title = title
    this.description = description == "" ? randomUUID() : description
    this.rank = 0
    this.public = true
    this.status = 1
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.cid = ""
  }
}

const _default: CategoryData = {
  code: 200,
  message: "success",
  data: [
    new category("Tool", "", [
      new siteLink("frp", "https://github.com/fatedier/frp", "", "A fast reverse proxy,反向代理工具"),
      new siteLink("{JSON} Placeholder", "https://jsonplaceholder.typicode.com", "", "fake data api,提供测试数据的api"),
      new siteLink("apifox echo", "https://echo.apifox.com/", "https://cdn.apifox.cn/logo/apifox-logo-512.png", "Apifox Echo is a simple HTTP Request & Response Service,简单的monk接口"),
      new siteLink("xxxx", "https://github.com/serverless-coding/frontend-nav", "", "")]),
    new category("Serverless", "", [
      new siteLink("Netlify", "https://functions.netlify.com/", "", "Serverless platforms,网站托管"),
      new siteLink("Vercel", "https://vercel.com/", "", "Serverless platforms,网站托管"),
      new siteLink("xxxx", "https://github.com/serverless-coding/frontend-nav", "", "")]),
    new category("Go", "", [
      new siteLink("Site", "https://golang.google.cn/", "", "Go doc,Effective Go,官方文档,下载链接,example"),
      new siteLink("xxxx", "https://github.com/serverless-coding/frontend-nav", "", ""),
      new siteLink("xxxx", "https://github.com/serverless-coding/frontend-nav", "", "")]),
    new category("Frontend", "", [
      new siteLink("Next.js", "https://nextjs.org/", "/next.svg", "React framework,React 框架"),
      new siteLink("xxxx", "https://github.com/serverless-coding/frontend-nav", "", ""),
      new siteLink("xxxx", "https://github.com/serverless-coding/frontend-nav", "", "")]),
    new category("Article", "", [
      new siteLink("notes", "https://programnotes.cn", "https://programnotes.cn/Image/logo.png", "programnotes")]),
  ]
}

// 超时返回默认数据
export default async function getNavLinks(): Promise<CategoryWithLinks[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 50); // 5000ms 超时时间

  const result: CategoryData = await fetch("https://nav-api.programnotes.cn/api/link", { signal: controller.signal })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return _default;
    })
    .then((data: CategoryData) => {
      if (data.data.length <= 1) {
        return _default;
      }
      return data;
    })
    .then((data: CategoryData) => {
      data.data.map((c) => {
        if (c.icon == "") {
          c.icon = _defaultIcon
        }
        if (c.links == undefined) {
          c.links = [];
        } else {
          c.links.map((l) => { if (l.icon == "") l.icon = _defaultIcon })
        }
      })
      return data;
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        return _default;
      } else {
        console.log('Timeout There has been a problem with your fetch operation: ', error);
        // 返回默认值
        return _default;
      }
    })
    .finally(() => {
      clearTimeout(timeout);
    });;
  return result.data;
}

interface CategoryData {
  code: number;
  message: string | null | undefined;
  data: CategoryWithLinks[];
}

export interface CategoryWithLinks {
  id: string;
  icon: string;
  title: string;
  description: string;
  rank: number;
  links: SiteLink[];
}