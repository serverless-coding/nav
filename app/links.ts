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
    new category("Go", "/go.svg", [
      new siteLink("go doc", "https://golang.google.cn/", "/go.svg", "Go doc,Effective Go,官方文档,下载链接,example"),
      new siteLink("go-zero", "https://go-zero.dev/", "/go-zero.svg", "a web and rpc framework,go微服务框架"),
      new siteLink("beego-v2 doc", "https://beego.programnotes.cn", "/beego.jpg", "beego,go web框架,文档")
    ]),

    new category("AI", "/ai-resize-20.png", [
      new siteLink("魔搭", "https://modelscope.cn/", "/modelscopeIcon.png", "开源的模型即服务共享平台,为泛AI开发者提供灵活、易用、低成本的一站式模型服务产品,让模型应用更简单"),
      new siteLink("通义千问", "https://qianwen.aliyun.com/chat", "/qianwen.png", "阿里云研发的通义千问大模型"),
      new siteLink("ai 导航", "https://ai.dreamthere.cn/", "/ai-resize-20.png", "ai导航站,收集了各种AI站点,有分类"),
    ]),

    new category("Tool", "/toml.svg", [
      new siteLink("frp", "https://github.com/fatedier/frp", "/accenture.svg", "A fast reverse proxy,反向代理工具"),
      new siteLink("flomo", "https://flomoapp.com", "/flomologo.png", "notes tool,全平台的卡片笔记，聚焦帮你记录更多想法与灵感，以及更好回顾过往记录"),
      new siteLink("apifox echo", "https://echo.apifox.com/", "/solus.svg", "Apifox Echo is a simple HTTP Request & Response Service,简单的monk接口"),
      new siteLink("simple icon", "https://github.com/simple-icons/simple-icons", "/thirteen.svg", "svg icon"),
      new siteLink("gitpod", "https://gitpod.io/workspaces", "/Gitpod.svg", "browser editor:vscode,idea,goland...浏览器里用vscode,idea等"),
      new siteLink("m3u8-downloader", "https://www.yeyulingfeng.com/tools/m3u8-downloader/", "/docusign.svg", "m3u8 video downloader,视频下载器")
    ]),

    new category("Serverless", "/serverless.svg", [
      new siteLink("Netlify", "https://functions.netlify.com/", "/netlify.svg", "Serverless platforms,网站托管"),
      new siteLink("Vercel", "https://vercel.com/", "/vercel.svg", "Serverless platforms,网站托管"),
      new siteLink("aliyun FC", "https://help.aliyun.com/zh/fc/", "/aliyun.svg", "阿里云函数计算(FC),事件驱动的全托管计算服务。通过函数计算，无需管理服务器等基础设施，只需编写代码并上传")
    ]),

    new category("Frontend", "/frontify.svg", [
      new siteLink("Next.js", "https://nextjs.org/", "/next.svg", "React framework,React 框架"),
      new siteLink("xxxx", "https://github.com/serverless-coding/frontend-nav", "/acer.svg", ""),
      new siteLink("xxxx", "https://github.com/serverless-coding/frontend-nav", "/snyk.svg", "")
    ]),

    new category("Article", "/WordPress.svg", [
      new siteLink("notes", "https://programnotes.cn", "https://programnotes.cn/Image/logo.png", "programnotes"),
      new siteLink("ruanyf-weekly", "https://ruanyf-weekly.plantree.me/", "/logstash.svg", "阮一峰的技术周刊,科技, 分享, 开源"),
      new siteLink("今日热榜", "https://tophub.today/", "", "各站点热点:掘金,头条,知乎,豆瓣..."),
    ]),

    new category("CodeStyle", "/CodePen.svg", [
      new siteLink("uber/go", "https://github.com/xxjwxc/uber_go_guide_cn", "/go.svg", "uber/go code style guide,Uber go规范"),
      new siteLink("shimohq/react", "https://github.com/shimohq/react-cookbook", "/React.svg", "shimo react cookbook,石墨文档 react")
    ]),

    new category("Remote", "/remote.svg", [
      new siteLink("eleduck", "https://eleduck.com/", "/eleduck.png", "eleduck,电鸭,远程工作社区"),
    ])
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