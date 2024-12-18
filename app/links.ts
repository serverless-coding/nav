import { siteConfig } from '@/config/site';
import type { Link as SiteLink } from "@/types/nav";
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
  cid: string

  constructor(title: string, url: string, icon: string, description: string) {
    this.id = randomUUID()
    this.icon = icon == "" ? _defaultIcon : icon
    this.url = url
    this.title = title
    this.description = description == "" ? randomUUID() : description
    this.rank = 0
    this.public = true
    this.cid = ""
  }
}

const _default: CategoryData = {
  data: [
    new category("AI", "/ai-resize-20.png", [
      new siteLink("魔搭", "https://modelscope.cn/", "/blurry-gradient.svg", "开源的模型即服务共享平台,为泛AI开发者提供灵活、易用、低成本的一站式模型服务产品,让模型应用更简单"),
      new siteLink("通义千问", "https://qianwen.aliyun.com/chat", "/qianwen.png", "阿里云研发的通义千问大模型"),
      new siteLink("ai 导航", "https://ai.dreamthere.cn/", "/ai-resize-20.png", "ai导航站,收集了各种AI站点,有分类"),
      new siteLink("SiliconFlow", "https://cloud.siliconflow.cn/i/eluTiiYw", "/siliconflow.png", "gpt pass平台,提供各种大模型接口,有部分模型可免费试用,注册即送2000w token"),
      new siteLink("Openrouter", "https://openrouter.ai", "/red.svg", "gpt pass平台,提供各种大模型接口,有部分模型可免费试用"),
      new siteLink("Dify", "https://cloud.dify.ai/", "/dify.png", "Open-source LLM app development platform,AI Agent,工作流"),
    ]),

    new category("Article", "/WordPress.svg", [
      new siteLink("hello-algo", "https://github.com/krahets/hello-algo", "/gitBook.svg", "《Hello 算法》：动画图解、一键运行的数据结构与算法教程,hello-algo.com"),
      new siteLink("notes", "https://programnotes.cn", "https://programnotes.cn/Image/logo.png", "博客"),
      new siteLink("ruanyf-weekly", "https://ruanyf-weekly.programnotes.cn/weekly", "/logstash.svg", "阮一峰的技术周刊,科技, 分享, 开源"),
      new siteLink("今日热榜", "https://tophub.today/", "/blob-scatter.svg", "各站点热点:掘金,头条,知乎,豆瓣..."),
      new siteLink("Product Hunt热榜", "https://producthunt.programnotes.cn", "/blob-scene.svg", "Product Hunt,日榜,月榜,分享创意+产品"),
    ]),

    new category("Go", "/go.svg", [
      new siteLink("go doc", "https://golang.google.cn/", "/go.svg", "Go doc,Effective Go,官方文档,下载链接,example"),
      new siteLink("go-zero", "https://go-zero.dev/", "/go-zero.svg", "a web and rpc framework,go微服务框架"),
      new siteLink("beego-v2 doc", "https://beego.programnotes.cn", "/beego.jpg", "beego,go web框架,文档")
    ]),
    

    new category("Tool", "/toml.svg", [
      new siteLink("frp", "https://github.com/fatedier/frp", "/accenture.svg", "A fast reverse proxy,反向代理工具"),
      new siteLink("flomo", "https://flomoapp.com", "/flomologo.png", "notes tool,全平台的卡片笔记，聚焦帮你记录更多想法与灵感，以及更好回顾过往记录"),
      new siteLink("apifox echo", "https://echo.apifox.com/", "/solus.svg", "Apifox Echo is a simple HTTP Request & Response Service,简单的monk接口"),
      new siteLink("simple icon", "https://github.com/simple-icons/simple-icons", "/thirteen.svg", "svg icon"),
      new siteLink("gitpod", "https://gitpod.io/workspaces", "/Gitpod.svg", "browser editor:vscode,idea,goland...浏览器里用vscode,idea等"),
      new siteLink("m3u8-downloader", "https://www.yeyulingfeng.com/tools/m3u8-downloader/", "/docusign.svg", "m3u8 video downloader,视频下载器"),
      new siteLink("avatar maker", "https://avatar-tool.netlify.app/", "/avatar-tool.svg", "Make ID photo right in the browser,在浏览器生成头像,证件照..."),
    ]),

    new category("Serverless", "/serverless.svg", [
      new siteLink("Netlify", "https://functions.netlify.com/", "/netlify.svg", "Serverless platforms,网站托管"),
      new siteLink("Vercel", "https://vercel.com/", "/vercel.svg", "Serverless platforms,网站托管"),
      new siteLink("aliyun FC", "https://help.aliyun.com/zh/fc/", "/aliyun.svg", "阿里云函数计算(FC),事件驱动的全托管计算服务。通过函数计算，无需管理服务器等基础设施，只需编写代码并上传")
    ]),

    new category("Frontend", "/frontify.svg", [
      new siteLink("Next.js", "https://nextjs.org/", "/next.svg", "React framework,React 框架"),
      new siteLink("Haikei", "https://app.haikei.app", "/layered-steps.svg", "纯色图片生成"),
      new siteLink("Page Spy", "https://github.com/HuolalaTech/page-spy-web", "/circle-scatter.svg", "前端调试工具,提供类控制台可交互式的功能界面将数据呈现出来")
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
  const result: CategoryData = _default;
  return result.data;
}

interface CategoryData {
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